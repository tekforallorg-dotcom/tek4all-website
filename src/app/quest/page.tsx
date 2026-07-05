import Link from "next/link";

/*
 * Quest landing, executive light. Server component; all motion is CSS.
 * Black / White / Gold / Steel. Gold is scarce by rule: rules, dots, one
 * period, the radar line, the XP fill, the final trail bead, the L5 crown.
 * Copy rule: no em dashes anywhere. Separators are middle dots or commas.
 */

const CLASS_CARDS = [
  { idx: "01", title: "The Evidence Hunter", quote: "We lose hours hunting for reports, photos, and field evidence.", icon: "search" },
  { idx: "02", title: "The Spreadsheet Survivor", quote: "Our data lives in twenty Excel files and nobody sees the full picture.", icon: "grid" },
  { idx: "03", title: "The Deadline Firefighter", quote: "Every donor report and proposal is a last-minute scramble.", icon: "flame" },
  { idx: "04", title: "The Field Chaos Manager", quote: "Field updates and beneficiary records live everywhere and nowhere.", icon: "pin" },
  { idx: "05", title: "The Quiet Risk Carrier", quote: "We handle sensitive data and our protections are thinner than they should be.", icon: "shield" },
  { idx: "06", title: "The Manual Work Machine", quote: "Too much admin, finance, and HR work is repetitive copy and paste.", icon: "loop" },
] as const;

const MISSIONS = [
  { n: "01", t: "Snapshot" },
  { n: "02", t: "Pressure Points" },
  { n: "03", t: "Data Reality" },
  { n: "04", t: "People & Change" },
  { n: "05", t: "Risk & Duty" },
  { n: "06", t: "Opportunity Fit" },
] as const;

const LEVELS = [
  { lv: "LVL 01", nm: "Foundation Stage", cls: "q-s1" },
  { lv: "LVL 02", nm: "Digital Starter", cls: "q-s2" },
  { lv: "LVL 03", nm: "Workflow Builder", cls: "q-s3" },
  { lv: "LVL 04", nm: "AI-Ready Team", cls: "q-s4" },
  { lv: "LVL 05", nm: "Impact Intelligence Leader", cls: "q-s5" },
] as const;

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );
    case "grid":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="7" height="7" rx="1.5" />
          <rect x="13" y="4" width="7" height="7" rx="1.5" />
          <rect x="4" y="13" width="7" height="7" rx="1.5" />
          <rect x="13" y="13" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "flame":
      return (
        <svg {...common}>
          <path d="M12 3c1 3 4 4.5 4 8a4 4 0 0 1-8 0c0-1.5.5-2.5 1.2-3.6" />
          <path d="M12 21a7 7 0 0 0 7-7c0-1.2-.3-2.3-.8-3.3" />
          <path d="M5.8 10.7A7 7 0 0 0 12 21" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M12 21s-6.5-5.2-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.8 12 21 12 21Z" />
          <circle cx="12" cy="10.5" r="2.3" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 5 6v5.5c0 4.3 3 7.6 7 9.5 4-1.9 7-5.2 7-9.5V6l-7-3Z" />
          <path d="m9.3 12 1.9 1.9 3.5-3.8" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M17 3v6h-6" />
          <path d="M7 21v-6h6" />
          <path d="M20.5 9A8.5 8.5 0 0 0 6 5.5L3.5 8" />
          <path d="M3.5 15a8.5 8.5 0 0 0 14.5 3.5L20.5 16" />
        </svg>
      );
  }
}

