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
