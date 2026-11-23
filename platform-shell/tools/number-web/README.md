# Number Web

Teacher-facing missing-number puzzles. Each independent branch has three addends that total the centre target. Exactly two numbers are given and one is missing. The near-centre value is an addend, not a subtotal. This is addition with inverse reasoning, not an arbitrary-operations puzzle.

Six controlled levels use 4, 6 or 8 branches: bonds to 10; positive integers within 20; within 50; within 200; positive tenths; and integers including negatives. All arithmetic is generated in integer units (tenths use a scale of 10). Blanks are spread over all three positions. Seeds reproduce the displayed puzzle. No pupil accounts, server requests, storage or tracking data are added.

`model.js` holds seeded generation and geometry. `web.js` renders accessible SVG, checks/reveals individual answers, resets levels/targets and downloads PDFs. The desktop workspace puts controls beside a large square diagram; smaller viewports use controls above/below the web. Teacher guidance is in a dialog.

`pdf.js` writes a vector A4 PDF in-browser with standard PDF base fonts. It uses the same model and coordinates as the SVG. Questions always preserve original blanks, regardless of typed/revealed answers; the optional second page completes those blanks. PDF downloads contain only the current puzzle, not a newly generated puzzle. No CDN, third-party export service or rasterisation is needed.

Registered as `number-web` in Classroom Tools / Board Displays and Visuals. Use `#/tools/number-web` for the guide and `#/classroom/number-web` for display. The activity is explicitly excluded from Worksheet Builder's unsupported generators; it has its own PDF control.

## Checks

Run `node --test tests/number-web.test.cjs` with `KAIZEN_PACK_NODE_MODULES` pointing to the existing jsdom installation. This verifies 2,200 generated puzzles, sums and missing values, reproducibility, all levels, checks/reveals/resets, and export of the current puzzle; it creates six paired PDF fixtures in `tmp/pdfs/number-web-review`.

Then run `python tests/number-web-pdf.test.py` with pypdf, pdfplumber, Pillow and Poppler. It checks the exact numbers/blanks at every diagram node, A4 size, text bounds, one/two-page exports and renders the six levels. On macOS it creates a temporary writable fontconfig cache for Poppler. Inspect the question/answer contact sheets before changing the PDF layout. Delete temporary review outputs after verification.

Delivery samples in `output/pdf` correspond to the saved classroom previews. No database or infrastructure changes are required.
