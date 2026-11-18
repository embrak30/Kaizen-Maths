# Edexcel UK 9MA0 review pilots

Three original static pilot sets: P2.3 quadratics/discriminants, S5.2 binomial hypothesis testing and M8.2 resolving forces. IDs name the main specification clause; supplementary references are recorded in the source. These are Kaizen practice, not official Pearson questions or marking schemes.

Each has eight questions on one A4 student sheet and a separate four-page teacher file. The pilots use Georgia prose, existing mathematical typesetting, the approved classroom-use footer, and M1/A1/B1-style suggested awards. Statistics needs a binomial-CDF calculator; two-sided construction is specified explicitly. Mechanics uses g = 9.8 unless otherwise stated, with original vector/incline/cable diagrams.

Outputs: `output/pdf/kaizen-9ma0-pilot-*-student.pdf` and `*-teacher.pdf`. Sources, exact-check report, hashes and QA report: `data/alevel-maths/edexcel-9ma0/`. Nothing is added to the website or deployed by these scripts.

Rebuild:

1. Run `pilots-source.py` with the bundled Python. SymPy 1.14.0 is installed at `/tmp/kaizen-ap-python` for the exact checks.
2. Run `scripts/pack-library/prepare.cjs` with `KAIZEN_PACK_NODE_MODULES=/tmp/kaizen-ap-runtime/node_modules`, `KAIZEN_PACK_SOURCE=data/alevel-maths/edexcel-9ma0/pilots.json`, `KAIZEN_PACK_ASSETS=tmp/pdfs/ap-library-assets`, `KAIZEN_PACK_OUTPUT=tmp/pdfs/9ma0-pilot-prepared.json`, and `KAIZEN_PACK_ERRORS=tmp/pdfs/9ma0-pilot-errors.json`.
3. Follow the PDF skill's authoring marker requirement; run `build-pilots.py` and `qa-pilots.py` with the bundled Python.
4. Inspect all 15 rendered pages in `tmp/pdfs/9ma0-pilot-review/`, including complete student sheets and teacher contacts. Inspect superscripts, angles and small diagram labels at full size.

The builder imports AP print primitives in its own process and replaces its header locally. It does not run the AP publishing entry point or modify AP PDFs/catalogues. A local glyph-coverage check handles characters missing from Georgia after the prose font switch.

## Full fixed library (UK Edexcel 9MA0)

The local route `#/alevel-maths` contains 140 eight-question packs: 92 Pure,
25 Statistics, 21 Mechanics and two official-LDS companions (listed under
Statistics). The 140 student PDFs each occupy one A4 page with 11pt Georgia
prose, mathematical typesetting, limited working space and permission to copy
for educational use. Separate teacher PDFs include worked solutions and
suggested marks. These are original topic-practice sheets, not Pearson papers
or official mark schemes. A topic bank is not a full synoptic mock examination.

Source order and filenames are stable. `plan.py` maps the scoped specification
clauses; `export-library.cjs` selects approved pilots and narrowly chosen existing
activities; `author-library.py` creates original questions and replaces unsuitable
exports; `assemble-library.py` combines them in specification order. Review and
edit these sources rather than editing generated PDFs. Reused tools can offer
additional activities outside 9MA0, so their unrestricted mixed mode is not a
specification guarantee.

Build in this order, using a Python environment with ReportLab, pypdf,
pdfplumber, Pillow and SymPy, and a Node environment with the existing pack
runtime dependencies (`KAIZEN_PACK_NODE_MODULES`):

```sh
python3 scripts/alevel-maths/plan.py
node scripts/alevel-maths/export-library.cjs
python3 scripts/alevel-maths/author-library.py
python3 scripts/alevel-maths/assemble-library.py
python3 scripts/alevel-maths/check-maths.py
KAIZEN_PACK_SOURCE=data/alevel-maths/edexcel-9ma0/library.json KAIZEN_PACK_ASSETS=tmp/pdfs/9ma0-library-assets KAIZEN_PACK_OUTPUT=tmp/pdfs/9ma0-library-prepared.json KAIZEN_PACK_ERRORS=tmp/pdfs/9ma0-library-errors.json node scripts/pack-library/prepare.cjs
python3 scripts/alevel-maths/build-library.py
python3 scripts/alevel-maths/qa-library.py
node tests/alevel-maths.test.cjs
node tests/ap-calculus.test.cjs
```

`qa-library.py` checks all PDF pages and produces contact sheets under
`tmp/pdfs/9ma0-library-review/`. Inspect them visually as well; text extraction
cannot detect a malformed equation embedded as an image. The mathematical
checks cover the named symbolic/numerical families, not an independent proof
of every answer. Teacher marks are advisory and allow equivalent methods.

The official LDS workbook was checked directly (Issue 1, Met Office data):
five UK and three overseas stations, May–October in 1987 and 2015. LDS2 uses
an attributed three-day Camborne extract. Its companion link opens Pearson's
workbook. The site's separate fictional Kaizen training dataset is deliberately
not linked as the official LDS. Official source URLs and workbook verification
are recorded in `data/alevel-maths/edexcel-9ma0/sources.json`.

All assets are static. No database, account roles, payment settings, email
services or production infrastructure are changed by this library. Deployment
remains a separate action.
