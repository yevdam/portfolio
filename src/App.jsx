import { site } from "./data/site.js";
import { MainPage } from "./components/MainPage.jsx";
import { PlaceholderPage } from "./components/PlaceholderPage.jsx";
import { VolunteeringPage } from "./components/VolunteeringPage.jsx";
import { AboutPage } from "./components/AboutPage.jsx";
import { ReactionPage } from "./components/ReactionPage.jsx";
import { CreativePage } from "./components/CreativePage.jsx";
import { WeightliftingPage } from "./components/WeightliftingPage.jsx";
import { pages } from "./data/pages.js";

function App() {
  const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
  const selectedPage = site.explore.find((page) => page.path === currentPath);
  let page;

  if (currentPath === "/volunteering") {
    page = <VolunteeringPage />;
  } else if (currentPath === "/about") {
    page = <AboutPage />;
  } else if (currentPath === "/reaction") {
    page = <ReactionPage />;
  } else if (currentPath === "/creative") {
    page = <CreativePage />;
  } else if (currentPath === "/weightlifting") {
    page = <WeightliftingPage />;
  } else if (selectedPage) {
    page = <PlaceholderPage page={{ ...selectedPage, ...pages[currentPath] }} />;
  } else {
    page = <MainPage />;
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      {page}
    </>
  );
}

export default App;
