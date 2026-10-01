import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "./SiteHeader.jsx";
import { EditorialIcon } from "./EditorialIcon.jsx";
import { githubVideo } from "../data/media.js";

const favorites = {
  food: {
    label: "Food",
    note: "My usual picks.",
    items: ["Barrera’s Tex-Mex", "Pastafina", "Lazy Dog", "Texas Roadhouse"],
  },
  music: {
    label: "Music",
    note: "What I’ve been playing lately.",
    items: ["Early Life Crisis by Nettspend", "For All the Dogs by Drake", "MUSIC by Playboi Carti"],
  },
  screen: {
    label: "Movies & TV",
    note: "Three favorites.",
    items: ["Better Call Saul", "The Big Bang Theory", "Clerks"],
  },
};

const interests = [
  { title: "3D printing", icon: "print", copy: "I like designing parts in CAD, printing them, and adjusting the design until it works the way I wanted." },
  { title: "Driving", icon: "driving", copy: "Sometimes I just want a long drive, a good playlist, and nowhere I need to be." },
  { title: "Trying restaurants", icon: "food", copy: "I like ordering something I haven’t tried before and deciding whether the place is worth coming back to." },
  { title: "Piano", icon: "piano", copy: "I’ve played for years, and I like the mix of repetition, interpretation, and small improvements that eventually change the whole piece." },
];

