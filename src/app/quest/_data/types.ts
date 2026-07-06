/*
 * Quest data contracts. The scoring engine (next slice) consumes ScoreTags;
 * the UI consumes the rest. Keep this file dependency-free.
 */

export type DimensionKey = "d1" | "d2" | "d3" | "d4" | "d5" | "d6";

export interface ScoreTags {
  /** Points contributed to a dimension (0-3 per blueprint). */
  dims?: Partial<Record<DimensionKey, number>>;
  /** Bottleneck tag accumulation, e.g. { evidence_fragmentation: 3 }. */
  bottlenecks?: Record<string, number>;
  /** Governance/risk flags raised by this option. */
  riskFlags?: string[];
  /** Non-scoring metadata (segment, tool stack, adoption appetite). */
  meta?: Record<string, string>;
}

export interface AnswerOption {
  key: string;
  label: string;
  tags?: ScoreTags;
}

export interface QuestQuestion {
  id: string;
  mission: number; // 1..6
  type: "single" | "multi";
  /** For multi questions: max selectable (undefined = unlimited). */
  maxSelect?: number;
  body: string;
  hint?: string;
  options: AnswerOption[];
  /** Conditional: only shown when the Q3 sector answer intersects this set. */
  requiresSectorsAnyOf?: string[];
}

export interface IdentityCardDef {
  key: string;
  title: string;
  quote: string;
}

export interface MissionDef {
  n: number;
  title: string;
  payoff: string;
  badge: string;
}

/** Persisted flow state (localStorage). Bump v on breaking shape changes. */
export interface SavedQuestState {
  v: 1;
  identity: string | null;
  answers: Record<string, string[]>;
  cursor: number;
  screen: "identity" | "questions" | "done";
  updatedAt: string;
}

export const QUEST_STORAGE_KEY = "tek4all-quest-v1";

/** Q3 sector keys that trigger the safeguarding branch (Q26a-c). */
export const SAFEGUARDING_SECTORS = [
  "health",
  "child_protection",
  "gbv",
  "idps_refugees",
  "disability",
] as const;
