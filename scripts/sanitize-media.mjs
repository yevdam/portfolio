#!/usr/bin/env node

import {
  chmodSync,
  copyFileSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync,
} from "node:fs";
import { basename, dirname, extname, join, relative, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const mediaRoots = [join(projectRoot, "public/assets"), join(projectRoot, "media")];
const checkOnly = process.argv.includes("--check");
const jpegExtensions = new Set([".jpg", ".jpeg"]);
const safeFormatTags = new Set(["major_brand", "minor_version", "compatible_brands", "encoder"]);
const safeStreamTags = new Set(["language", "handler_name", "vendor_id", "encoder"]);
const riskyNamePattern = /(location|gps|creation_time|date_time|make|model|software|serial|device)/i;
const riskyValuePattern = /\b(gps|location|iphone|ipad|android|camera|captured|created|device|serial)\b|[+-]\d{2,3}\.\d{2,}[+-]\d{2,3}\.\d{2,}|\b20\d{2}[-:]\d{2}[-:]\d{2}[T ]/i;
const riskyVideoByteStrings = ["com.apple.quicktime.location", "GPSCoordinates", "<x:xmpmeta"];
const ignoredExifGroups = new Set([
  "APP2", "AROT", "Composite", "ExifTool", "File", "ICC-header", "ICC_Profile", "JFIF",
  "MPF0", "MPImage1", "MPImage2", "System",
]);
const safeExifTags = new Set([
  "IFD0:Orientation", "IFD0:ResolutionUnit", "IFD0:XResolution", "IFD0:YCbCrPositioning", "IFD0:YResolution",
  "ExifIFD:ColorSpace", "ExifIFD:ComponentsConfiguration", "ExifIFD:ExifImageHeight", "ExifIFD:ExifImageWidth", "ExifIFD:ExifVersion",
]);

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function jpegSegments(buffer) {
  const segments = [];
  let searchOffset = 0;
  let imageIndex = 0;

  while (searchOffset + 1 < buffer.length) {
    const start = buffer.indexOf(Buffer.from([0xff, 0xd8]), searchOffset);
    if (start < 0) break;
    let offset = start + 2;
    let inScan = false;

    while (offset + 1 < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset += 1;
        continue;
      }

      const markerStart = offset;
      while (buffer[offset] === 0xff) offset += 1;
      const marker = buffer[offset];
      offset += 1;

      if (inScan && (marker === 0x00 || (marker >= 0xd0 && marker <= 0xd7))) continue;
      if (marker === 0xd9) {
        searchOffset = offset;
        break;
      }
      if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
      if (offset + 2 > buffer.length) throw new Error("Truncated JPEG segment");

      const length = buffer.readUInt16BE(offset);
      const end = offset + length;
      if (length < 2 || end > buffer.length) throw new Error("Invalid JPEG segment length");
      segments.push({ imageIndex, marker, payload: buffer.subarray(offset + 2, end) });
      offset = end;
      inScan = marker === 0xda;

      if (markerStart === start) throw new Error("Invalid nested JPEG marker");
    }

    if (searchOffset <= start) searchOffset = offset;
    imageIndex += 1;
  }

  return segments;
}

function riskyJpegMetadata(path, buffer) {
  const issues = [];
  const segments = jpegSegments(buffer);

  const fileText = buffer.toString("utf8");
  let xmpOffset = 0;
  while ((xmpOffset = fileText.indexOf("<x:xmpmeta", xmpOffset)) >= 0) {
    const xmpEnd = fileText.indexOf("</x:xmpmeta>", xmpOffset);
    const xmp = fileText.slice(xmpOffset, xmpEnd >= 0 ? xmpEnd + 12 : undefined);
    const isHdrGainMap = xmp.includes("HDRGainMap") && xmp.includes("AuxiliaryImageType");
    if (!isHdrGainMap) issues.push("XMP");
    if (riskyValuePattern.test(xmp.replaceAll("HDRGainMap", ""))) issues.push("private auxiliary XMP");
    xmpOffset += Math.max(xmp.length, 1);
  }
  if (buffer.includes(Buffer.from("GPSCoordinates"))) issues.push("GPSCoordinates");

  let exifCount = 0;
  let exifOffset = 0;
  while ((exifOffset = buffer.indexOf(Buffer.from("Exif\0\0", "binary"), exifOffset)) >= 0) {
    exifCount += 1;
    exifOffset += 6;
  }
  if (exifCount > 1) issues.push("auxiliary EXIF");

  if (segments.some(({ marker }) => marker === 0xed)) issues.push("IPTC/Photoshop");
  if (segments.some(({ marker }) => marker === 0xfe)) issues.push("comment");

  const [metadata] = JSON.parse(run("exiftool", ["-j", "-G1", "-s", path]));
  for (const [qualifiedTag, value] of Object.entries(metadata)) {
    if (qualifiedTag === "SourceFile" || safeExifTags.has(qualifiedTag)) continue;
    const separator = qualifiedTag.indexOf(":");
    const group = separator >= 0 ? qualifiedTag.slice(0, separator) : "";
    const tag = separator >= 0 ? qualifiedTag.slice(separator + 1) : qualifiedTag;
    if (ignoredExifGroups.has(group)) continue;
    if (["GPS", "IPTC", "MakerNotes", "Photoshop", "XMP"].some((prefix) => group.startsWith(prefix)) ||
        riskyNamePattern.test(tag) || riskyValuePattern.test(String(value))) {
      issues.push(qualifiedTag);
    }
  }

  return [...new Set(issues)];
}

