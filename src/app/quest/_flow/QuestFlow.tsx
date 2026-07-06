"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { SavedQuestState } from "../_data/types";
import { QUEST_STORAGE_KEY } from "../_data/types";
import { MISSIONS, QUESTIONS } from "../_data/questions";
import { IdentityCards } from "./IdentityCards";
import { MissionScreen } from "./MissionScreen";
import { ProgressTrail } from "./ProgressTrail";
import { ReportPanel } from "./ReportPanel";

/*
 * Client state machine: identity -> questions (branch-aware) -> done.
 * Autosaves to localStorage; restores on mount. No network in this slice.
 */

const EMPTY: SavedQuestState = {
  v: 1,
  identity: null,
  answers: {},
  cursor: 0,
  screen: "identity",
  updatedAt: "",
};

function loadSaved(): SavedQuestState | null {
  try {
    const raw = window.localStorage.getItem(QUEST_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedQuestState;
    if (parsed && parsed.v === 1) return parsed;
    return null;
  } catch (err) {
    console.warn("[quest] failed to restore saved state", err);
    return null;
  }
}

export function QuestFlow() {
  const [state, setState] = useState<SavedQuestState>(EMPTY);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadSaved();
    if (saved) setState(saved);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        QUEST_STORAGE_KEY,
        JSON.stringify({ ...state, updatedAt: new Date().toISOString() })
      );
    } catch (err) {
      console.warn("[quest] autosave failed", err);
    }
  }, [state, hydrated]);

  const activeQuestions = useMemo(() => {
    const sectors = state.answers["q3"] ?? [];
    return QUESTIONS.filter((q) => {
      if (!q.requiresSectorsAnyOf) return true;
      return q.requiresSectorsAnyOf.some((s) => sectors.includes(s));
    });
  }, [state.answers]);

  const cursor = Math.min(state.cursor, Math.max(activeQuestions.length - 1, 0));
  const current = activeQuestions[cursor];
  const answeredCount = activeQuestions.filter(
    (q) => (state.answers[q.id] ?? []).length > 0
  ).length;
  const percent =
    state.screen === "done"
      ? 100
      : Math.round((answeredCount / activeQuestions.length) * 100);

  const pickIdentity = useCallback((key: string) => {
    setState((s) => ({ ...s, identity: key, screen: "questions", cursor: 0 }));
  }, []);

  const toggleOption = useCallback(
    (optionKey: string) => {
      if (!current) return;
      setState((s) => {
        const prev = s.answers[current.id] ?? [];
        let next: string[];
        if (current.type === "single") {
          next = [optionKey];
        } else if (prev.includes(optionKey)) {
          next = prev.filter((k) => k !== optionKey);
        } else if (current.maxSelect !== undefined && prev.length >= current.maxSelect) {
          next = prev;
        } else {
          next = [...prev, optionKey];
        }
        return { ...s, answers: { ...s.answers, [current.id]: next } };
      });
    },
    [current]
  );

  const goNext = useCallback(() => {
    setState((s) => {
      if (cursor >= activeQuestions.length - 1) {
        return { ...s, screen: "done" };
      }
      return { ...s, cursor: cursor + 1 };
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [cursor, activeQuestions.length]);

  const goBack = useCallback(() => {
    setState((s) => {
      if (cursor === 0) return { ...s, screen: "identity" };
      return { ...s, cursor: cursor - 1 };
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [cursor]);

  const startOver = useCallback(() => {
    try {
      window.localStorage.removeItem(QUEST_STORAGE_KEY);
    } catch (err) {
      console.warn("[quest] failed to clear saved state", err);
    }
    setState(EMPTY);
  }, []);

  if (!hydrated) {
    return (
      <div className="qf" aria-busy="true">
        <div className="qf-skel" style={{ height: 4, width: "100%" }} />
        <div className="qf-skel" style={{ height: 34, width: "62%", marginTop: 42 }} />
        <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 11 }}>
          <div className="qf-skel" style={{ height: 56 }} />
          <div className="qf-skel" style={{ height: 56 }} />
          <div className="qf-skel" style={{ height: 56 }} />
          <div className="qf-skel" style={{ height: 56 }} />
        </div>
      </div>
    );
  }

  const panelMission = state.screen === "done" ? 7 : current ? current.mission : 1;

  return (
    <div className={"qf" + (state.screen !== "identity" ? " has-panel" : "")}>
      {state.screen !== "identity" && (
        <ProgressTrail
          currentMission={state.screen === "done" ? 7 : current ? current.mission : 1}
          percent={percent}
        />
      )}

      <div className="qf-cols">
        <div className="qf-main">
          {state.screen === "identity" && <IdentityCards onPick={pickIdentity} />}

          {state.screen === "questions" && current && (
            <MissionScreen
              question={current}
              index={cursor}
              total={activeQuestions.length}
              selected={state.answers[current.id] ?? []}
              onToggle={toggleOption}
              onBack={goBack}
              onNext={goNext}
              canGoBack={true}
              isLast={cursor === activeQuestions.length - 1}
            />
          )}

          {state.screen === "done" && (
            <div className="qf-done qf-rise">
              <div className="qf-seal">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="m5 13 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h1 className="qf-title" style={{ marginTop: 22 }}>Quest complete.</h1>
              <p className="qf-sub">
                You answered {answeredCount} questions across six missions. Your
                readiness report engine attaches here in the next build: level,
                radar, and your smartest first move.
              </p>

              <div className="qf-badges">
                {MISSIONS.map((m, i) => (
                  <span
                    key={m.n}
                    className="qf-badge qf-rise"
                    style={{ animationDelay: (0.1 + 0.07 * i).toFixed(2) + "s" }}
                  >
                    {m.badge}
                  </span>
                ))}
              </div>

              <div className="qf-actions">
                <Link href="/quest" className="qf-back">Back to overview</Link>
                <button type="button" className="qf-back" onClick={startOver}>Start over</button>
              </div>
            </div>
          )}

          {state.screen === "questions" && (
            <button type="button" className="qf-restart" onClick={startOver}>
              Start over
            </button>
          )}
        </div>

        {state.screen !== "identity" && (
          <ReportPanel currentMission={panelMission} percent={percent} />
        )}
      </div>
    </div>
  );
}
