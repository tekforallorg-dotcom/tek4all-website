import type { QuestQuestion } from "../_data/types";
import { MISSIONS, QUESTIONS } from "../_data/questions";
import { INSIGHTS } from "./insights";

/* One question, single or multi. Presentational; state lives in QuestFlow. */
export function MissionScreen({
  question,
  index,
  total,
  selected,
  onToggle,
  onBack,
  onNext,
  canGoBack,
  isLast,
}: {
  question: QuestQuestion;
  index: number;
  total: number;
  selected: string[];
  onToggle: (optionKey: string) => void;
  onBack: () => void;
  onNext: () => void;
  canGoBack: boolean;
  isLast: boolean;
}) {
  const mission = MISSIONS.find((m) => m.n === question.mission);
  const isMulti = question.type === "multi";
  const atMax = isMulti && question.maxSelect !== undefined && selected.length >= question.maxSelect;
  const answered = selected.length > 0;

  // First question of this mission opens the mission; show the unlock cue
  // for the mission just completed. Derived from static data, never state.
  const isMissionStart =
    QUESTIONS.find((q) => q.mission === question.mission)?.id === question.id;
  const prevMission =
    isMissionStart && question.mission > 1
      ? MISSIONS.find((m) => m.n === question.mission - 1)
      : undefined;

  const insight = answered ? INSIGHTS[question.id] : undefined;

  return (
    <div key={question.id} className="qf-rise">
      {prevMission && (
        <p className="qf-unlock" role="status">
          <span className="qf-unlock-rule" aria-hidden="true" />
          Mission {String(prevMission.n).padStart(2, "0")} complete &middot; {prevMission.badge} unlocked
        </p>
      )}

      <div className="qf-qtop">
        <span className="qf-mission">
          Mission {String(question.mission).padStart(2, "0")} &middot; {mission ? mission.title : ""}
        </span>
        <span className="qf-count">{index + 1} of {total}</span>
      </div>
      {mission && <p className="qf-purpose">{mission.payoff}</p>}

      <h2 className="qf-q">{question.body}</h2>
      {question.hint && <p className="qf-hint">{question.hint}</p>}

      <div className="qf-opts" role={isMulti ? "group" : "radiogroup"} aria-label={question.body}>
        {question.options.map((o, i) => {
          const isSelected = selected.includes(o.key);
          const disabled = isMulti && atMax && !isSelected;
          return (
            <button
              key={o.key}
              type="button"
              role={isMulti ? "checkbox" : "radio"}
              aria-checked={isSelected}
              disabled={disabled}
              onClick={() => onToggle(o.key)}
              className={"qf-opt qf-opt-in" + (isSelected ? " is-selected" : "") + (disabled ? " is-disabled" : "")}
              style={{ animationDelay: (0.04 * i).toFixed(2) + "s" }}
            >
              <span className={"qf-mark " + (isMulti ? "qf-check" : "qf-radio")} aria-hidden="true">
                {isSelected && (
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="m2.5 6.5 2.5 2.5 4.5-5" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              {o.label}
            </button>
          );
        })}
      </div>

      {insight && (
        <p className="qf-insight" role="status">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 3v3m0 12v3M3 12h3m12 0h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.8" />
          </svg>
          {insight}
        </p>
      )}

      <div className="qf-nav">
        <button type="button" className="qf-back" onClick={onBack} disabled={!canGoBack}>
          Back
        </button>
        <button type="button" className="qf-next" onClick={onNext} disabled={!answered}>
          {isLast ? "Finish the Quest" : "Next"}
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
