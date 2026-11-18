# IB Mathematics topic library

Original Kaizen practice for AA SL, AA HL, AI SL and AI HL, following the first-assessment-2021 course family (exams through 2028). The 2029 revision is not included. No IB exam questions, official mark schemes, guide text or logos are republished.

`author.py` builds 138 banks (eight questions each) from existing Kaizen sources plus original IB-focused material in `author.py` and `additional.py`. Shared banks have explicit course arrays; inclusion at SL implies inclusion at HL **within the same pathway**. AA and AI are never treated as equivalent. Every pack records its provenance. Reused source libraries and their PDFs are left intact.

Build from the repository root, using Python with ReportLab, pypdf, SymPy and mpmath and Node dependencies from `scripts/pack-library/package.json`:

```sh
python3 scripts/ib-maths/author.py
KAIZEN_PACK_STRICT_TEX=1 KAIZEN_PACK_SOURCE=data/ib-maths/library.json KAIZEN_PACK_ASSETS=tmp/pdfs/ib-library-assets KAIZEN_PACK_OUTPUT=tmp/pdfs/ib-library-prepared.json KAIZEN_PACK_ERRORS=tmp/pdfs/ib-library-errors.json node scripts/pack-library/prepare.cjs
python3 scripts/ib-maths/build.py
python3 scripts/ib-maths/qa.py
node --test tests/ib-maths.test.cjs tests/ib-print-math.test.cjs
```

Set `KAIZEN_PACK_NODE_MODULES` and `KAIZEN_AP_PYTHON_MODULES` if dependencies live outside the standard environment. `build.py` uses the established AP/GCSE print renderer, Georgia prose at a fixed 11pt on student pages, MathJax equations and measured two-column layouts. It fails rather than reducing student text size or publishing a second student page. Teachers receive full worked solutions separately, with advisory marks. Shared diagrams retain their originating tool's CSS.

Strict TeX preparation also rejects MathJax's red undefined-command output: ordinary MathJax error detection alone does not catch this. It is opt-in to avoid changing other libraries' existing build behaviour. Newly authored TeX is not passed through the legacy double-backslash normaliser; matrix row separators must survive intact.

`qa.py` renders every page and checks hashes, numbering, marks, page counts, text/image bounds, raw notation and student/teacher separation. Inspect the contact sheets and representative full-size student/teacher pages in `tmp/pdfs/ib-library-review/` after a rebuild. `maths-checks.json` records selected symbolic family checks, not an independent proof of all 1,104 answers.

The browser route is `#/ib-maths`, reached from Ready-Made Resources and Teacher reference. Course, subject and topic-group filters plus eight-row pagination keep desktop lists compact. Search stays within the selected course. PDF links are static assets; no database, authentication or payment changes are required.

## Scope

These are topic-practice sheets, not complete mock papers, IB-endorsed resources, an official specification checklist, or support for every possible examination variation. They do not replace the mathematical exploration. See `data/ib-maths/coverage.md` for the course inventory and remaining depth requirements. Tool links lead to existing generators and may offer activities outside the selected course.
