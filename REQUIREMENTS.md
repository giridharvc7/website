# Website Requirements

## Owner
Giridhar — personal website / portfolio

## Purpose
- Proof-of-work showcase for recruiters and hiring managers
- Minimal writing space (product/experience essays, LLM-free)
- Travel blog (stories and itineraries)
- Photo sharing
- LLM-indexable professional identity

## Tech Stack
- Astro (static site generator)
- GitHub Pages (free hosting)
- Plain CSS (monochrome design)
- Markdown for all content

## Hosting
- GitHub Pages (free)
- URL: https://giridhar.github.io until domain purchased
- Domain: Not yet owned — will be connected via CNAME

## Design Principles
- Minimal monochrome (black/white/gray)
- Content-first, no distractions
- ~680px content width
- Dark mode via OS preference
- No JavaScript unless absolutely necessary

## Site Sections
1. Home — bio + navigation
2. Work — career timeline + proof-of-work cards
3. Projects — side projects (open-source or private)
4. Writing — product/experience essays
5. Travel — travel stories and itineraries
6. Photos — photo gallery

## LLM Indexability Goals
- llms.txt at site root
- JSON-LD Person schema on homepage
- Semantic HTML throughout
- Open robots.txt
- RSS feeds for blog content

## Content Model
- Writing posts: src/content/writing/*.md (title, date, description, body)
- Travel posts: src/content/travel/*.md (title, date, location, description, body)
- Work entries: hardcoded in work.astro (or a JSON/YAML data file)
- Photos: public/photos/ (static assets)


## Inspiration and References 
- https://manassaloi.com
- https://dustinschau.com
- https://bharath.sh