// Static 7-axis readiness radar; graphite rings, brushed-gold data line.
function Radar() {
  return (
    <svg className="q-radar" width="230" height="158" viewBox="0 0 230 158" role="img" aria-label="Seven-dimension readiness radar">
      <g transform="translate(115,81)">
        <g fill="none" stroke="rgba(229,229,229,0.16)">
          <polygon points="0,-60 46.9,-37.4 58.5,13.4 26,54.1 -26,54.1 -58.5,13.4 -46.9,-37.4" />
          <polygon points="0,-39.6 31,-24.7 38.6,8.8 17.2,35.7 -17.2,35.7 -38.6,8.8 -31,-24.7" />
          <polygon points="0,-19.8 15.5,-12.4 19.3,4.4 8.6,17.9 -8.6,17.9 -19.3,4.4 -15.5,-12.4" />
        </g>
        <g stroke="rgba(229,229,229,0.09)">
          <line x1="0" y1="0" x2="0" y2="-60" />
          <line x1="0" y1="0" x2="46.9" y2="-37.4" />
          <line x1="0" y1="0" x2="58.5" y2="13.4" />
          <line x1="0" y1="0" x2="26" y2="54.1" />
          <line x1="0" y1="0" x2="-26" y2="54.1" />
          <line x1="0" y1="0" x2="-58.5" y2="13.4" />
          <line x1="0" y1="0" x2="-46.9" y2="-37.4" />
        </g>
        <polygon
          points="0,-46.8 25.8,-20.6 49.7,11.4 11.7,24.3 -16.9,35.1 -29.2,6.7 -32.8,-26.2"
          fill="rgba(200,169,107,0.16)"
          stroke="#c8a96b"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <g fill="#c8a96b">
          <circle cx="0" cy="-46.8" r="2.5" />
          <circle cx="25.8" cy="-20.6" r="2.5" />
          <circle cx="49.7" cy="11.4" r="2.5" />
          <circle cx="11.7" cy="24.3" r="2.5" />
          <circle cx="-16.9" cy="35.1" r="2.5" />
          <circle cx="-29.2" cy="6.7" r="2.5" />
          <circle cx="-32.8" cy="-26.2" r="2.5" />
        </g>
      </g>
    </svg>
  );
}

