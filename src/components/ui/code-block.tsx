"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { highlight } from "@/lib/highlight";
import { cn } from "@/lib/utils";

export type CodeTab = {
  filename: string;
  language: string;
  code: string;
};

type CodeBlockProps = {
  tabs: CodeTab[];
  className?: string;
  /** Shows the macOS-style window dots above the tab strip. */
  chrome?: boolean;
};

export function CodeBlock({ tabs, className, chrome = true }: CodeBlockProps) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const current = tabs[active];

  async function copy() {
    try {
      await navigator.clipboard.writeText(current.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API needs a secure context and permission; if it's denied
      // there's nothing useful to show, so leave the button in its idle state.
    }
  }

  return (
    <div
      className={cn(
        "bg-code-bg border-code-border overflow-hidden rounded-xl border shadow-xl",
        className,
      )}
    >
      {/* Header: window chrome + tabs + copy */}
      <div className="border-code-border flex items-center gap-3 border-b px-4 py-2.5">
        {chrome ? (
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
        ) : null}

        {tabs.length > 1 ? (
          <div role="tablist" aria-label="Code examples" className="flex flex-wrap gap-1">
            {tabs.map((tab, index) => (
              <button
                key={tab.filename}
                role="tab"
                type="button"
                id={`code-tab-${tab.filename}`}
                aria-selected={index === active}
                aria-controls={`code-panel-${tab.filename}`}
                onClick={() => setActive(index)}
                className={cn(
                  "rounded-md px-2.5 py-1 font-mono text-xs transition-colors",
                  index === active
                    ? "bg-white/10 text-white"
                    : "text-ink-400 hover:text-ink-200 hover:bg-white/5",
                )}
              >
                {tab.filename}
              </button>
            ))}
          </div>
        ) : (
          <span className="text-ink-400 font-mono text-xs">{current.filename}</span>
        )}

        <button
          type="button"
          onClick={copy}
          className="text-ink-400 ml-auto inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs transition-colors hover:bg-white/5 hover:text-white"
        >
          {copied ? (
            <>
              <Check className="size-3.5" aria-hidden="true" />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-3.5" aria-hidden="true" />
              Copy
            </>
          )}
          <span className="sr-only">
            {copied ? "Code copied to clipboard" : `Copy ${current.filename} code to clipboard`}
          </span>
        </button>
      </div>

      {/* Code */}
      <div
        role={tabs.length > 1 ? "tabpanel" : undefined}
        id={tabs.length > 1 ? `code-panel-${current.filename}` : undefined}
        aria-labelledby={tabs.length > 1 ? `code-tab-${current.filename}` : undefined}
        className="overflow-x-auto p-5"
      >
        <pre className="text-code-fg font-mono text-[13px] leading-relaxed">
          <code
            // Safe: `highlight` HTML-escapes the source before adding markup,
            // and the source itself is static content from `lib/content.ts`.
            dangerouslySetInnerHTML={{ __html: highlight(current.code, current.language) }}
          />
        </pre>
      </div>
    </div>
  );
}