function run(command, args) {
  const result = spawnSync(command, args, { encoding: "utf8" });
  if (result.error?.code === "ENOENT") {
    throw new Error(`${command} is required. Install ExifTool and FFmpeg before sanitizing media.`);
  }
  if (result.status !== 0) throw new Error(result.stderr.trim() || `${command} failed`);
  return result.stdout;
}

function ffprobe(path) {
  return JSON.parse(run("ffprobe", ["-v", "error", "-show_format", "-show_streams", "-of", "json", path]));
}

function riskyVideoMetadata(path, probe) {
  const issues = [];
  const checkTags = (tags, prefix, safeTags) => {
    for (const [key, value] of Object.entries(tags || {})) {
      if (!safeTags.has(key) || riskyNamePattern.test(key) || riskyValuePattern.test(String(value))) {
        issues.push(`${prefix}.${key}`);
      }
    }
  };

  checkTags(probe.format?.tags, "format.tags", safeFormatTags);
  for (const [index, stream] of (probe.streams || []).entries()) {
    checkTags(stream.tags, `streams[${index}].tags`, safeStreamTags);
    if (!["video", "audio"].includes(stream.codec_type)) issues.push(`streams[${index}].codec_type=${stream.codec_type}`);
  }

  const bytes = readFileSync(path);
  for (const token of riskyVideoByteStrings) {
    if (bytes.includes(Buffer.from(token))) issues.push(`embedded:${token}`);
  }
  return [...new Set(issues)];
}

function temporaryPath(path) {
  return join(dirname(path), `.${basename(path)}.${process.pid}.tmp${extname(path)}`);
}

function sanitizeJpeg(path) {
  const output = temporaryPath(path);
  try {
    copyFileSync(path, output);
    chmodSync(output, statSync(path).mode);
    run("exiftool", [
      "-overwrite_original",
      "-GPS:All=", "-MakerNotes:All=", "-XMP:All=", "-IPTC:All=", "-Photoshop:All=",
      "-Comment=", "-Make=", "-Model=", "-Software=", "-DateTime=", "-DateTimeOriginal=",
      "-CreateDate=", "-ModifyDate=", "-OffsetTime*=", "-SerialNumber*=", "-Lens*=",
      "-OwnerName=", "-UserComment=", "-ImageDescription=", "-Artist=", "-Copyright=",
      output,
    ]);
    const remaining = riskyJpegMetadata(output, readFileSync(output));
    if (remaining.length) throw new Error(`Private JPEG metadata requires manual review: ${remaining.join(", ")}`);
    renameSync(output, path);
  } finally {
    rmSync(output, { force: true });
  }
}

function sanitizeVideo(path) {
  const output = temporaryPath(path);
  try {
    run("ffmpeg", [
      "-v", "error", "-y", "-i", path,
      "-map", "0:v:0", "-map", "0:a?", "-c", "copy",
      "-map_metadata", "-1", "-map_metadata:s", "-1", "-map_chapters", "-1",
      "-metadata", "location=", "-metadata", "location-eng=",
      "-movflags", "+faststart", output,
    ]);
    const remaining = riskyVideoMetadata(output, ffprobe(output));
    if (remaining.length) throw new Error(`Sanitized video still contains private metadata: ${remaining.join(", ")}`);
    chmodSync(output, statSync(path).mode);
    renameSync(output, path);
  } finally {
    rmSync(output, { force: true });
  }
}

const requestedFiles = process.argv.slice(2).filter((argument) => argument !== "--check").map((path) => resolve(path));
const files = (requestedFiles.length ? requestedFiles : mediaRoots.flatMap(walk)).filter((path) => jpegExtensions.has(extname(path).toLowerCase()) || extname(path).toLowerCase() === ".mp4");
const remaining = [];

for (const path of files) {
  const displayPath = relative(projectRoot, path);
  const extension = extname(path).toLowerCase();

  if (jpegExtensions.has(extension)) {
    const risky = riskyJpegMetadata(path, readFileSync(path));
    if (checkOnly) {
      if (risky.length) remaining.push(`${displayPath}: ${risky.join(", ")}`);
    } else if (risky.length) {
      sanitizeJpeg(path);
      console.log(`Sanitized ${displayPath}: ${risky.join(", ")}`);
    }
  } else {
    const risky = riskyVideoMetadata(path, ffprobe(path));
    if (checkOnly) {
      if (risky.length) remaining.push(`${displayPath}: ${risky.join(", ")}`);
    } else if (risky.length) {
      sanitizeVideo(path);
      console.log(`Sanitized ${displayPath}: ${risky.join(", ")}`);
    }
  }
}

if (remaining.length) {
  console.error("Private media metadata remains:\n" + remaining.join("\n"));
  process.exit(1);
}

if (checkOnly) console.log(`Checked ${files.length} media files; no private metadata found.`);
