import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "./SiteHeader.jsx";
import { EditorialIcon } from "./EditorialIcon.jsx";

export function PlaceholderPage({ page }) {
  const [activeGallery, setActiveGallery] = useState(null);
  const galleryDialogRef = useRef(null);
  const galleryTriggerRef = useRef(null);

  useEffect(() => {
    const dialog = galleryDialogRef.current;
    if (!dialog) return;

    if (activeGallery && !dialog.open) {
      dialog.scrollTop = 0;
      dialog.showModal();
    } else if (!activeGallery && dialog.open) {
      dialog.close();
    }
  }, [activeGallery]);

  const openGallery = (item, trigger) => {
    galleryTriggerRef.current = trigger;
    setActiveGallery(item);
  };

  const closeGallery = () => {
    galleryDialogRef.current?.querySelectorAll("video").forEach((video) => video.pause());
    setActiveGallery(null);
  };

  return (
    <main className={`portfolio-page accent-${page.accent}`} id="main-content">
      <div className="portfolio-hero">
        <SiteHeader light />
        <div className="portfolio-hero-inner">
          <span>{page.number} / {page.eyebrow}</span>
          <h1>{page.title}</h1>
          <div className="page-hero-art" aria-hidden="true">
            <EditorialIcon name={page.icon || page.featured?.[0]?.icon} />
          </div>
        </div>
      </div>

      <div className="portfolio-content">
        <header className="portfolio-content-heading">
          <span>{page.featuredLabel}</span>
          <h2>{page.featuredTitle}</h2>
        </header>

        <div className="portfolio-card-grid">
          {page.featured.map((item, index) => (
            <article className="portfolio-card" key={item.title}>
              <div className="portfolio-card-topline">
                <span className="portfolio-card-number">{String(index + 1).padStart(2, "0")}</span>
                <EditorialIcon name={item.icon} />
              </div>
              <div className="portfolio-card-meta">
                <span>{item.organization}</span>
                <span>{item.period}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="portfolio-tags">
                {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              {item.media && (
                <button className="portfolio-gallery-trigger" type="button" onClick={(event) => openGallery(item, event.currentTarget)}>
                  {item.media.length === 1 ? "View photo" : `View ${item.media.length} moments`} <span aria-hidden="true">↗</span>
                </button>
              )}
              {item.link && <a href={item.link} {...(item.link.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>{item.linkLabel} ↗</a>}
            </article>
          ))}
        </div>

        <div className="portfolio-details">
          <header>
            <span>More</span>
            <h2>{page.detailsTitle}</h2>
          </header>
          <div>
            {page.details.map((item) => (
              <article className="portfolio-detail" key={item.title}>
                <div>
                  <span>{item.organization}</span>
                  <span>{item.period}</span>
                </div>
                {item.icon && <EditorialIcon name={item.icon} className="portfolio-detail-icon" />}
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="portfolio-tags">
                  {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                {item.link && <a href={item.link} {...(item.link.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>{item.linkLabel} ↗</a>}
              </article>
            ))}
          </div>
        </div>
      </div>

      <dialog
        ref={galleryDialogRef}
        className="alaska-gallery-dialog work-gallery-dialog"
        aria-labelledby="work-gallery-title"
        aria-describedby="work-gallery-description"
        onCancel={closeGallery}
        onClose={() => {
          setActiveGallery(null);
          galleryTriggerRef.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeGallery();
        }}
      >
        {activeGallery && (
          <div className="alaska-gallery-shell">
            <header className="alaska-gallery-header">
              <div>
                <p className="about-index">Work journal / {String(activeGallery.media.length).padStart(2, "0")} {activeGallery.media.length === 1 ? "moment" : "moments"}</p>
                <h2 id="work-gallery-title">{activeGallery.title},<br /><em>up close.</em></h2>
                <p id="work-gallery-description">{activeGallery.galleryDescription}</p>
              </div>
              <button className="alaska-gallery-close" type="button" onClick={closeGallery} aria-label={`Close ${activeGallery.title} gallery`}>
                Close <span aria-hidden="true">×</span>
              </button>
            </header>

            <div className={`work-gallery-grid ${activeGallery.media.length === 1 ? "is-single" : ""}`}>
              {activeGallery.media.map((media) => (
                <figure className={`work-gallery-media work-gallery-media-${media.type}`} key={media.src}>
                  {media.type === "video" ? (
                    <video controls playsInline preload="metadata" poster={media.poster} aria-label={media.label}>
                      <source src={media.src} type="video/mp4" />
                      Your browser does not support embedded video. <a href={media.src}>Download the video.</a>
                    </video>
                  ) : (
                    <img src={media.src} alt={media.alt} />
                  )}
                  <figcaption><span>{media.meta}</span><strong>{media.label}</strong></figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}
      </dialog>

      <footer className="portfolio-footer">
        <a href="/">← Back home</a>
        <a href="mailto:contact@adamostrinsky.com">Get in touch ↗</a>
      </footer>
    </main>
  );
}
