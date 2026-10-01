# College application portfolio

A minimal, data-driven React portfolio that builds to a static Cloudflare Pages site.

## Edit the site

Start with `src/data/site.js`. It controls:

- Your name, introduction, location, and email
- Every button in the portfolio menu
- Page titles, descriptions, URLs, ordering, and accent colors

To add a new destination, copy one object in the `explore` list and change its values. The main-page grid and placeholder route are generated automatically.

Reusable page pieces live in `src/components`. Global colors and layout live in `src/styles.css`.

## Test locally

```sh
./demo.sh
```

Press `Ctrl+C` in the terminal to stop the preview.

To open the site from another device on the same local network, run:

```sh
./demo.sh --lan
```

Use the `Network` URL printed in the terminal. Your firewall may ask you to allow incoming connections.

## Build for Cloudflare Pages

```sh
npm run check:media
npm run build
```

Upload the generated `dist` folder. The included `_redirects` file makes the future section routes work when visited directly.

Videos live in the repository's top-level `media` directory and are loaded from GitHub at runtime. Keeping them outside `public` prevents Vite from copying them into `dist`, so Cloudflare Pages does not host or serve the video files. If the repository owner, name, or default branch changes, update `src/data/media.js`.

Run `npm run sanitize:media` before adding new photos or videos. The sanitizer removes private capture metadata while preserving JPEG color profiles and the encoded video/audio streams.
It requires [ExifTool](https://exiftool.org/) and FFmpeg (`ffmpeg` and `ffprobe`) on the machine performing the release check.
