"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Conditionally renders the marketing chrome (Navbar/Footer).
 * The Quest surface (/quest/*) is a standalone product shell and opts out.
 *
 * Navbar/Footer are passed in as already-rendered nodes (slot pattern) so this
 * client boundary never imports server components directly — it works whether
 * Navbar/Footer are server or client components.
 */
export function SiteChrome({
  navbar,
  footer,
  children,
}: {
  navbar: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isQuest = pathname?.startsWith("/quest") ?? false;

  if (isQuest) {
    return <>{children}</>;
  }

  return (
    <>
      {navbar}
      <main className="flex-1">{children}</main>
      {footer}
    </>
  );
}
