# Gaute Torsvik Homepage

Simple modular academic homepage with data-driven paper lists.

## Structure

- `index.html`: landing page
- `pages/working-papers.html`: working papers list
- `pages/publications.html`: publications list
- `pages/cv.html`: CV page
- `pages/contact.html`: contact page
- `data/papers.json`: all paper metadata
- `assets/papers/`: PDF files
- `assets/cv/`: CV PDF

## Update workflow

1. Add PDF to `assets/papers/` (and CV to `assets/cv/` when needed).
2. Add metadata in `data/papers.json` directly, or use helper script:

```bash
node scripts/add-paper.js \
  id=my-paper-2026 \
  type=working \
  title="My New Paper" \
  authors="Gaute Torsvik; Coauthor Name" \
  year=2026 \
  status="Revise and Resubmit" \
  journal="Journal Name" \
  pdf="assets/papers/my-paper-2026.pdf" \
  abstract="Short abstract here." \
  doi="10.xxxx/xxxx" \
  code_link="https://github.com/..."
```

3. Commit and push:

```bash
git add .
git commit -m "Update papers"
git push
```

## Working with Codex

To add a paper quickly, provide:

- PDF file path
- type (`working` or `publication`)
- title
- authors
- year
- status
- journal (optional)
- abstract
- DOI (optional)
- code link (optional)

Codex can then move files, update `data/papers.json`, and prepare commit-ready changes.
