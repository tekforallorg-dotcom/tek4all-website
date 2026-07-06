"use client";

import { useEffect, useState } from "react";
import { MISSIONS } from "../_data/questions";

/*
 * Pathfinder Map Line with a Random Progress Theme Engine.
 *
 * The track structure never changes: six mission nodes on a thin route,
 * matte-black fill, done/active/future states. What varies is the progress
 * metaphor riding the line. One theme is drawn at random per session
 * (sessionStorage) and kept for the whole run.
 *
 * "signal-pulse" is the default: it is what the server renders, what
 * reduced-motion users keep, and the fallback if storage is unavailable.
 * All figures are abstract silhouettes, matte black with one gold accent.
 */

const THEMES = [
  "signal-pulse",
  "tightrope",
  "hanging-bar",
  "pathfinder-drive",
  "mountain-climber",
] as const;
type ThemeKey = (typeof THEMES)[number];

const THEME_STORAGE_KEY = "tek4all-quest-theme";

function pickSessionTheme(): ThemeKey {
  try {
    const stored = window.sessionStorage.getItem(THEME_STORAGE_KEY) as ThemeKey | null;
    if (stored && (THEMES as readonly string[]).includes(stored)) return stored;
    const next = THEMES[Math.floor(Math.random() * THEMES.length)];
    window.sessionStorage.setItem(THEME_STORAGE_KEY, next);
    return next;
  } catch {
    return "signal-pulse";
  }
}

/* Abstract marker silhouettes. Ink strokes, one gold micro-accent each. */
function ThemeGlyph({ theme }: { theme: ThemeKey }) {
  switch (theme) {
    case "tightrope":
      // Balance pole in gold; feet meet the route line.
      return (
        <svg width="26" height="27" viewBox="0 0 26 27" fill="none" aria-hidden="true">
          <path d="M3.5 12.4 22.5 10.6" className="qf-g-gold" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="13" cy="4.4" r="2.5" className="qf-g-ink" strokeWidth="1.6" />
          <path d="M13 7v9.6" className="qf-g-ink" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M13 16.6 10.4 26M13 16.6 15.6 26" className="qf-g-ink" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "hanging-bar":
      // Grip dot in gold sits on the rail; body swings beneath.
      return (
        <svg width="26" height="27" viewBox="0 0 26 27" fill="none" aria-hidden="true">
          <circle cx="13" cy="2" r="1.9" className="qf-g-goldfill" />
          <path d="M9.6 2.8 13 9m3.4-6.2L13 9" className="qf-g-ink" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="13" cy="11.4" r="2.4" className="qf-g-ink" strokeWidth="1.6" />
          <path d="M13 13.8v5.4" className="qf-g-ink" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M13 19.2 10.6 25.6m2.4-6.4 2.4 6.4" className="qf-g-ink" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "pathfinder-drive":
      // Executive capsule marker, gold headlight leading.
      return (
        <svg width="30" height="12" viewBox="0 0 30 12" fill="none" aria-hidden="true">
          <rect x="1.5" y="2.5" width="23" height="7" rx="3.5" className="qf-g-inkfill" />
          <circle cx="21.5" cy="6" r="1.8" className="qf-g-goldfill" />
        </svg>
      );
    case "mountain-climber":
      // Leaning traverse; the reaching hand chalks the line in gold.
      return (
        <svg width="26" height="27" viewBox="0 0 26 27" fill="none" aria-hidden="true">
          <circle cx="20.5" cy="24.4" r="1.8" className="qf-g-goldfill" />
          <path d="M20.5 23.2 13.8 13.4" className="qf-g-ink" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="11" cy="7.6" r="2.4" className="qf-g-ink" strokeWidth="1.6" />
          <path d="M12 9.8 14.6 17" className="qf-g-ink" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M14.6 17 9.4 25.4m5.2-8.4L17.2 25.4" className="qf-g-ink" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

export function ProgressTrail({
  currentMission,
  percent,
}: {
  currentMission: number;
  percent: number;
}) {
  // Deterministic first paint (signal-pulse), themed after hydration.
  const [theme, setTheme] = useState<ThemeKey>("signal-pulse");
  useEffect(() => {
    setTheme(pickSessionTheme());
  }, []);

  // Keep the marker clear of the terminal beads.
  const markerLeft = Math.max(1.5, Math.min(98.5, percent));

  return (
    <div
      className="qf-progress"
      role="img"
      aria-label={
        "Diagnostic progress: " +
        percent +
        " percent, mission " +
        Math.min(currentMission, 6) +
        " of 6"
      }
    >
      <div className={"qf-path qf-theme-" + theme}>
        <div className="qf-path-line" aria-hidden="true">
          <div className="qf-path-fill" style={{ width: percent + "%" }}>
            {theme === "signal-pulse" && <span className="qf-path-pulse" />}
          </div>
          {theme !== "signal-pulse" && (
            <span className="qf-marker" style={{ left: markerLeft + "%" }}>
              <span className="qf-marker-fig">
                <ThemeGlyph theme={theme} />
              </span>
            </span>
          )}
        </div>

        <div className="qf-path-nodes" aria-hidden="true">
          {MISSIONS.map((m) => {
            const done = m.n < currentMission;
            const active = m.n === currentMission;
            return (
              <div
                key={m.n}
                className={"qf-path-node" + (done ? " is-done" : active ? " is-active" : "")}
              >
                <span className="qf-path-bead">
                  {done ? (
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="m2.5 6.5 2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    String(m.n).padStart(2, "0")
                  )}
                </span>
                <span className="qf-path-label">{m.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
