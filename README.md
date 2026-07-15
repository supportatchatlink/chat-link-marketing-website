# Chat-Link — marketing site

Marketing website for **Chat-Link Communication Limited** (chat-link.net), a
wholesale telecom carrier providing A-Z voice termination and A2P SMS.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion, and
lucide-react.

> [!IMPORTANT]
> Most copy is real (supplied by the client). A few things are inferred or
> missing — search for `TODO: confirm` before publishing. The big one: the
> **interconnect spec sheets** (SIP/SMPP parameters shown on the home and
> Services pages) are plausible industry defaults, **not** Chat-Link's live
> values — verify them with your NOC. See [Content & TODOs](#content--todos).

---

## Requirements

- **Node.js 20.9+** (Next.js 16 minimum; developed on Node 24)
- npm

## Getting started

```bash
npm install

# Create your local env file from the template
cp .env.example .env.local     # Windows: copy .env.example .env.local

npm run dev
```

The site runs at **http://localhost:3000**.

## Scripts

| Script                 | What it does                                   |
| ---------------------- | ---------------------------------------------- |
| `npm run dev`          | Start the dev server (Turbopack) on port 3000  |
| `npm run build`        | Production build                               |
| `npm start`            | Serve the production build (run `build` first) |
| `npm run lint`         | ESLint                                         |
| `npm run lint:fix`     | ESLint with autofix                            |
| `npm run format`       | Prettier — write                               |
| `npm run format:check` | Prettier — check only                          |
| `npm run typecheck`    | `tsc --noEmit`                                 |

> Next.js 16 removed the `next lint` command, so `lint` calls the ESLint CLI
> directly, and `next build` no longer lints. `next build` runs its own
> TypeScript check internally — note that running `tsc --noEmit` standalone can
> conflict with the build's generated `.next/types`, so prefer `npm run build`
> as the authoritative typecheck and delete `.next` first if `typecheck`
> reports errors about `.next/**` files.

## Pages

| Route               | Content                                                          |
| ------------------- | --------------------------------------------------------------- |
| `/`                 | Hero, why-choose-us, about summary, services, coverage, partners |
| `/about`   | Company story, mission/vision, trust points, coverage, offices |
| `/services`| Wholesale Voice Termination, SMS Services, Tailored Solutions   |
| `/blog`    | Empty state — no posts supplied yet (see TODO in the page)      |
| `/contact` | Contact form (front-end only) + offices and direct contact     |

## Project structure

```
src/
├── app/                    # App Router: one folder per route
│   ├── layout.tsx          # Root layout — metadata, fonts, theme script, chrome
│   ├── page.tsx            # Home
│   ├── about/              # About us
│   ├── services/           # Voice, SMS, tailored solutions
│   ├── blog/               # Blog (empty state)
│   ├── contact/            # Contact form (front-end only — see below)
│   ├── not-found.tsx       # 404
│   ├── icon.tsx            # Favicon, generated at build time
│   ├── opengraph-image.tsx # Social share card, generated at build time
│   ├── sitemap.ts          # /sitemap.xml
│   └── robots.ts           # /robots.txt
├── components/
│   ├── ui/                 # Design system: Button, Card, Section, CodeBlock, …
│   ├── layout/             # Navbar, Footer, Logo, ThemeToggle
│   └── sections/           # Hero, Cta, Coverage, Partners, ContactForm
├── lib/
│   ├── site.ts             # Site identity, nav, contact details, offices, SEO
│   ├── content.ts          # ALL site copy and data
│   ├── highlight.ts        # Small highlighter for the interconnect spec sheets
│   └── utils.ts            # `cn()` class-merge helper
└── styles/
    └── globals.css         # Design tokens + Tailwind theme + base layer
```

## Design system

Tailwind v4 is configured **in CSS**, not `tailwind.config.js`. Everything lives
in `src/styles/globals.css`:

- **Primitive tokens** (`@theme`): the `brand` (teal) and `ink` (neutral) color
  ramps, font families, display type scale, easing.
- **Semantic tokens**: `--bg`, `--surface`, `--border`, `--fg`, `--fg-muted`,
  `--accent`, … defined once for light and re-defined under `.dark`.
- These are exposed as utilities via `@theme inline`, so components use
  `bg-surface`, `text-fg-muted`, `border-border`, `bg-accent` and automatically
  work in both themes. **Prefer semantic utilities over raw colors** — that's
  what keeps dark mode correct for free.

### Dark mode

Class-based (`.dark` on `<html>`), not `prefers-color-scheme`, so the navbar
toggle can override the OS setting. It defaults to the system preference and
persists the user's choice in `localStorage`. A small blocking script in
`<head>` (`themeScript` in `theme-toggle.tsx`) applies the class before first
paint to avoid a flash of the wrong theme.

### Motion

`MotionProvider` sets Framer's `reducedMotion="user"` globally, so animations
respect the OS "reduce motion" setting.

Two rules worth preserving — both were real bugs during the build:

1. **Never branch on `useReducedMotion()` at render time.** It returns `false`
   during SSR and `true` on a reduced-motion client, so the two renders disagree,
   React refuses to patch the mismatch, and the server's `opacity: 0` sticks —
   permanently hiding content from exactly the users you meant to help.
2. **Never gate navigation or content visibility on an animation completing.**
   The mobile menu is plain conditional rendering for this reason.

## Content & TODOs

`src/lib/content.ts` holds essentially all site copy, so wording can be revised
without touching components. Real client-supplied facts (founding year, offices,
coverage, partners, mission/vision, founder's message, contact details) are
there verbatim.

Anything inferred or missing is marked `TODO`. To find them all:

```bash
grep -rn "TODO" src/
```

Needs attention before launch:

- **Interconnect spec sheets** — the SIP/SMPP parameters in `services[].spec`
  are industry-standard defaults, **not** Chat-Link's live values. Verify with
  your NOC. (This is the most important one.)
- **Partner logos** — real logos are in `/public/partners`, pulled from the
  existing chat-link.net site. Confirm each partner is OK being named on the new
  site, and swap for higher-res / SVG versions if you have them (`partners`).
- **Social links** — Instagram / Facebook / LinkedIn URLs are placeholders
  (`siteConfig.social`).
- **Blog** — no posts supplied; the page shows an empty state. Wire `blogPosts`
  to a CMS/MDX, or remove the Blog nav entry until there's content.
- **Privacy Policy** — `/privacy` is linked in the footer but doesn't exist yet.

## Contact form

The form (Name / Email / Phone / Message) is **front-end only**. On submit it
validates, `console.log`s the payload, and shows a success state — **nothing is
sent anywhere**.

To wire it up, see the `TODO` block in
`src/components/sections/contact-form.tsx`. You'll want a route handler that
validates server-side, adds spam protection and rate limiting, and forwards to
`interconnection@chat-link.net` or your CRM. Placeholder env vars are already
reserved in `.env.example`.

## Environment variables

Copy `.env.example` → `.env.local`. Never commit real values; `.env.local` is
gitignored (`.env.example` is deliberately un-ignored so it stays in the repo).

| Variable               | Purpose                                                 |
| ---------------------- | ------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, OG tags, sitemap, robots |

Set `NEXT_PUBLIC_SITE_URL` to `https://chat-link.net` in production — otherwise
canonical and Open Graph URLs point at localhost.

## SEO

- Per-page `metadata` via the Metadata API, with a title template and canonicals.
- Open Graph + Twitter card tags; the share image is generated at build time
  (`opengraph-image.tsx`) so there's no binary asset to keep in sync.
- `sitemap.xml` and `robots.txt` are generated from `src/lib/site.ts`.
- Add new routes to the `routes` array in `src/app/sitemap.ts`.

## Accessibility

Semantic landmarks, a skip-to-content link, labelled form fields with
`aria-invalid` / `aria-describedby` error wiring, `aria-current` on the active
nav item, visible focus rings, and reduced-motion support.

## Deployment

Not deployed yet. When ready, this is a standard Next.js app: push to GitHub and
import into Vercel. Remember to set `NEXT_PUBLIC_SITE_URL` to the production
origin in the Vercel project's environment variables.
