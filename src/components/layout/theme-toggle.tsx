"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "chat-link-theme";

/**
 * Runs before first paint to apply the stored (or system) theme, so the page
 * never flashes light before switching to dark. Kept as a raw string because it
 * has to execute synchronously in <head>, ahead of React hydrating.
 *
 * The storage key is inlined here on purpose: this string is injected as-is and
 * can't close over STORAGE_KEY. Keep the two in sync.
 */
export const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('chat-link-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {
    /* localStorage throws in some privacy modes — fall back to light. */
  }
})();
`;

/**
 * The <html> class is the source of truth (the pre-paint script above sets it
 * before React exists), so the theme lives *outside* React. Subscribe to it as
 * an external store rather than mirroring it into state — that keeps the two
 * from drifting and avoids a setState-in-effect.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

/** The server can't know the user's theme; assume light and correct on hydration. */
function getServerSnapshot() {
  return false;
}

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // Non-fatal: the theme still applies for this page view.
    }
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="text-fg-muted hover:text-fg hover:bg-bg-subtle inline-flex size-9 items-center justify-center rounded-lg transition-colors"
    >
      {/* Both icons are always in the DOM; CSS picks which one shows. That way
          the correct icon paints immediately, with no post-hydration swap. */}
      <Sun className="size-[1.125rem] dark:hidden" aria-hidden="true" />
      <Moon className="hidden size-[1.125rem] dark:block" aria-hidden="true" />
    </button>
  );
}
