# Starter and exit ticket library

The frozen source in `data/practice-packs/library.json` comes from the real standard generators, with a fixed seed. Explainers, hidden tools and classroom routines are excluded. The existing 11 substitution packs retain their separate builder.

Runtime: Node with jsdom 26, mathjax-full 3 and mathjs 14 (pinned in package.json; install with npm in this script directory). Set KAIZEN_PACK_NODE_MODULES to their node_modules directory (default /tmp/kaizen-pack-runtime/node_modules). Canvas uses the bundled @napi-rs/canvas runtime. Python needs reportlab, pypdf and Pillow; previews need Poppler. See runtime.cjs and prepare.cjs for the runtime locations.

1. `node scripts/pack-library/export.cjs` freezes questions and coverage.
2. `node scripts/pack-library/verify-maths.cjs` independently checks expressions that can be parsed unambiguously.
3. `node tests/simultaneous-pack.test.cjs` checks 500 systems and worked equalities.
4. `node scripts/pack-library/prepare.cjs` renders TeX, source diagrams and tables into print blocks. Do this again after changing the source.
5. Build four bounded batches with `KAIZEN_PACK_START=0 KAIZEN_PACK_COUNT=100 python scripts/pack-library/build.py`, then starts 100, 200 and 300 (last count 62). Follow the PDF skill operation marker requirements before authoring. All batches must have zero errors.
6. `python scripts/pack-library/render_qa.py` renders every page and makes contact sheets. Visually check representative student and teacher pages, including dense diagrams, tables, matrices and calculus. Layout measurement and raw-TeX checks run in the builder.
7. `python scripts/pack-library/publish.py` copies verified PDFs and produces first-page previews, catalogue and coverage report.
8. `node tests/practice-packs.test.cjs` checks coverage, filters and published files.

Student slips preserve the questions. Histogram/cumulative-frequency student slips use their numerical tables rather than repeating the same data in a chart. Linear-programming contextual slips leave the sketch to students. Teacher pages retain the full diagrams and worked solutions.

Intermediate render assets and bounded build manifests live in tmp/pdfs; only PDFs and compact previews are published. Preview generation is lazy in the browser, and cards load 24 at a time.

Each slip also carries the source tool's set instruction when needed; simple derivative-only prompts explicitly ask students to differentiate. The linear-programming cards already contain the full task and keep that original instruction. Cylinder boundary arcs are printed as unfilled strokes to keep the diagram clear.

Run `python scripts/pack-library/audit_latex.py` after publishing the local assets. It scans every page of every public PDF and every prepared print block for raw commands, math delimiters, caret powers, missing glyphs and unresolved values. Dollar currency amounts are preserved. The persistent report includes file hashes in `data/practice-packs/latex-audit.json`. The builder also rejects leaked commands, math dollar delimiters and caret powers before accepting a PDF. Regression cases are in `tests/practice-pack-latex.test.cjs`.

For product and quotient rule changes, run `node tests/differentiation-factorisation.test.cjs`. It compares generated answers and intermediate algebra against independently differentiated functions, checks numerical-factor reduction and exercises trig cancellation. Refresh the frozen source and rebuild the five differentiation levels after modifying these generators.
