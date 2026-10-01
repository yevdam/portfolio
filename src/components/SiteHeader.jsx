import { site } from "../data/site.js";

export function SiteHeader({ light = false }) {
  const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
  const links = site.explore.map(({ path, title }) => ({ path, title: title.replace("Highlighted ", "") }));

  return (
    <header className={light ? "site-header light" : "site-header"}>
      <a className="wordmark" href="/" aria-label={`${site.name}, home`}>
        <span>{site.initials}</span>
        <strong>{site.name}</strong>
      </a>
      <nav className="site-nav" aria-label="Primary navigation">
        {links.map((link) => (
          <a href={link.path} aria-current={currentPath === link.path ? "page" : undefined} key={link.path}>
            {link.title}
          </a>
        ))}
      </nav>
      <details className="site-menu">
        <summary>Menu</summary>
        <nav aria-label="Mobile navigation">
          {links.map((link) => (
            <a href={link.path} aria-current={currentPath === link.path ? "page" : undefined} key={link.path}>
              {link.title}
            </a>
          ))}
          <a href={`mailto:${site.email}`}>Email ↗</a>
        </nav>
      </details>
      <a className="header-email" href={`mailto:${site.email}`}>Email ↗</a>
    </header>
  );
}
