# Grade 4 Number workbook pilot

Build with the bundled Python runtime (ReportLab and pypdf):

1. `PYTHONDONTWRITEBYTECODE=1 python scripts/workbooks/build-grade4-number.py`
2. `PYTHONDONTWRITEBYTECODE=1 python scripts/workbooks/qa-grade4-number.py`
3. Inspect the rendered contact sheets under `tmp/pdfs/grade4-number-workbook/review`.

The 19-page Student Workbook contains a cover, linked contents, sixteen question pages and a review page. The 52-page Teacher Edition includes a cover, linked contents, teaching/pilot feedback notes, the same sixteen question pages, and all 33 answer/solution pages. Each book has continuous printed pagination and PDF bookmarks. Question numbering restarts within each numbered topic. The source pack PDFs are never modified.

The eight topics and 80 questions are selected from the existing Grade 4 Number packs. They include whole-number skills, sets, fractions, decimals and money. This is a practice workbook pilot, not a complete Grade 4 course, official assessment, or new instructional course. No new question bank or pupil data collection is introduced. Teachers select starting points and review local curriculum expectations.

The script removes only the source pack footer text at its known absolute baselines before applying book footers. QA compares every question and solution body against the sources, checks all page numbers and contents destinations, hashes the sources, and renders every page. Rebuild the workbook after changing a source pack, then rerun QA and review the layouts.

Deployable PDFs and a provenance manifest are in `assets/workbooks`; delivery copies are in `output/pdf/workbooks`. The two download links appear on Primary Practice Packs when Grade 4 / Number is selected and no search is active. Other grades and strands retain their existing topic-pack presentation.
