import { SiteHeader } from "./SiteHeader.jsx";
import { projects, writing } from "../data/creative.js";
import { EditorialIcon } from "./EditorialIcon.jsx";

export function CreativePage() {
  return (
    <main className="creative-page" id="main-content">
      <section className="creative-hero">
        <SiteHeader light />
        <div className="creative-hero-inner">
          <p className="creative-kicker">04 / Creative work</p>
          <h1>What I make<br />and what I think.</h1>
          <div className="page-hero-art" aria-hidden="true"><EditorialIcon name="writing" /></div>
          <div className="creative-hero-bottom">
            <div className="creative-tally" aria-label="Portfolio contents">
              <span><strong>05</strong> pieces of writing</span>
              <span><strong>06</strong> open-source projects</span>
            </div>
          </div>
        </div>
      </section>

      <section className="writing-section" aria-labelledby="writing-title">
        <header className="creative-section-heading">
          <div>
            <p className="creative-kicker">Selected writing</p>
            <h2 id="writing-title">Ideas, argued<br />on the page.</h2>
          </div>
        </header>

        <div className="writing-list">
          {writing.map((item) => (
            <article className="writing-item" key={item.title}>
              <span className="writing-number">{item.number}<EditorialIcon name={item.icon} /></span>
              <div className="writing-title-block">
                <div className="writing-meta"><span>{item.type}</span><span>{item.date}</span></div>
                <h3>{item.title}</h3>
                {item.subtitle && <p className="writing-subtitle">{item.subtitle}</p>}
              </div>
              <div className="writing-summary">
                <p>{item.description}</p>
                <div className="creative-tags">
                  {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
              <a href={item.file} target="_blank" rel="noreferrer" aria-label={`Read ${item.title}`}>
                Read PDF <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="projects-section" aria-labelledby="projects-title">
        <header className="creative-section-heading projects-heading">
          <div>
            <p className="creative-kicker">Selected software</p>
            <h2 id="projects-title">Small tools.<br />Real uses.</h2>
          </div>
        </header>

        <div className="project-grid">
          {projects.map((project) => (
            <a className="project-card" href={project.link} target="_blank" rel="noreferrer" key={project.title}>
              <div className="project-card-top"><span>{project.number}</span><span aria-hidden="true">↗</span></div>
              <EditorialIcon name={project.icon} className="project-card-icon" />
              <div className="project-card-body">
                <p>{project.label}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="creative-tags dark-tags">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer className="portfolio-footer">
        <a href="/">← Back home</a>
        <a href="https://github.com/yevdam" target="_blank" rel="noreferrer">More on GitHub ↗</a>
      </footer>
    </main>
  );
}
