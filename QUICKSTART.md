# Quick Start

## Commands
```bash
npm run dev      # local dev server → localhost:4321/website
npm run preview  # preview production build locally
git add -A && git commit -m "..." && git push origin main  # deploy
```

---

## Common Tasks

### Update bio
Edit `src/content/home/index.md` — markdown body is the homepage text.

### Update work experience / proof of work
Edit `src/content/work/index.md` — YAML frontmatter, two sections:
- `roles[]` — timeline entries
- `proofOfWork[]` — links, talks, press, launches

### Change resume
Replace `public/resume/Giridhar-Resume.pdf` with the new file (keep the same filename).

### Add a blog post
1. Create `src/content/writing/your-post-slug.md`
2. Add frontmatter:
```yaml
---
title: "Your Post Title"
date: 2025-06-01
description: "One line summary"
category: experience  # or: travel, product, personal
---
```
3. Write in markdown below the `---`

### Add images to a blog post
1. Drop image in `public/images/blog/`
2. Reference in markdown:
```markdown
![Alt text](/images/blog/your-image.jpg)
```
For custom size (use HTML):
```html
<img src="/images/blog/your-image.jpg" alt="..." style="width: 50%;" />
```

### Add a side project
Edit `src/data/projects.json` — add an entry:
```json
{
  "name": "Project Name",
  "description": "What it does.",
  "status": "Active",
  "link": "https://...",
  "tweet": "https://x.com/..."
}
```
`status`: `Active` / `In Progress` / `Archived`
`link` and `tweet` are optional.

### Add an open source repo
Edit `src/data/github-repos.json` — add an entry:
```json
{
  "name": "repo-name",
  "description": "What it does.",
  "language": "Swift",
  "url": "https://github.com/..."
}
```

---

## File Map
```
src/content/home/index.md     → Homepage bio
src/content/work/index.md     → Work & proof of work
src/content/writing/*.md      → Blog posts
src/data/projects.json        → Side projects
src/data/github-repos.json    → Open source repos
public/resume/                → Resume PDF
public/images/blog/           → Blog images
public/images/projects/       → Project screenshots
public/images/home/           → Homepage photo (when ready)
```
