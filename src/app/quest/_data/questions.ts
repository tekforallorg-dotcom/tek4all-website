/*
 * Section-11 question bank, v1 draft for in-product review.
 * 28 core questions + 3 conditional (safeguarding). Options carry score tags
 * consumed by the engine slice. Copy rule: no em dashes anywhere.
 */
import type { IdentityCardDef, MissionDef, QuestQuestion } from "./types";

export const IDENTITY_CARDS: IdentityCardDef[] = [
  { key: "evidence_hunter", title: "The Evidence Hunter", quote: "We lose hours hunting for reports, photos, and field evidence." },
  { key: "spreadsheet_survivor", title: "The Spreadsheet Survivor", quote: "Our data lives in twenty Excel files and nobody sees the full picture." },
  { key: "deadline_firefighter", title: "The Deadline Firefighter", quote: "Every donor report and proposal is a last-minute scramble." },
  { key: "field_chaos_manager", title: "The Field Chaos Manager", quote: "Field updates and beneficiary records live everywhere and nowhere." },
  { key: "quiet_risk_carrier", title: "The Quiet Risk Carrier", quote: "We handle sensitive data and our protections are thinner than they should be." },
  { key: "manual_work_machine", title: "The Manual Work Machine", quote: "Too much admin, finance, and HR work is repetitive copy-paste." },
  { key: "bit_of_everything", title: "Honestly, a bit of everything", quote: "More than one of these sounds painfully familiar." },
];

export const MISSIONS: MissionDef[] = [
  { n: 1, title: "Snapshot", payoff: "Six quick questions so the Quest knows who it is talking to.", badge: "Evidence Mapper" },
  { n: 2, title: "Pressure Points", payoff: "Five questions. This tells us where you are losing the most time.", badge: "Reality Checker" },
  { n: 3, title: "Data Reality", payoff: "How evidence and data actually live in your organisation today.", badge: "Workflow Scout" },
  { n: 4, title: "People & Change", payoff: "Whether a new way of working would actually stick.", badge: "Change Reader" },
  { n: 5, title: "Risk & Responsibility", payoff: "The safety net questions. Honest answers protect you here.", badge: "Risk Guardian" },
  { n: 6, title: "Opportunity Fit", payoff: "Your instinct versus what the data says. Two questions.", badge: "Opportunity Finder" },
];

