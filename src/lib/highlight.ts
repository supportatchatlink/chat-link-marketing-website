/**
 * A deliberately small syntax highlighter for the spec sheets shown on the site.
 *
 * These are static, authored config-style blocks used as a visual element, not
 * an editor — a full grammar (Shiki/Prism) would be a lot of bytes for no gain.
 *
 * Safety: the source is HTML-escaped *before* tokenizing, so every character
 * reaching the output is already inert. Tokenizing then happens in a single
 * pass, so matches can't nest or corrupt one another.
 */

const CLASS = {
  comment: "text-ink-500 italic",
  section: "text-brand-300 font-semibold",
  key: "text-sky-300",
  value: "text-ink-200",
  num: "text-amber-300",
} as const;

/** Escape only the characters that can break out of element content. */
function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Single combined pattern, run over already-escaped text.
 *
 * Order matters: comments are matched first so a `;` line is never re-read as a
 * key/value pair.
 */
const TOKEN = new RegExp(
  [
    // `; comment` or `# comment` to end of line
    `(?<comment>^[ \\t]*[;#][^\\n]*)`,
    // `[section]` header
    `(?<section>^[ \\t]*\\[[^\\]\\n]+\\])`,
    // `key = value` — captured separately so each half can be coloured
    `(?<key>^[ \\t]*[A-Za-z0-9_]+)(?<eq>[ \\t]*=[ \\t]*)(?<value>[^\\n]*)`,
  ].join("|"),
  "gm",
);

/** Colour bare numbers inside an already-escaped value string. */
function highlightValue(value: string) {
  return value.replace(/\b\d+(?:\.\d+)?\b/g, (n) => `<span class="${CLASS.num}">${n}</span>`);
}

/**
 * Returns HTML-safe markup with `<span>` wrappers around tokens.
 * Suitable for `dangerouslySetInnerHTML` given the escaping above.
 */
export function highlight(code: string, _language: string): string {
  // Escape FIRST. Everything below operates on inert text, including the
  // characters the tokenizer never matches (punctuation, whitespace, `&`, `<`).
  const escaped = escapeHtml(code);

  return escaped.replace(TOKEN, (match, ...args) => {
    const groups = args[args.length - 1] as Record<string, string | undefined>;

    if (groups.comment) {
      return `<span class="${CLASS.comment}">${match}</span>`;
    }
    if (groups.section) {
      return `<span class="${CLASS.section}">${match}</span>`;
    }
    if (groups.key !== undefined && groups.value !== undefined) {
      return (
        `<span class="${CLASS.key}">${groups.key}</span>` +
        groups.eq +
        `<span class="${CLASS.value}">${highlightValue(groups.value)}</span>`
      );
    }

    return match;
  });
}
