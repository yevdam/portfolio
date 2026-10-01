import { site } from "../data/site.js";
import { EditorialIcon } from "./EditorialIcon.jsx";

export function ExploreGrid() {
  return (
    <section className="explore" id="explore" aria-labelledby="explore-title">
      <div className="explore-heading">
        <p>Index</p>
        <h2 id="explore-title">Explore.</h2>
      </div>

      <nav className="explore-grid" aria-label="Portfolio sections">
        {site.explore.map((item) => (
          <a className={`explore-link accent-${item.accent}`} href={item.path} key={item.path}>
            <span className="link-number">{item.number}</span>
            <EditorialIcon name={item.icon} className="explore-icon" />
            <div>
              <h3>{item.title}</h3>
            </div>
            <span className="link-arrow" aria-hidden="true">↗</span>
          </a>
        ))}
      </nav>

      <footer className="explore-footer">
        <span>{site.location}</span>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </footer>
    </section>
  );
}
