"use client";

import { motion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger helper: delay in seconds. */
  delay?: number;
  /** Distance travelled on entry, in px. */
  distance?: number;
};

/**
 * Fades + lifts its children into view once, when scrolled to.
 *
 * Reduced motion is handled globally by `MotionProvider` (MotionConfig
 * `reducedMotion="user"`), NOT by branching here: a render-time branch on
 * `useReducedMotion()` disagrees with SSR and leaves the element stuck at
 * `opacity: 0`. Under reduced motion the translate is skipped and only the
 * fade runs, so the content still reveals.
 */
export function Reveal({ children, className, delay = 0, distance = 16 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
