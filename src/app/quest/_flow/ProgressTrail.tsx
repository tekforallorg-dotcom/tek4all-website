import { MISSIONS } from "../_data/questions";

/*
 * Pathfinder Map Line: a thin route with six mission nodes. Completed nodes
 * are matte black with a gold check, the current node carries the gold
 * highlight, future nodes are pale steel. A calibration pulse scans the
 * filled segment (see flow.css). Presentational.
 */
export function ProgressTrail({
  currentMission,
  percent,
}: {
  currentMission: number;
  percent: number;
}) {
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
      <div className="qf-path">
        <div className="qf-path-line" aria-hidden="true">
          <div className="qf-path-fill" style={{ width: percent + "%" }}>
            <span className="qf-path-pulse" />
          </div>
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
