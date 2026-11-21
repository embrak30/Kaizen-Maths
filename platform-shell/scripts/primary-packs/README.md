# Primary topic practice

Original ten-question packs spanning all five Grades 4–6 mathematics strands. This is written topic practice, not a complete official PEP assessment or a claim to assess every curriculum objective. The published 2021 NSC essential-objective guide is the planning basis; sources and practical limitations are in the catalogue and collection page. Do not rename the live Primary Problem Solving tool or introduce country-specific currency labels.

## Rebuild

Use Node with the existing `KAIZEN_PACK_NODE_MODULES` dependency directory and the bundled Python runtime (ReportLab, pypdf, Pillow).

1. `node scripts/primary-packs/export.cjs` freezes varied questions from the existing generator.
2. `python scripts/primary-packs/author.py` adds the other written curriculum topics and coverage notes. Always run export first; authoring does not append to a previous full collection.
3. Set `KAIZEN_PACK_SOURCE=data/primary-packs/source.json`, `KAIZEN_PACK_ASSETS=tmp/pdfs/primary-assets`, `KAIZEN_PACK_OUTPUT=tmp/pdfs/primary-prepared.json`, `KAIZEN_PACK_ERRORS=tmp/pdfs/primary-render-errors.json`, then run `node scripts/pack-library/prepare.cjs`. This reuses the existing fraction/diagram renderer without changing other libraries.
4. Follow the PDF skill's operation marker requirement before PDF authoring. Run `python scripts/primary-packs/build.py`. It rejects clipping, unsupported glyphs and leaked notation before publishing.
5. Run `node tests/primary-packs.test.cjs`, `node tests/resource-navigation.test.cjs`, and `python scripts/primary-packs/qa.py`. Inspect the rendered contact sheets and full-size sample pages.
6. `node scripts/marketing/build.cjs` refreshes public shells after navigation/cache changes.

Each topic has a two-page student PDF, a teacher PDF (answer sheet and worked solutions), and a complete PDF. Download bundles contain complete PDFs, organised by grade. The initial catalogue has 75 packs and 750 questions. Diagrams are native mathematical SVGs; required geometry stays in the assessment questions. Optional teaching bar models are not added to the assessment paper.

A whole-collection ZIP and grade ZIPs are generated. The public ready-made resource route is `#/primary-topic-packs`; the existing sidebar stays mounted.
