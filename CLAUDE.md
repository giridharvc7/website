# Giridhar's Personal Website

## Quick Reference
- **Framework:** Astro 5 (static site generator)
- **Styling:** Plain CSS (`src/styles/global.css`), no framework
- **Hosting:** GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)
- **Commands:** `npm run dev` (localhost:4321), `npm run build`, `npm run preview`

## Site Sections
| Route | Source | Notes |
|---|---|---|
| `/` | `src/pages/index.astro` | Reads from `src/content/home/index.md` — markdown body + YAML frontmatter for meta/nav |
| `/work` | `src/pages/work.astro` | Reads from `src/content/work/index.md` (YAML frontmatter) |
| `/projects` | `src/pages/projects.astro` | Reads from `src/data/projects.json` |
| `/writing` | `src/pages/writing/index.astro` | Lists all posts from `src/content/writing/*.md` |
| `/writing/[slug]` | `src/pages/writing/[slug].astro` | Individual post page |
| `/rss.xml` | `src/pages/rss.xml.ts` | RSS feed for all writing posts |

## Content (edit these to update the site)
- **Homepage:** `src/content/home/index.md` — markdown body is the bio (supports full markdown: links, bold, images). Frontmatter has `headline`, `nav[]`, and `meta` (name, title, employer, social links for JSON-LD).
- **Work timeline & proof-of-work:** `src/content/work/index.md` — YAML frontmatter with `roles[]` and `proofOfWork[]` arrays. Proof-of-work items have optional `type` (talk/blog/press/launch/impact/open-source) and `link`.
- **Writing posts:** `src/content/writing/*.md` — frontmatter: `title`, `date`, `description`, `category` (product/experience/travel, defaults to experience)
- **Projects:** `src/data/projects.json` — array of `{name, description, status, link?, tags[]}`
- **Resume PDF:** `public/resume/Giridhar-Resume.pdf`

## Design System
- **Light mode:** warm ivory (`#f5f0e8` bg), earthy brown text
- **Dark mode:** warm charcoal (`#1c1917` bg), cream text
- Theme toggle in nav, persisted to localStorage, no flash on load
- Transition: `color` and `background-color` on `html` only (0.3s ease) — do NOT add `transition` to `*` selector (causes font rendering jitter)
- **Accent color:** Apple HIG Indigo (`#5856D6` light, `#5E5CE6` dark). Applied to: nav name, h1, h2, timeline border. NOT on links.
- Full Apple HIG color palette stored in `src/data/colors.json` for easy swapping. To change accent: update `--color-accent` in light, dark, and media query blocks in `global.css`.
- Content width: 680px, font: Inter (body), JetBrains Mono (code)
- No borders on nav or footer

## Components
- `Nav.astro` — horizontal nav + theme toggle (inline JS)
- `Footer.astro` — centered social links (Twitter, GitHub, LinkedIn, Email, RSS) + subtle copyright
- `WorkTimeline.astro` — left-bordered timeline, props: `roles[]`
- `ProofOfWork.astro` — list with type badges and optional links, props: `items[]`
- `ProjectCard.astro` — card with status badge and tags, props: `{name, description, status, link?, tags[]}`
- `Layout.astro` — base HTML shell with meta, OG tags, fonts, theme init script

## LLM/SEO
- `public/llms.txt` — plain-text professional summary
- `public/robots.txt` — allows all crawlers
- JSON-LD `Person` schema on homepage (includes `sameAs` social links)
- RSS feed at `/rss.xml`

## Constraints
- **Must always be deployable to GitHub Pages** — static output only, no SSR, no server-side APIs. Every change must keep `output: 'static'` in `astro.config.mjs`.
- No paid hosting or backend services.

## Architecture Decisions
- Travel was merged into writing (use `category: travel` in frontmatter)
- Photos section removed (can be added later)
- Homepage data lives in JSON (`src/data/home.yaml`) for easy editing
- Work data lives in markdown (`src/content/work/index.md`) not hardcoded in `.astro`
- Projects data lives in JSON (`src/data/projects.json`) for easy editing
