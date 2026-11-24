# Further Mathematics — Edexcel UK 9FM0 Core Pure

Route `#/further-maths` under Ready-Made Resources. Thirty original topic packs,
eight questions per A4 student sheet (240 total), separate worked solutions with
advisory marks, relevant existing teaching tools, and a bookmarked Complete PDF.
The nine areas follow the Core Pure content of Pearson's specification (Issue 4).
Both Core Pure papers may assess the whole content. Optional Further Pure,
Statistics, Mechanics and Decision papers are excluded. These are original
Kaizen topic practice, not official Pearson papers or an exam-paper substitute.
The source URL is recorded in library.json and linked on the page.

## Rebuild

Use the shared Node PDF runtime (jsdom, MathJax, canvas), Python (SymPy,
ReportLab, pypdf, pdfplumber, Pillow) and Poppler. Set
`KAIZEN_MATHS_PYTHON_MODULES` for a non-default SymPy installation, and
`KAIZEN_PACK_NODE_MODULES` for the shared Node module directory.

```sh
python3 scripts/further-maths/author.py
python3 scripts/further-maths/qa.py --source-only
KAIZEN_PACK_SOURCE=data/further-maths/edexcel-9fm0/library.json \
KAIZEN_PACK_ASSETS=tmp/pdfs/9fm0-assets \
KAIZEN_PACK_OUTPUT=tmp/pdfs/9fm0-prepared.json \
KAIZEN_PACK_ERRORS=tmp/pdfs/9fm0-render-errors.json \
KAIZEN_PACK_STRICT_TEX=1 node scripts/pack-library/prepare.cjs
python3 scripts/further-maths/build.py
python3 scripts/ready-made-resources/build-complete.py further-maths
python3 scripts/further-maths/qa.py
node tests/further-maths.test.cjs
node tests/resource-navigation.test.cjs
```

PDFs are committed static assets in `assets/further-maths/edexcel-9fm0/`;
the complete download is in `assets/ready-made-complete/`. Catalogues are in
`data/further-maths/edexcel-9fm0/` and `assets/site/further-maths-data.js`.
Temporary equations, page renders and contact sheets live in `tmp/pdfs/`.
No database, payment or infrastructure changes are required. Publishing remains
the site's existing Vercel deployment workflow.

Verification checks answer substitutions, algebraic identities, calculus and DE
residuals; some assertions reuse the authoring expressions and are consistency
checks, not independent proofs. Proof wording, descriptive geometry, domains and
convergence arguments also receive editorial review. Every page is rendered;
page count, image/text bounds, missing glyphs and file hashes are checked.
