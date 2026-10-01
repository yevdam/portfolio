import { SiteHeader } from "./SiteHeader.jsx";
import { EditorialIcon } from "./EditorialIcon.jsx";
import { githubVideo } from "../data/media.js";

const competitionMedia = [
  {
    type: "image",
    src: "/assets/bluewave-snatch.jpg",
    alt: "Adam holding a barbell overhead on the BlueWave competition platform",
    label: "Overhead",
    caption: "Setting down the snatch.",
    className: "landscape",
  },
  {
    type: "image",
    src: "/assets/bluewave-clean.jpg",
    alt: "Adam standing with a barbell in the front-rack position at BlueWave",
    label: "Front rack",
    caption: "The clean secured before the next phase of the lift.",
    className: "portrait",
  },
  {
    type: "video",
    src: githubVideo("bluewave-competition-lift.mp4"),
    poster: "/assets/bluewave-competition-lift-poster.jpg",
    label: "Competition attempt",
    caption: "A competition attempt at a local meet.",
  },
  {
    type: "video",
    src: githubVideo("bluewave-wso-no-lift.mp4"),
    poster: "/assets/bluewave-wso-no-lift-poster.jpg",
    label: "WSO / No lift",
    caption: "My arms bent only slightly, but the judges still called it a no lift. It is a good example of how precise every movement has to be.",
    className: "is-emphasis",
  },
];

export function WeightliftingPage() {
  return (
    <main className="portfolio-page accent-orange lifting-page" id="main-content">
      <section className="portfolio-hero">
        <SiteHeader light />
        <div className="portfolio-hero-inner">
          <span>BlueWave / Olympic weightlifting</span>
          <h1>Built on precise<br />movement.</h1>
          <div className="page-hero-art" aria-hidden="true"><EditorialIcon name="lifting" /></div>
        </div>
      </section>

      <section className="lifting-content">
        <header className="lifting-intro">
          <span>On the platform</span>
          <div>
            <h2>Strength gets the bar moving. Precision makes the lift count.</h2>
            <p>I compete with BlueWave Weightlifting and serve as captain of its youth team. Competition has taught me that the smallest technical detail can separate a good lift from a no lift.</p>
          </div>
        </header>

        <div className="lifting-media-grid">
          {competitionMedia.map((item) => (
            <figure className={`lifting-media ${item.className || ""}`} key={item.src}>
              {item.type === "video" ? (
                <video controls playsInline preload="metadata" poster={item.poster} aria-label={`${item.label}. ${item.caption}`}>
                  <source src={item.src} type="video/mp4" />
                  Your browser does not support embedded video.
                </video>
              ) : (
                <img src={item.src} alt={item.alt} loading="lazy" />
              )}
              <figcaption><span>{item.label}</span><p>{item.caption}</p></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <footer className="portfolio-footer"><a href="/achievements">← Back to achievements</a><a href="mailto:contact@adamostrinsky.com">Say hello ↗</a></footer>
    </main>
  );
}
