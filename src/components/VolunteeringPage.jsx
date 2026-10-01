import { SiteHeader } from "./SiteHeader.jsx";
import { volunteering } from "../data/volunteering.js";
import { EditorialIcon } from "./EditorialIcon.jsx";

function FeaturedCard({ item, index }) {
  const featureVisual = (
    <div className="volunteer-feature-visual" aria-hidden="true">
      <EditorialIcon name={item.icon} />
      <small>{String(index + 1).padStart(2, "0")}</small>
    </div>
  );

  return (
    <article className="volunteer-feature-card">
      {item.link ? (
        <a className="volunteer-feature-image" href={item.link} target="_blank" rel="noreferrer" aria-label={`${item.linkLabel} (opens in a new tab)`}>
          {featureVisual}
        </a>
      ) : <div className="volunteer-feature-image">{featureVisual}</div>}
      <div className="volunteer-feature-copy">
        <div className="feature-meta">
          <span>{item.organization}</span>
          <span>{item.period}</span>
        </div>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <div className="feature-card-footer">
          <span>{item.contribution} · {item.location}</span>
          {item.link && <a href={item.link} target="_blank" rel="noreferrer">{item.linkLabel} ↗</a>}
        </div>
      </div>
    </article>
  );
}

export function VolunteeringPage() {
  return (
    <main className="volunteering-page" id="main-content">
      <section className="volunteer-hero">
        <SiteHeader light />
        <div className="volunteer-hero-inner">
          <p className="volunteer-eyebrow">{volunteering.eyebrow}</p>
          <h1>{volunteering.title}</h1>
          <div className="page-hero-art" aria-hidden="true"><EditorialIcon name="service" /></div>
          <div className="volunteer-hero-bottom">
            <a href="#featured">See my work ↓</a>
          </div>
        </div>
      </section>

      <section className="volunteer-featured" id="featured">
        <header className="volunteer-section-heading">
          <div>
            <span className="section-kicker">01 / Pinned</span>
            <h2>Highlighted commitments</h2>
          </div>
        </header>
        <div className="volunteer-feature-grid">
          {volunteering.featured.map((item, index) => (
            <FeaturedCard item={item} index={index} key={item.title} />
          ))}
        </div>
      </section>

      <section className="volunteer-archive">
        <header className="volunteer-section-heading archive-heading">
          <div>
            <span className="section-kicker">02 / All activity</span>
            <h2>The ongoing list</h2>
          </div>
        </header>

        <div className="volunteer-list">
          {volunteering.other.map((item, index) => (
            <details className="volunteer-list-item" key={`${item.title}-${item.period}`}>
              <summary>
                <span className="list-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="list-title">{item.title}</span>
                <span className="list-org">{item.organization}</span>
                <span className="list-period">{item.period}</span>
                <span className="list-toggle" aria-hidden="true">+</span>
              </summary>
              <div className="list-detail">
                <p>{item.description}</p>
                <div className="list-tags">
                  {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                {item.link && <a href={item.link} target="_blank" rel="noreferrer">Learn more ↗</a>}
              </div>
            </details>
          ))}
        </div>
      </section>

      <footer className="portfolio-footer">
        <a href="/">← Back home</a>
        <a href={`mailto:${volunteering.email || "contact@adamostrinsky.com"}`}>Get in touch ↗</a>
      </footer>
    </main>
  );
}