export function AboutPage() {
  const [favorite, setFavorite] = useState("food");
  const [alaskaGalleryOpen, setAlaskaGalleryOpen] = useState(false);
  const alaskaDialogRef = useRef(null);
  const alaskaTriggerRef = useRef(null);
  const current = favorites[favorite];

  useEffect(() => {
    const dialog = alaskaDialogRef.current;
    if (!dialog) return;

    if (alaskaGalleryOpen && !dialog.open) {
      dialog.scrollTop = 0;
      dialog.showModal();
    } else if (!alaskaGalleryOpen && dialog.open) {
      dialog.close();
    }
  }, [alaskaGalleryOpen]);

  const closeAlaskaGallery = () => {
    alaskaDialogRef.current?.querySelectorAll("video").forEach((video) => video.pause());
    setAlaskaGalleryOpen(false);
  };

  return (
    <main className="about-page about-journal" id="main-content">
      <section className="about-intro">
        <SiteHeader light />
        <div className="about-intro-inner">
          <p className="about-index">About / 06</p>
          <div className="about-intro-title">
            <h1>About<br />me.</h1>
          </div>
          <div className="about-intro-note">
            <p>I’m Adam, a senior in Fort Worth. During the summers, most of my time goes to biomedical and computational research alongside clinical work at an endoscopy center. When I’m not doing that, I’m probably driving around, trying a restaurant, or working on something in CAD.</p>
            <a href="#favorites">Start with the favorites <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </section>

      <section className="about-favorites" id="favorites">
        <div className="about-section-heading">
          <p className="about-index">Current rotation</p>
          <h2>Favorites.</h2>
        </div>
        <div className="favorites-layout">
          <div className="favorites-tabs" role="tablist" aria-label="Adam’s recommendations">
            {Object.entries(favorites).map(([key, item], index) => (
              <button key={key} type="button" role="tab" aria-selected={favorite === key} aria-controls="favorites-panel" onClick={() => setFavorite(key)}>
                <span>0{index + 1}</span><strong>{item.label}</strong><i aria-hidden="true">↗</i>
              </button>
            ))}
          </div>
          <article className="favorites-panel" id="favorites-panel" role="tabpanel">
            <p>{current.note}</p>
            <ol>{current.items.map((item, index) => <li key={item}><span>{index + 1}</span>{item}</li>)}</ol>
          </article>
        </div>
      </section>

      <section className="about-interests">
        <div className="about-section-heading">
          <p className="about-index">Outside of school</p>
          <h2>Other things<br />I like.</h2>
        </div>
        <div className="interest-list">
          {interests.map((item, index) => (
            <article key={item.title}><span>0{index + 1}</span><EditorialIcon name={item.icon} /><h3>{item.title}</h3><p>{item.copy}</p></article>
          ))}
        </div>
      </section>

      <section className="about-notes">
        <article>
          <p className="about-index">A place</p>
          <div>
            <h2>Alaska.</h2>
            <p>Still my favorite trip. It was the first place I visited that felt impossible to take in all at once.</p>
            <button ref={alaskaTriggerRef} className="about-note-link alaska-gallery-trigger" type="button" onClick={() => setAlaskaGalleryOpen(true)}>
              View 4 moments <span aria-hidden="true">↗</span>
            </button>
          </div>
          <img className="alaska-outline" src="/assets/alaska-outline.png" alt="Outline of the state of Alaska" />
        </article>
        <article>
          <p className="about-index">I can talk about this for a while</p>
          <div>
            <h2>Olympic weightlifting.</h2>
            <p>I like how unforgiving the sport is: speed and strength matter, but so do timing, balance, and positions precise enough to satisfy three judges.</p>
            <a className="about-note-link" href="/weightlifting">See competition moments <span aria-hidden="true">↗</span></a>
          </div>
          <EditorialIcon name="lifting" className="about-note-icon" />
        </article>
      </section>

      <dialog
        ref={alaskaDialogRef}
        className="alaska-gallery-dialog"
        aria-labelledby="alaska-gallery-title"
        aria-describedby="alaska-gallery-description"
        onCancel={closeAlaskaGallery}
        onClose={() => {
          setAlaskaGalleryOpen(false);
          alaskaTriggerRef.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeAlaskaGallery();
        }}
      >
        <div className="alaska-gallery-shell">
          <header className="alaska-gallery-header">
            <div>
              <p className="about-index">Travel journal / 04 moments</p>
              <h2 id="alaska-gallery-title">Alaska,<br /><em>up close.</em></h2>
              <p id="alaska-gallery-description">Two photographs and two short videos from the trip.</p>
            </div>
            <button className="alaska-gallery-close" type="button" onClick={closeAlaskaGallery} aria-label="Close Alaska gallery">
              Close <span aria-hidden="true">×</span>
            </button>
          </header>

          <div className="alaska-gallery-grid">
            <figure className="alaska-media alaska-media-wide">
              <img src="/assets/alaska/glacier-view.jpeg" alt="A blue glacier stretching across the water beneath low clouds, seen from the deck of a boat" />
              <figcaption><span>01 / Photograph</span><strong>Glacier from the water</strong></figcaption>
            </figure>

            <figure className="alaska-media alaska-media-portrait">
              <img src="/assets/alaska/river-portrait.jpeg" alt="Adam standing on a large boulder beside a broad Alaskan river, with evergreen forest behind him" />
              <figcaption><span>02 / Photograph</span><strong>Along the river</strong></figcaption>
            </figure>

            <figure className="alaska-media alaska-media-video">
              <video controls playsInline preload="metadata" poster="/assets/alaska/glacier-poster.jpg" aria-label="Video of a glacier in Alaska">
                <source src={githubVideo("alaska/glacier.mp4")} type="video/mp4" />
                Your browser does not support embedded video. <a href={githubVideo("alaska/glacier.mp4")}>Download the glacier video.</a>
              </video>
              <figcaption><span>03 / Video · 24 sec</span><strong>Glacier in motion</strong></figcaption>
            </figure>

            <figure className="alaska-media alaska-media-video">
              <video controls playsInline preload="metadata" poster="/assets/alaska/whale-poster.jpg" aria-label="Video of a whale sighting in Alaska">
                <source src={githubVideo("alaska/whale.mp4")} type="video/mp4" />
                Your browser does not support embedded video. <a href={githubVideo("alaska/whale.mp4")}>Download the whale video.</a>
              </video>
              <figcaption><span>04 / Video · 46 sec</span><strong>Whale sighting</strong></figcaption>
            </figure>
          </div>
        </div>
      </dialog>

      <section className="about-future">
        <p className="about-index">Looking forward</p>
        <div className="about-future-copy">
          <h2 className="about-future-statement">
            <span className="about-future-setup">The long-term plan is to become a</span>
            <strong>physician</strong>
            <span className="about-future-continuation">who combines medical knowledge with technology, problem-solving, and the chance to directly help someone.</span>
          </h2>
          <a href="/work">See what I’m doing now ↗</a>
        </div>
      </section>

      <footer className="portfolio-footer"><a href="/">← Back home</a><a href="mailto:contact@adamostrinsky.com">Say hello ↗</a></footer>
    </main>
  );
}