export const QUESTIONS: QuestQuestion[] = [
  /* ── Mission 1: Snapshot ─────────────────────────────────────── */
  {
    id: "q1", mission: 1, type: "single",
    body: "What kind of organisation are you?",
    options: [
      { key: "local_ngo", label: "Local NGO", tags: { meta: { segment: "local_ngo" } } },
      { key: "foundation", label: "Foundation", tags: { meta: { segment: "foundation" } } },
      { key: "ingo", label: "INGO country office", tags: { meta: { segment: "ingo" } } },
      { key: "donor_programme", label: "Donor-funded programme", tags: { meta: { segment: "donor_programme" } } },
      { key: "gov_adjacent", label: "Government-adjacent body", tags: { meta: { segment: "gov_adjacent" } } },
      { key: "csr", label: "CSR or corporate foundation team", tags: { meta: { segment: "csr" } } },
    ],
  },
  {
    id: "q2", mission: 1, type: "single",
    body: "How many paid staff do you have?",
    options: [
      { key: "s1_5", label: "1 to 5", tags: { dims: { d6: 1 } } },
      { key: "s6_20", label: "6 to 20", tags: { dims: { d6: 2 } } },
      { key: "s21_50", label: "21 to 50", tags: { dims: { d6: 2 } } },
      { key: "s50p", label: "More than 50", tags: { dims: { d6: 3 } } },
    ],
  },
  {
    id: "q3", mission: 1, type: "multi",
    body: "Which sectors do you work in?",
    hint: "Select all that apply.",
    options: [
      { key: "education", label: "Education" },
      { key: "health", label: "Health" },
      { key: "livelihoods", label: "Livelihoods" },
      { key: "child_protection", label: "Child protection" },
      { key: "gbv", label: "GBV" },
      { key: "idps_refugees", label: "IDPs and refugees" },
      { key: "disability", label: "Disability" },
      { key: "wash", label: "WASH" },
      { key: "governance", label: "Governance" },
      { key: "other", label: "Other" },
    ],
  },
  {
    id: "q4", mission: 1, type: "multi",
    body: "Which tools does your team actually use every week?",
    hint: "Select all that apply. Honest beats impressive.",
    options: [
      { key: "whatsapp", label: "WhatsApp", tags: { meta: { tool: "whatsapp" } } },
      { key: "excel", label: "Excel or Google Sheets", tags: { meta: { tool: "excel" } } },
      { key: "google", label: "Google Workspace", tags: { meta: { tool: "google" }, dims: { d3: 1 } } },
      { key: "microsoft", label: "Microsoft 365", tags: { meta: { tool: "microsoft" }, dims: { d3: 1 } } },
      { key: "kobo", label: "KoboToolbox or ODK", tags: { meta: { tool: "kobo" }, dims: { d3: 1 } } },
      { key: "paper", label: "Paper forms", tags: { meta: { tool: "paper" } } },
      { key: "accounting", label: "Accounting software", tags: { meta: { tool: "accounting" } } },
      { key: "project", label: "Project tools (Trello, ClickUp)", tags: { meta: { tool: "project" }, dims: { d3: 1 } } },
      { key: "crm", label: "A CRM", tags: { meta: { tool: "crm" }, dims: { d3: 1 } } },
    ],
  },
  {
    id: "q5", mission: 1, type: "single",
    body: "What is your role?",
    options: [
      { key: "ed", label: "ED or founder", tags: { meta: { authority: "high" } } },
      { key: "programme", label: "Programme lead", tags: { meta: { authority: "high" } } },
      { key: "me", label: "M&E", tags: { meta: { authority: "mid" } } },
      { key: "ops", label: "Operations or admin", tags: { meta: { authority: "mid" } } },
      { key: "ict", label: "ICT", tags: { meta: { authority: "mid" } } },
      { key: "finance", label: "Finance", tags: { meta: { authority: "mid" } } },
      { key: "comms", label: "Communications", tags: { meta: { authority: "low" } } },
      { key: "other", label: "Other", tags: { meta: { authority: "low" } } },
    ],
  },
  {
    id: "q6", mission: 1, type: "single",
    body: "Roughly what share of your funding is donor-project-based?",
    options: [
      { key: "almost_all", label: "Almost all of it" },
      { key: "most", label: "Most of it" },
      { key: "some", label: "Some of it" },
      { key: "little", label: "Very little" },
    ],
  },

  /* ── Mission 2: Pressure Points ──────────────────────────────── */
  {
    id: "q7", mission: 2, type: "single",
    body: "Think of your last donor or board report. What was that experience like?",
    options: [
      { key: "a", label: "A scramble: hunting evidence across phones, email, and WhatsApp", tags: { bottlenecks: { evidence_fragmentation: 3, reporting_delay: 2 } } },
      { key: "b", label: "Stressful, but we found most things", tags: { bottlenecks: { evidence_fragmentation: 2 } } },
      { key: "c", label: "Manageable: we have templates but assembly is manual", tags: { bottlenecks: { reporting_delay: 1 }, dims: { d2: 2 } } },
      { key: "d", label: "Smooth: evidence is organised and reporting is fast", tags: { dims: { d2: 3 } } },
    ],
  },
  {
    id: "q8", mission: 2, type: "multi", maxSelect: 2,
    body: "Where does your team lose the most hours in a normal month?",
    hint: "Pick up to two.",
    options: [
      { key: "finding", label: "Finding files and evidence", tags: { bottlenecks: { evidence_fragmentation: 2 } } },
      { key: "writing", label: "Writing reports and proposals", tags: { bottlenecks: { proposal_pressure: 2 } } },
      { key: "cleaning", label: "Cleaning messy data", tags: { bottlenecks: { data_chaos: 2 } } },
      { key: "admin", label: "Repetitive admin: emails, minutes, memos", tags: { bottlenecks: { manual_overload: 2 } } },
      { key: "chasing", label: "Chasing field updates", tags: { bottlenecks: { field_chaos: 2 } } },
      { key: "it", label: "Fixing IT and access problems", tags: { bottlenecks: { infra_pain: 2 } } },
    ],
  },
  {
    id: "q9", mission: 2, type: "single",
    body: "When a donor asks an unexpected question about results, how long does it take to answer with evidence?",
    options: [
      { key: "a", label: "Days, if at all", tags: { bottlenecks: { visibility_gap: 3 } } },
      { key: "b", label: "A day or two of digging", tags: { bottlenecks: { visibility_gap: 2 } } },
      { key: "c", label: "A few hours", tags: { bottlenecks: { visibility_gap: 1 } } },
      { key: "d", label: "Minutes: it is in a tracker or dashboard", tags: { dims: { d2: 3 } } },
    ],
  },
  {
    id: "q10", mission: 2, type: "single",
    body: "When your team wants to improve how work gets done digitally, what usually happens?",
    options: [
      { key: "a", label: "Everyone does their own thing", tags: { dims: { d1: 0 } } },
      { key: "b", label: "We discuss it, but rarely implement", tags: { dims: { d1: 1 } } },
      { key: "c", label: "Some tools and champions exist", tags: { dims: { d1: 2 } } },
      { key: "d", label: "Leadership actively drives improvements", tags: { dims: { d1: 3 } } },
    ],
  },
  {
    id: "q11", mission: 2, type: "single",
    body: "Does AI or automation connect to a real goal your leadership has named, or is it mostly curiosity?",
    options: [
      { key: "a", label: "Nobody has raised it", tags: { dims: { d1: 0 } } },
      { key: "b", label: "Curiosity only", tags: { dims: { d1: 1 } } },
      { key: "c", label: "Named as a priority, but no plan", tags: { dims: { d1: 2 } } },
      { key: "d", label: "A named priority with someone responsible", tags: { dims: { d1: 3 } } },
    ],
  },

  /* ── Mission 3: Data Reality ─────────────────────────────────── */
  {
    id: "q12", mission: 3, type: "single",
    body: "Where do programme photos and field evidence mostly live?",
    options: [
      { key: "a", label: "Staff personal phones and WhatsApp", tags: { dims: { d2: 0 }, bottlenecks: { evidence_fragmentation: 3 }, riskFlags: ["personal_devices"] } },
      { key: "b", label: "A mix of phones, email, and some shared folders", tags: { dims: { d2: 1 } } },
      { key: "c", label: "A shared drive with loose structure", tags: { dims: { d2: 2 } } },
      { key: "d", label: "A structured shared drive with naming conventions", tags: { dims: { d2: 3 } } },
    ],
  },
  {
    id: "q13", mission: 3, type: "single",
    body: "If a staff member left today, would the organisation still know where key project files, passwords, and evidence are stored?",
    options: [
      { key: "a", label: "Honestly, no", tags: { dims: { d2: 0 }, bottlenecks: { knowledge_loss: 3 }, riskFlags: ["continuity"] } },
      { key: "b", label: "Partially", tags: { dims: { d2: 1 }, bottlenecks: { knowledge_loss: 2 } } },
      { key: "c", label: "Mostly", tags: { dims: { d2: 2 } } },
      { key: "d", label: "Yes, fully", tags: { dims: { d2: 3 } } },
    ],
  },
  {
    id: "q14", mission: 3, type: "single",
    body: "How does field data like attendance, surveys, and activity records get collected?",
    options: [
      { key: "a", label: "Paper, typed up later or not at all", tags: { dims: { d3: 0 }, bottlenecks: { paper_dependence: 3 } } },
      { key: "b", label: "Paper plus phone photos of forms", tags: { dims: { d3: 1 }, bottlenecks: { paper_dependence: 2 } } },
      { key: "c", label: "Digital forms, used inconsistently", tags: { dims: { d3: 2 } } },
      { key: "d", label: "Digital forms as standard practice", tags: { dims: { d3: 3 } } },
    ],
  },
  {
    id: "q15", mission: 3, type: "single",
    body: "How clean are your core spreadsheets or trackers?",
    options: [
      { key: "a", label: "What trackers?", tags: { dims: { d2: 0 }, bottlenecks: { data_chaos: 3 } } },
      { key: "b", label: "They exist but versions conflict", tags: { dims: { d2: 1 }, bottlenecks: { data_chaos: 2 } } },
      { key: "c", label: "Mostly one source of truth, with some mess", tags: { dims: { d2: 2 } } },
      { key: "d", label: "Clean, consistent, one source of truth", tags: { dims: { d2: 3 } } },
    ],
  },
  {
    id: "q16", mission: 3, type: "single",
    body: "Do you have any dashboard or visual summary that leadership actually looks at?",
    options: [
      { key: "a", label: "No", tags: { dims: { d3: 0 }, bottlenecks: { visibility_gap: 2 } } },
      { key: "b", label: "We make charts manually for reports", tags: { dims: { d3: 1 } } },
      { key: "c", label: "A basic dashboard exists, rarely updated", tags: { dims: { d3: 2 } } },
      { key: "d", label: "A live dashboard people actually use", tags: { dims: { d3: 3 } } },
    ],
  },
  {
    id: "q17", mission: 3, type: "single",
    body: "How consistent are your document templates for reports, concept notes, and activity forms?",
    options: [
      { key: "a", label: "Everyone formats their own", tags: { dims: { d3: 0 } } },
      { key: "b", label: "Some templates, loosely used", tags: { dims: { d3: 1 } } },
      { key: "c", label: "Standard templates for key documents", tags: { dims: { d3: 2 } } },
      { key: "d", label: "Standard templates, and someone maintains them", tags: { dims: { d3: 3 } } },
    ],
  },

  /* ── Mission 4: People & Change ──────────────────────────────── */
  {
    id: "q18", mission: 4, type: "single",
    body: "How would staff honestly describe their comfort with digital tools?",
    options: [
      { key: "a", label: "Many struggle with the basics", tags: { dims: { d4: 0 } } },
      { key: "b", label: "Comfortable with WhatsApp and Excel, little beyond", tags: { dims: { d4: 1 } } },
      { key: "c", label: "Comfortable with cloud tools, but uneven", tags: { dims: { d4: 2 } } },
      { key: "d", label: "Confident, and some experiment on their own", tags: { dims: { d4: 3 } } },
    ],
  },
  {
    id: "q19", mission: 4, type: "single",
    body: "Is anyone on your team already using AI tools like ChatGPT, Gemini, or Copilot for work?",
    options: [
      { key: "a", label: "No, not that we know of", tags: { dims: { d4: 1 } } },
      { key: "b", label: "One or two people, quietly", tags: { dims: { d4: 2 }, riskFlags: ["shadow_ai_candidate"] } },
      { key: "c", label: "Several people, informally", tags: { dims: { d4: 2 }, riskFlags: ["shadow_ai_candidate"] } },
      { key: "d", label: "Yes, and we have discussed how to use them well", tags: { dims: { d4: 3 } } },
    ],
  },
  {
    id: "q20", mission: 4, type: "single",
    body: "When you introduced your last new tool or process, what happened?",
    options: [
      { key: "a", label: "It did not stick", tags: { dims: { d4: 0 } } },
      { key: "b", label: "A few adopted it, most reverted", tags: { dims: { d4: 1 } } },
      { key: "c", label: "Adopted after a bumpy start", tags: { dims: { d4: 2 } } },
      { key: "d", label: "Adopted smoothly with training and follow-up", tags: { dims: { d4: 3 } } },
    ],
  },
  {
    id: "q21", mission: 4, type: "single",
    body: "If Tek4All handed you a working improvement tomorrow, who would own making it stick?",
    options: [
      { key: "a", label: "Nobody, realistically", tags: { dims: { d4: 0 } } },
      { key: "b", label: "The ED, who is already overloaded", tags: { dims: { d4: 1 } } },
      { key: "c", label: "A named staff member could", tags: { dims: { d4: 2 } } },
      { key: "d", label: "We have a person and the time for this", tags: { dims: { d4: 3 } } },
    ],
  },

  /* ── Mission 5: Risk & Responsibility ────────────────────────── */
  {
    id: "q22", mission: 5, type: "single",
    body: "Who can access your most sensitive files, like beneficiary lists, finance, and HR?",
    options: [
      { key: "a", label: "Anyone with the shared drive link, or they sit on personal laptops", tags: { dims: { d5: 0 }, riskFlags: ["access_control"] } },
      { key: "b", label: "Everyone on staff", tags: { dims: { d5: 1 } } },
      { key: "c", label: "Restricted by folder, loosely enforced", tags: { dims: { d5: 2 } } },
      { key: "d", label: "Role-based access, reviewed", tags: { dims: { d5: 3 } } },
    ],
  },
  {
    id: "q23", mission: 5, type: "single",
    body: "Do staff use personal devices or personal email for official work?",
    options: [
      { key: "a", label: "Constantly, including for sensitive data", tags: { dims: { d5: 0 }, riskFlags: ["personal_devices"] } },
      { key: "b", label: "Often", tags: { dims: { d5: 1 } } },
      { key: "c", label: "Sometimes, but not for sensitive data", tags: { dims: { d5: 2 } } },
      { key: "d", label: "Rarely; work accounts are standard", tags: { dims: { d5: 3 } } },
    ],
  },
  {
    id: "q24", mission: 5, type: "single",
    body: "Does your organisation have any written guidance on what can and cannot be put into AI tools?",
    options: [
      { key: "a", label: "No, and staff paste freely", tags: { dims: { d5: 0 }, riskFlags: ["shadow_ai"] } },
      { key: "b", label: "No guidance, but caution is informal", tags: { dims: { d5: 1 } } },
      { key: "c", label: "Verbal guidance from leadership", tags: { dims: { d5: 2 } } },
      { key: "d", label: "Written guidance exists", tags: { dims: { d5: 3 } } },
    ],
  },
  {
    id: "q25", mission: 5, type: "single",
    body: "Have you heard of the NDPA, the Nigeria Data Protection Act, and does it shape anything you do?",
    options: [
      { key: "a", label: "Never heard of it", tags: { dims: { d5: 0 } } },
      { key: "b", label: "Heard of it, no action", tags: { dims: { d5: 1 } } },
      { key: "c", label: "Aware; some practices reflect it", tags: { dims: { d5: 2 } } },
      { key: "d", label: "Yes; we have a policy or a focal person", tags: { dims: { d5: 3 } } },
    ],
  },
  {
    id: "q26", mission: 5, type: "single",
    body: "If a laptop with programme data was stolen tonight, what would happen?",
    options: [
      { key: "a", label: "That data is only on that laptop", tags: { dims: { d5: 0 }, riskFlags: ["backup"] } },
      { key: "b", label: "Some of it is backed up somewhere", tags: { dims: { d5: 1 } } },
      { key: "c", label: "Cloud copies exist; the device is unprotected", tags: { dims: { d5: 2 } } },
      { key: "d", label: "Backed up and protected; we could act quickly", tags: { dims: { d5: 3 } } },
    ],
  },
  {
    id: "q26a", mission: 5, type: "single",
    requiresSectorsAnyOf: ["health", "child_protection", "gbv", "idps_refugees", "disability"],
    body: "How is consent handled when collecting beneficiary information?",
    options: [
      { key: "a", label: "No formal process", tags: { dims: { d5: 0 }, riskFlags: ["safeguarding"] } },
      { key: "b", label: "Verbal, undocumented", tags: { dims: { d5: 1 } } },
      { key: "c", label: "Written forms, inconsistently stored", tags: { dims: { d5: 2 } } },
      { key: "d", label: "Written, stored, and staff are trained", tags: { dims: { d5: 3 } } },
    ],
  },
  {
    id: "q26b", mission: 5, type: "single",
    requiresSectorsAnyOf: ["health", "child_protection", "gbv", "idps_refugees", "disability"],
    body: "Where do records about children or vulnerable individuals live?",
    options: [
      { key: "a", label: "Phones or personal files", tags: { dims: { d5: 0 }, riskFlags: ["safeguarding"] } },
      { key: "b", label: "General shared folders", tags: { dims: { d5: 1 } } },
      { key: "c", label: "Restricted folders", tags: { dims: { d5: 2 } } },
      { key: "d", label: "Restricted, minimised, with retention rules", tags: { dims: { d5: 3 } } },
    ],
  },
  {
    id: "q26c", mission: 5, type: "single",
    requiresSectorsAnyOf: ["health", "child_protection", "gbv", "idps_refugees", "disability"],
    body: "Has any staff member ever put beneficiary details into a public AI tool, as far as you know?",
    options: [
      { key: "a", label: "Yes, or probably", tags: { dims: { d5: 0 }, riskFlags: ["safeguarding"] } },
      { key: "b", label: "Unsure", tags: { dims: { d5: 1 } } },
      { key: "c", label: "Unlikely", tags: { dims: { d5: 2 } } },
      { key: "d", label: "No; it is explicitly prohibited", tags: { dims: { d5: 3 } } },
    ],
  },

  /* ── Mission 6: Opportunity Fit ──────────────────────────────── */
  {
    id: "q27", mission: 6, type: "single",
    body: "If one thing could be fixed in 30 days, which would help most?",
    options: [
      { key: "reporting", label: "Donor reporting", tags: { meta: { stated_priority: "reporting" } } },
      { key: "evidence", label: "Finding evidence", tags: { meta: { stated_priority: "evidence" } } },
      { key: "dashboards", label: "Data and dashboards", tags: { meta: { stated_priority: "dashboards" } } },
      { key: "admin", label: "Repetitive admin", tags: { meta: { stated_priority: "admin" } } },
      { key: "proposals", label: "Proposals", tags: { meta: { stated_priority: "proposals" } } },
      { key: "field", label: "Field data collection", tags: { meta: { stated_priority: "field" } } },
      { key: "files", label: "File chaos", tags: { meta: { stated_priority: "files" } } },
      { key: "protection", label: "Protecting sensitive data", tags: { meta: { stated_priority: "protection" } } },
    ],
  },
  {
    id: "q28", mission: 6, type: "single",
    body: "Which is closer to your appetite right now?",
    options: [
      { key: "cautious", label: "We need basics fixed before anything called AI", tags: { meta: { adoption: "cautious" } } },
      { key: "pilot", label: "A small, safe pilot in one team", tags: { meta: { adoption: "pilot" } } },
      { key: "committed", label: "Ready to change how a whole workflow runs", tags: { meta: { adoption: "committed" } } },
      { key: "ambitious", label: "We want an ambitious transformation push", tags: { meta: { adoption: "ambitious" } } },
    ],
  },
];
