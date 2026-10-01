const iconPaths = {
  research: <><circle cx="24" cy="24" r="3" /><ellipse cx="24" cy="24" rx="18" ry="7" /><ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(60 24 24)" /><ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(120 24 24)" /></>,
  microscope: <><path d="M19 7h10v6H19zM22 13v9l-6 8" /><path d="M29 13v8c0 7-5 12-12 12h-4M11 38h27M16 30h12a9 9 0 0 1 9 9" /><circle cx="31" cy="28" r="3" /></>,
  clinical: <><path d="M16 7h16v34H16zM11 14h26" /><path d="M24 20v12M18 26h12" /></>,
  code: <><path d="m18 14-10 10 10 10M30 14l10 10-10 10M27 9l-6 30" /></>,
  service: <><path d="M24 40S7 31 7 18a9 9 0 0 1 17-4 9 9 0 0 1 17 4c0 13-17 22-17 22Z" /><path d="M18 23h12M24 17v12" /></>,
  community: <><circle cx="17" cy="18" r="6" /><circle cx="33" cy="18" r="6" /><path d="M6 39c1-8 5-12 11-12s10 4 11 12M24 39c1-8 4-12 9-12s8 4 9 12" /></>,
  award: <><circle cx="24" cy="19" r="11" /><path d="m17 29-2 12 9-5 9 5-2-12M24 13v12M18 19h12" /></>,
  discipline: <><path d="M12 12h24v24H12zM18 18h12v12H18z" /><path d="M12 12 6 6M36 12l6-6M12 36l-6 6M36 36l6 6" /></>,
  lifting: <><path d="M8 19v10M13 15v18M35 15v18M40 19v10M13 24h22" /></>,
  writing: <><path d="M13 6h17l7 7v29H13z" /><path d="M30 6v8h7M18 22h14M18 28h14M18 34h9" /></>,
  piano: <><path d="M6 13h36v24H6z" /><path d="M12 13v24M18 13v24M24 13v24M30 13v24M36 13v24M15 13v13M27 13v13M33 13v13" /></>,
  timer: <><circle cx="24" cy="27" r="15" /><path d="M24 27V16M20 6h8M33 11l4 4" /></>,
  food: <><path d="M10 7v14c0 4 3 7 7 7V7M13 7v11M17 7v11M17 28v13M32 7v34M32 7c7 5 8 13 0 19" /></>,
  driving: <><path d="m8 30 4-12h24l4 12v9h-5v-4H13v4H8z" /><path d="M12 30h28M16 30h1M31 30h1" /></>,
  print: <><path d="m24 6 15 8-15 8-15-8zM9 14v18l15 9 15-9V14M24 22v19" /></>,
  music: <><path d="M18 34V12l20-5v22M18 17l20-5" /><circle cx="13" cy="35" r="5" /><circle cx="33" cy="30" r="5" /></>,
  ev: <><path d="M12 7h19v34H12zM16 12h11v10H16zM31 15h4l5 5v12c0 3-2 5-5 5h-4" /><path d="m37 12-3 5h5l-3 5" /></>,
};

export function EditorialIcon({ name, className = "", label }) {
  return (
    <svg
      className={`editorial-icon ${className}`}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : "true"}
    >
      {iconPaths[name] || iconPaths.research}
    </svg>
  );
}
