import { IDENTITY_CARDS } from "../_data/questions";

/* Opening class choice. Sets flow tone; does not score. */
export function IdentityCards({ onPick }: { onPick: (key: string) => void }) {
  return (
    <div className="qf-rise">
      <div className="qf-head">
        <p className="qf-kicker">
          <span className="qf-krule" />
          <span>Choose your class</span>
          <span className="qf-krule" />
        </p>
        <h1 className="qf-title">Which one is you?</h1>
        <p className="qf-sub">
          Pick the reality that sounds most like your organisation. There is no
          wrong answer, and it does not affect your score.
        </p>
      </div>

      <div className="qf-choices">
        {IDENTITY_CARDS.map((c, i) => (
          <button
            key={c.key}
            type="button"
            onClick={() => onPick(c.key)}
            className={"qf-choice qf-rise" + (c.key === "bit_of_everything" ? " qf-wide" : "")}
            style={{ animationDelay: (0.05 * i).toFixed(2) + "s" }}
          >
            <h3>{c.title}</h3>
            <p>&ldquo;{c.quote}&rdquo;</p>
          </button>
        ))}
      </div>
    </div>
  );
}
