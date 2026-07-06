import Link from "next/link";
import type { Metadata } from "next";
import { QuestFlow } from "../_flow/QuestFlow";
import "../_flow/flow.css";

export const metadata: Metadata = {
  title: "Take the Assessment",
  robots: { index: false },
};

export default function QuestStartPage() {
  return (
    <>
      <div className="q-clouds" aria-hidden="true" />

      <header className="q-top">
        <div className="qwrap">
          <Link href="/quest" className="q-brand" style={{ textDecoration: "none", color: "inherit" }}>
            <span className="q-mark">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4Z" />
                <path d="m9 12 2 2 4-4.5" />
              </svg>
            </span>
            <b>AI Readiness Quest</b>
          </Link>
          <span className="q-by qf-save">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Autosaves on this device
          </span>
        </div>
      </header>

      <main className="q-main">
        <QuestFlow />
      </main>
    </>
  );
}
