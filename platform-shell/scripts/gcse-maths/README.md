# Board-neutral GCSE (9–1) one-pagers

Route: `#/gcse-maths`, under Ready-Made Resources. This collection uses the
Department for Education common GCSE subject content for England, rather than
a named exam board's paper layout. The source is linked on the page and in
`data/gcse-maths/plan.json`.

106 fixed topic papers, eight questions per student A4 sheet. 75 are shared
Foundation/Higher fluency papers; 31 contain additional Higher material.
Selecting Higher includes the shared papers. Separate teacher PDFs give
worked solutions and advisory marks, not official exam-board mark schemes. Marks distinguish short recall and readings from multi-step methods.
The PDF footer grants classroom/personal study copying permission.

The six subjects have compact topic groups and a cross-subject search.
Teaching Tool links can lead to tools containing additional topics or levels;
the linked tool's unrestricted mixed mode is not itself a GCSE specification.
These are topic practice papers, not full synoptic exam papers or a promise of
every board-specific question/context. Calculator and formula-sheet rules must
be checked against the teacher's selected board and assessment year.

## Sources and build

- `plan.py`: source references, tier tagging and narrow generator selections.
- `export.cjs`: deterministic export of existing activities and selected original
  Kaizen papers; preserves diagrams, fractions and vector notation.
- `author.py` / `content.py`: original contexts, shared graphs/tables, proof,
  constructions, transformation and data questions. Source JSON remains editable.
- `assemble.py`: combines papers and normalises mathematical delimiters.
- `check-maths.py`: independent checks for the explicitly listed numerical
  families, including linear/quadratic roots, percentages and exchange rates.
  These checks are not independent verification of every answer.
- `build.py`: measured fixed 11pt student prose; questions must fit without
  shrink-to-fit. Teacher solutions continue onto further pages as necessary.
- `qa.py`: every PDF page is rendered and checked for notation, bounds, hashes,
  question numbering, marks and one-page student layout. Contact sheets need
  visual inspection, especially for diagrams and rasterised equations.

Run `plan.py`, `export.cjs`, `author.py`, `assemble.py`, `check-maths.py`, then the
shared `scripts/pack-library/prepare.cjs` with these environment variables:

```
KAIZEN_PACK_SOURCE=data/gcse-maths/library.json
KAIZEN_PACK_ASSETS=tmp/pdfs/gcse-library-assets
KAIZEN_PACK_OUTPUT=tmp/pdfs/gcse-library-prepared.json
KAIZEN_PACK_ERRORS=tmp/pdfs/gcse-library-errors.json
```

Then run `build.py`, `qa.py`, `tests/gcse-maths.test.cjs` and the existing
resource-navigation, marketing, AP and A level regression checks. Use the same
Node/Python dependencies as the established A level print pipeline.

Published files live under `assets/gcse-maths/`. Build intermediates and rendered
print-review images are ignored under `tmp/pdfs/`. All downloads are static;
no database, account, billing or production infrastructure change is required.

## Home-learning and mixed-revision pilot

The eight Number / Calculations topics N01–N08 now use **Home Learning Pack**
and **Teacher Solutions** download labels. Other topic groups retain their
existing labels. Their PDFs and teaching-tool links are unchanged.

FNR01 adds one Foundation Number revision pair above those topics: 24 mixed
questions (three per topic), two student pages and four teacher-solution pages.
It includes calculation, reverse, error-spotting and application questions. It
covers the Calculations group, not the entire Number specification. Question
provenance is recorded in `number-revision-pilot.json`; working and suggested
awards are reviewed specifically for this pack. The teacher pages identify each
question's source topic. No new database or paid service is used.

Rebuild this pilot independently, without regenerating the 106 topic pairs:

```
python3 scripts/gcse-maths/revision-pilot.py source
KAIZEN_PACK_SOURCE=data/gcse-maths/number-revision-pilot.json \
KAIZEN_PACK_ASSETS=tmp/pdfs/gcse-revision-assets \
KAIZEN_PACK_OUTPUT=tmp/pdfs/gcse-revision-prepared.json \
KAIZEN_PACK_ERRORS=tmp/pdfs/gcse-revision-errors.json \
KAIZEN_PACK_STRICT_TEX=1 node scripts/pack-library/prepare.cjs
python3 scripts/gcse-maths/revision-pilot.py build
python3 scripts/gcse-maths/qa-revision-pilot.py
node tests/gcse-home-learning.test.cjs
```

Set `KAIZEN_PACK_NODE_MODULES` to the established jsdom/MathJax dependency
folder if it is not at the print pipeline's default location. The pilot build
writes a separate `revision-catalog.json` and merges its downloads into the
published catalogue; the full GCSE build also preserves these revision entries.
Visual review images are under `tmp/pdfs/gcse-revision-review/`.
