"use client";

import { MotionConfig } from "framer-motion";

/**
 * Global motion policy.
 *
 * `reducedMotion="user"` makes Framer respect the OS "reduce motion" setting:
 * transform and layout animations are skipped (values snap straight to their
 * target), while opacity still animates. That matters — see `Reveal`, which
 * relies on the opacity tween to become visible.
 *
 * Deliberately NOT done by branching on `useReducedMotion()` at render time:
 * that hook returns `false` during SSR and `true` on a reduced-motion client,
 * so the two renders disagree and React leaves the server's `opacity: 0` in
 * place — permanently hiding the content for exactly the users we were trying
 * to accommodate.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
