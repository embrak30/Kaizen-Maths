# U.S. Precalculus ready-made resources

Route: `#/precalculus`, under **Ready-Made Resources**. This is a broad topic
collection for high-school and introductory college precalculus, not an AP
Precalculus exam-topic map. Individual courses vary. OpenStax's published scope
and College Board's framework were consulted for coverage only; no textbook or
exam questions/artwork were copied.

48 static home-learning packs, eight questions each (384 total), across seven
areas: functions/graphs, polynomials/rational functions, exponentials/logarithms,
trigonometry, analytic geometry, systems/matrices, and sequences/counting.
Question PDFs are one **US Letter** page at fixed 11pt question prose. Separate
teacher PDFs include answers, working and advisory points. Topic downloads and
related teaching tools are linked directly from a compact, searchable table.
The table shows at most nine topics per view, with pagination where needed.

The source adapts our existing A-level/IB question banks and adds original
functions/rates, polynomial behavior, rational graph, complex-number, conic and
polar-coordinate material. Provenance is recorded per pack. U.S. terminology
and currency are applied to prose; tool slugs are preserved. Student work is on
separate paper. No student-course accounts, uploads, tracking or new database
schemas are introduced.

## Build

Use the established PDF runtime (ReportLab, pypdf, pdfplumber, Pillow, Poppler)
and the shared Node print runtime (jsdom, MathJax and the existing canvas module).
Set `KAIZEN_PRECALC_PYTHON_MODULES` to a SymPy folder if it differs from
`/tmp/kaizen-precalc-python`. Set `KAIZEN_PACK_NODE_MODULES` to the Node modules
folder containing jsdom and mathjax-full.

```
python3 scripts/precalculus/author.py
KAIZEN_PACK_SOURCE=data/precalculus/library.json \
KAIZEN_PACK_ASSETS=tmp/pdfs/precalculus-assets \
KAIZEN_PACK_OUTPUT=tmp/pdfs/precalculus-prepared.json \
KAIZEN_PACK_ERRORS=tmp/pdfs/precalculus-errors.json \
KAIZEN_PACK_STRICT_TEX=1 node scripts/pack-library/prepare.cjs
python3 scripts/precalculus/build.py
python3 scripts/precalculus/qa.py
node tests/precalculus.test.cjs
node tests/resource-navigation.test.cjs
```

Published topic PDFs are under `assets/precalculus/`; the catalogue lives in
`data/precalculus/catalog.json` and `assets/site/precalculus-data.js`. Optional
complete collections with topic bookmarks are in `output/pdf/` and linked from
the library footer. Build and review images are temporary under `tmp/pdfs/`.
Nothing in this workflow deploys the site or changes other resource PDFs.

## Verification scope

Every question has an answer, worked steps and a consistent point total. New
symbolic claims are checked with SymPy. Adapted systems, matrix operations and
counting answers receive additional independent calculation checks. These checks
are not a claim of independent symbolic verification of every reused answer.
Every topic PDF page is rendered and checked for Letter size, text/equation
bounds, raw notation, question numbering and student/teacher separation.
Contact sheets and representative full-size pages must also be inspected.
Website checks cover all downloads, real tool links, filtering, search, escaping,
paging, route fallbacks and persistent navigation, plus existing library tests.
