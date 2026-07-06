import { MISSIONS } from "../_data/questions";

/*
 * Report Assembly panel. Presentational; everything derives from
 * currentMission (1..6, 7 = done) and percent. Desktop: sticky matte-black
 * side panel. Mobile: compact card (see flow.css).
 */

const STATUS: Record<number, string> = {
  1: "Mapping organisation snapshot",
  2: "Locating pressure points",
  3: "Scanning data reality",
  4: "Reading change readiness",
  5: "Checking the risk gate",
  6: "Locking opportunity signal",
  7: "Diagnostic complete. Report assembled.",
};

const SECTIONS = [
  { label: "Organisation profile", from: 1, to: 1 },
  { label: "Bottleneck map", from: 2, to: 3 },
  { label: "Change readiness", from: 4, to: 4 },
  { label: "Risk gate", from: 5, to: 5 },
  { label: "Recommendation", from: 6, to: 6 },
] as const;

function sectionState(currentMission: number, from: number, to: number) {
  if (currentMission > to) return "complete";
  if (currentMission >= from) return "active";
  return "locked";
}

export function ReportPanel({
  currentMission,
  percent,
}: {
  currentMission: number;
  percent: number;
}) {
  const done = currentMission > 6;
  const shownPercent = done ? 100 : percent;

  return (
    <aside className="qf-panel" aria-label="Report assembly">
      <div className="qf-panel-head">
        <span className="qf-panel-kicker">Report assembly</span>
        <span className={"qf-panel-live" + (done ? " is-done" : "")} aria-hidden="true" />
      </div>

      {/* Readiness core: one ring locks per completed mission */}
      <div className="qf-core" aria-hidden="true">
        {MISSIONS.map((m) => {
          const ringState =
            currentMission > m.n ? " is-locked" : m.n === currentMission ? " is-active" : "";
          return <span key={m.n} className={"qf-core-ring qf-core-r" + m.n + ringState} />;
        })}
        <span className={"qf-core-dot" + (done ? " is-done" : "")} />
      </div>

      <p className="qf-panel-status" role="status">
        <span className="qf-panel-status-dot" aria-hidden="true" />
        {STATUS[Math.min(currentMission, 7)]}
      </p>

      <ul className="qf-panel-list">
        {SECTIONS.map((s) => {
          const st = done ? "complete" : sectionState(currentMission, s.from, s.to);
          return (
            <li key={s.label} className={"qf-panel-item is-" + st}>
              <span className="qf-panel-mark" aria-hidden="true">
                {st === "complete" && (
                  <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                    <path d="m2.5 6.5 2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className="qf-panel-item-label">{s.label}</span>
              <span className="qf-panel-item-state">
                {st === "complete" ? "Complete" : st === "active" ? "Building" : "Locked"}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="qf-panel-report">
        <div className="qf-panel-report-top">
          <span>Final report</span>
          <b>{done ? "Assembled" : shownPercent + "% assembled"}</b>
        </div>
        <div className="qf-panel-bar" aria-hidden="true">
          <div className="qf-panel-bar-fill" style={{ width: shownPercent + "%" }} />
        </div>
        <p className="qf-panel-note">
          {done
            ? "Level, radar, and your smartest first move attach here."
            : "Radar and level unlock with your report."}
        </p>
      </div>
    </aside>
  );
}