export default function QuestLandingPage() {
  return (
    <>
      <div className="q-clouds" aria-hidden="true" />

      <header className="q-top">
        <div className="qwrap">
          <div className="q-brand">
            <span className="q-mark">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4Z" />
                <path d="m9 12 2 2 4-4.5" />
              </svg>
            </span>
            <b>AI Readiness Quest</b>
            <span className="q-by">by Tek4All</span>
          </div>
          <Link className="q-ghost" href="/">
            tekforall.org
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M3 9 9 3M4.5 3H9v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </header>

      <main className="q-main">
        {/* hero */}
        <section className="q-hero">
          <div className="qwrap q-hero-grid">
            <div>
              <div className="q-cred q-rise">
                <span className="q-cred-rule" />
                <span className="q-cred-text">
                  For African development teams
                  <span className="q-kdot" />
                  NDPA-aware
                  <span className="q-kdot" />
                  Free
                </span>
              </div>
              <h1 className="q-display q-rise" style={{ animationDelay: "0.08s" }}>
                <span className="q-ln1">Not a score.</span>
                <br />
                <span className="q-ln2">
                  A first move<span className="q-gdot">.</span>
                </span>
              </h1>
              <p className="q-lede q-rise" style={{ animationDelay: "0.16s" }}>
                A premium AI readiness diagnostic that helps development
                organisations discover where AI and automation can improve work
                first, without wasting money, exposing data, or chasing hype.
              </p>
              <div className="q-cta-row q-rise" style={{ animationDelay: "0.24s" }}>
                <a className="q-cta" href="#missions">
                  Start the Quest
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a className="q-cta-2" href="#missions">See how it works</a>
              </div>
              <div className="q-microrow q-rise" style={{ animationDelay: "0.3s" }}>
                <span className="q-micro"><b>~12 min</b> to finish</span>
                <span className="q-mdot" />
                <span className="q-micro"><b>Instant</b> report</span>
                <span className="q-mdot" />
                <span className="q-micro"><b>No signup</b> to start</span>
              </div>
            </div>

            {/* intelligence panel */}
            <div className="q-panel">
              <div className="q-pc-top">
                <span className="q-pc-idx">CLASS 03 / 06</span>
                <span className="q-pc-lvl">LVL 3 &middot; Workflow Builder</span>
              </div>
              <div className="q-pc-medal">
                <Icon name="flame" size={24} />
              </div>
              <div className="q-pc-class">The Deadline Firefighter</div>
              <div className="q-pc-sub">
                Every donor report is a last-minute scramble. Your Quest maps the
                fastest safe win.
              </div>
              <Radar />
              <div className="q-pc-xp">
                <div className="q-pc-xp-label">
                  <span>READINESS XP</span>
                  <span>640 / 1000</span>
                </div>
                <div className="q-pc-xp-track">
                  <div className="q-pc-xp-fill" />
                </div>
              </div>
              <div className="q-pc-stats">
                <div className="q-pc-stat"><b>7</b><span>DIMENSIONS</span></div>
                <div className="q-pc-stat"><b>6</b><span>MISSIONS</span></div>
                <div className="q-pc-stat"><b>5</b><span>LEVELS</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* class cards */}
        <section className="q-block">
          <div className="qwrap q-center">
            <p className="q-kicker">
              <span className="q-krule" />
              <span>Choose your class</span>
              <span className="q-krule" />
            </p>
            <h2 className="q-sec">Which one is you?</h2>
            <p className="q-sub">
              The Quest opens with a choice, not a form. Pick the reality that
              sounds most like your organisation and the diagnostic shapes itself
              around it.
            </p>
          </div>
          <div className="qwrap">
            <div className="q-cards">
              {CLASS_CARDS.map((c) => (
                <div key={c.idx} className="q-card">
                  <div className="q-card-top">
                    <span className="q-medal"><Icon name={c.icon} /></span>
                    <span className="q-idx">{c.idx} / 06</span>
                  </div>
                  <h3>{c.title}</h3>
                  <p>&ldquo;{c.quote}&rdquo;</p>
                  <div className="q-rarity" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* quest log */}
        <section className="q-block" id="missions" style={{ scrollMarginTop: 90 }}>
          <div className="qwrap">
            <div className="q-questlog">
              <div className="q-ql-head">
                <div>
                  <p className="q-kicker">
                    <span className="q-krule" />
                    <span>Six missions, not seventy questions</span>
                  </p>
                  <h2 className="q-sec q-sec-sm">A diagnostic that plays like a journey</h2>
                </div>
                <span className="q-ql-meta">
                  28 questions <span className="q-mdot" /> 7 dimensions <span className="q-mdot" /> a badge per mission
                </span>
              </div>
              <div className="q-trail">
                {MISSIONS.map((m) => (
                  <div key={m.n} className="q-node">
                    <div className="q-bead">{m.n}</div>
                    <p>{m.t}</p>
                  </div>
                ))}
              </div>
              <div className="q-rewards">
                <div className="q-reward">
                  <b>Your smartest first move</b>
                  <p>One priority, two next steps, and what not to do yet.</p>
                </div>
                <div className="q-reward">
                  <b>A live readiness radar</b>
                  <p>Seven dimensions scored, revealed with your level, not a bare percentage.</p>
                </div>
                <div className="q-reward">
                  <b>Honest by design</b>
                  <p>Sometimes the answer is: do not adopt AI yet. We will tell you that too.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* level staircase */}
        <section className="q-block">
          <div className="qwrap q-center">
            <p className="q-kicker">
              <span className="q-krule" />
              <span>The climb</span>
              <span className="q-krule" />
            </p>
            <h2 className="q-sec">Five levels. Every organisation starts somewhere.</h2>
          </div>
          <div className="qwrap">
            <div className="q-meter">
              {LEVELS.map((l) => (
                <div key={l.lv} className={"q-step " + l.cls}>
                  <span className="q-lv">{l.lv}</span>
                  <span className="q-nm">{l.nm}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="q-foot">
        <div className="qwrap">
          <p>
            Built by Tek4All, a registered Nigerian nonprofit (RC 7542130).
            <br />
            <b>NDPA-aware &middot; we never rank or name your organisation publicly.</b>
          </p>
          <a className="q-ghost" href="mailto:impact@tekforall.org">
            impact@tekforall.org
          </a>
        </div>
      </footer>
    </>
  );
}
