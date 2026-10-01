import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "./SiteHeader.jsx";
import { EditorialIcon } from "./EditorialIcon.jsx";

const ADAM_REACTION_TIME = 204;

const gameCopy = {
  idle: {
    marker: "Ready",
    title: "Start",
    instruction: "Click here to begin.",
    action: "Start",
  },
  waiting: {
    marker: "Wait",
    title: "Wait…",
    instruction: "Don’t click until this box turns yellow.",
    action: "Not yet",
  },
  ready: {
    marker: "Go",
    title: "Click!",
    instruction: "Click now.",
    action: "Go",
  },
  falseStart: {
    marker: "False start",
    title: "Too soon.",
    instruction: "Wait for the yellow screen before clicking.",
    action: "Try again",
  },
};

export function ReactionPage() {
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [best, setBest] = useState(null);
  const timerRef = useRef(null);
  const signalTimeRef = useRef(null);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  function startRound() {
    setResult(null);
    setStatus("waiting");
    timerRef.current = window.setTimeout(() => {
      signalTimeRef.current = performance.now();
      setStatus("ready");
    }, 1600 + Math.random() * 2600);
  }

  function activate() {
    if (status === "idle" || status === "falseStart" || status === "result") {
      startRound();
      return;
    }

    if (status === "waiting") {
      window.clearTimeout(timerRef.current);
      setStatus("falseStart");
      return;
    }

    const nextResult = Math.max(1, Math.round(performance.now() - signalTimeRef.current));
    setResult(nextResult);
    setBest((currentBest) => currentBest === null ? nextResult : Math.min(currentBest, nextResult));
    setStatus("result");
  }

  function handleKeyDown(event) {
    if (event.repeat || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    activate();
  }

  function handlePointerDown(event) {
    if (event.button !== 0) return;
    activate();
  }

  const copy = status === "result" ? {
    marker: result < ADAM_REACTION_TIME ? "You win" : "Adam wins",
    title: `${result} ms`,
    instruction: result < ADAM_REACTION_TIME
      ? "You beat my time."
      : result === ADAM_REACTION_TIME
        ? "We got the exact same time."
        : "I was faster this round.",
    action: "Play again",
  } : gameCopy[status];

  return (
    <main className={`reaction-page reaction-${status}`} id="main-content">
      <section className="reaction-shell">
        <SiteHeader light={status !== "ready"} />

        <div className="reaction-intro">
          <p className="reaction-kicker">05 / Reaction test</p>
          <h1>Can you<br /><em>beat me?</em></h1>
          <EditorialIcon name="timer" className="reaction-hero-icon" />
        </div>

        <div className="reaction-game">
          <header className="reaction-game-header">
            <h2>Reaction test</h2>
            <ol aria-label="How to play">
              <li><span>1</span> Start</li>
              <li><span>2</span> Wait</li>
              <li><span>3</span> Click</li>
            </ol>
          </header>

          <button
            className="reaction-arena"
            type="button"
            onPointerDown={handlePointerDown}
            onKeyDown={handleKeyDown}
            aria-label={`${copy.title} ${copy.instruction} ${copy.action}`}
          >
            <span className="reaction-arena-top">
              <span>{copy.marker}</span>
              <span>{status === "waiting" ? "Signal pending" : status === "ready" ? "Timer running" : "Mouse, touch, or spacebar"}</span>
            </span>

            <span className="reaction-arena-center">
              <strong>{copy.title}</strong>
              <span>{copy.instruction}</span>
            </span>

            <span className="reaction-arena-bottom">
              <span>{copy.action}</span>
              <span aria-hidden="true">↗</span>
            </span>
          </button>

          <div className="reaction-meta" aria-live="polite">
            <span>Your best this visit</span>
            <strong>{best === null ? "--" : `${best} ms`}</strong>
          </div>
        </div>
      </section>

      <footer className="portfolio-footer">
        <a href="/">← Back home</a>
        <span>One signal. No warm-up.</span>
      </footer>
    </main>
  );
}
