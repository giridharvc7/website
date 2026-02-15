# Giridhar's Personal Website

## Quick Reference
- **Framework:** Astro 5 (static site generator)
- **Styling:** Plain CSS (`src/styles/global.css`), no framework
- **Hosting:** GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)
- **Live URL:** https://giridhar.vc (custom domain via Porkbun → GitHub Pages)
- **Commands:** `npm run dev` (localhost:4321/website), `npm run build`, `npm run preview`

## Site Sections
| Route | Source | Notes |
|---|---|---|
| `/` | `src/pages/index.astro` | Reads from `src/content/home/index.md` — markdown body + YAML frontmatter for meta/nav |
| `/work` | `src/pages/work.astro` | Reads from `src/content/work/index.md` (YAML frontmatter) |
| `/projects` | `src/pages/projects.astro` | Custom projects from `src/data/projects.json`, GitHub repos from `src/data/github-repos.json` |
| `/writing` | `src/pages/writing/index.astro` | Lists all posts from `src/content/writing/*.md` |
| `/writing/[slug]` | `src/pages/writing/[slug].astro` | Individual post page |
| `/rss.xml` | `src/pages/rss.xml.ts` | RSS feed for all writing posts |

## Content (edit these to update the site)
- **Homepage:** `src/content/home/index.md` — markdown body is the bio (supports full markdown: links, bold, images). Frontmatter has `headline`, `nav[]`, and `meta` (name, title, employer, social links for JSON-LD).
- **Work timeline & proof-of-work:** `src/content/work/index.md` — YAML frontmatter with `roles[]` and `proofOfWork[]` arrays. Proof-of-work items have optional `type` (talk/blog/press/launch/impact/open-source) and `link`.
- **Writing posts:** `src/content/writing/*.md` — frontmatter: `title`, `date`, `description`, `category` (product/experience/travel, defaults to experience)
- **Custom projects:** `src/data/projects.json` — array of `{name, description, status, link?, tweet?, tags[]?}`. `tweet` shows an "Author's appreciation →" link.
- **GitHub/open source repos:** `src/data/github-repos.json` — array of `{name, description, language, url}`
- **Resume PDF:** `public/resume/Giridhar-Resume.pdf` — replace file to update, keep same filename

## Images
- **Folder structure:** `public/images/blog/`, `public/images/projects/`, `public/images/home/`
- **In markdown:** use `/images/blog/image.jpg` — the base path is auto-prepended by the remark plugin
- **Full-width (default):** `![Alt text](/images/blog/image.jpg)`
- **Custom size (HTML):** `<img src="/images/blog/image.jpg" alt="..." style="width: 50%;" />`
- **Plugin:** `src/plugins/remarkBaseImages.mjs` — handles both markdown `![]()` and inline `<img>` tags. When moving to a custom domain, set `const base = ''` in `astro.config.mjs`.

## Base Path Handling
- `base: '/website'` in `astro.config.mjs` — required for GitHub Pages subdirectory
- All internal links use `import.meta.env.BASE_URL.replace(/\/$/, '')` to build paths
- Markdown image paths are rewritten by `remarkBaseImages` plugin at build time
- **When moving to custom domain:** remove `base: '/website'` from `astro.config.mjs` and set `const base = ''` in the plugin. No content changes needed.

## Design System
- **Light mode:** warm ivory (`#f5f0e8` bg), earthy brown text
- **Dark mode:** warm charcoal (`#1c1917` bg), cream text
- Theme toggle in nav (inline SVG sun/moon icons), persisted to localStorage, no flash on load
- Transition: `color` and `background-color` on `html` only (0.3s ease) — do NOT add `transition` to `*` selector (causes font rendering jitter)
- **Accent color:** Apple HIG Indigo (`#5856D6` light, `#5E5CE6` dark). Applied to: h1, h2, timeline border. NOT on links.
- Full Apple HIG color palette stored in `src/data/colors.json` for easy swapping. To change accent: update `--color-accent` in light, dark, and media query blocks in `global.css`.
- Content width: 680px, font: Inter (body), JetBrains Mono (code)
- No borders on nav or footer

## Components
- `Nav.astro` — right-aligned horizontal nav + theme toggle (inline SVG icons). Uses `BASE_URL` for all links. Has `transition:persist` for View Transitions.
- `Footer.astro` — centered social links (Twitter, GitHub, LinkedIn, Email, RSS) + subtle copyright
- `WorkTimeline.astro` — left-bordered timeline, props: `roles[]`
- `ProofOfWork.astro` — list with type badges and optional links, props: `items[]`
- `ProjectCard.astro` — card with status badge, optional link, optional tweet link, optional tags. Props: `{name, description, status, link?, tweet?, tags[]?}`
- `Layout.astro` — base HTML shell with meta, OG tags, fonts, theme init script, `<ViewTransitions />`

## Page Transitions
- Astro View Transitions enabled via `<ViewTransitions />` in `Layout.astro`
- Nav has `transition:persist` — never re-renders between pages
- Crossfade on main content by default
- Falls back to normal navigation on Firefox (no View Transitions API support)

## LLM/SEO
- `public/llms.txt` — plain-text professional summary (keep updated when career changes)
- `public/robots.txt` — allows all crawlers
- JSON-LD `Person` schema on homepage (includes `sameAs` social links)
- RSS feed at `/rss.xml`

## Constraints
- **Must always be deployable to GitHub Pages** — static output only, no SSR, no server-side APIs. Every change must keep `output: 'static'` in `astro.config.mjs`.
- No paid hosting or backend services.

## Architecture Decisions
- Travel was merged into writing (use `category: travel` in frontmatter)
- Photos section removed (can be added later)
- Homepage bio lives in `src/content/home/index.md` (markdown body, not hardcoded)
- Work data lives in `src/content/work/index.md` (YAML frontmatter, not hardcoded in `.astro`)
- Projects split into two data files: custom projects (`projects.json`) and GitHub repos (`github-repos.json`)
- Markdown image paths use a remark plugin for base path injection — never hardcode `/website/` in content
