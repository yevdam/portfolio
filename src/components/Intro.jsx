import { site } from "../data/site.js";
import { SiteHeader } from "./SiteHeader.jsx";

export function Intro() {
  return (
    <section className="intro" id="top" aria-labelledby="intro-title">
      <SiteHeader light />

      <div className="intro-content">
        {site.eyebrow && <p className="eyebrow">{site.eyebrow}</p>}
        <h1 id="intro-title">{site.headline}</h1>
        <p className="intro-copy">{site.introduction}</p>
        <a className="scroll-button" href="#explore">
          Explore the portfolio
          <span aria-hidden="true">↓</span>
        </a>
      </div>

      <div className="intro-photo">
        <span className="photo-layer photo-layer-blue" aria-hidden="true" />
        <span className="photo-layer photo-layer-grid" aria-hidden="true" />
        <img src={site.photo} alt={site.photoAlt} />
      </div>
    </section>
  );
}
