# CSEC Mathematics ready-made worksheets

110 original Kaizen topic packs, with eight questions per student sheet and separate worked solutions and suggested marks. The collection follows the **May–June 2027 onwards** version of CSEC Mathematics and uses its three modules. It is not labelled for the outgoing January 2027 syllabus.

The collection is topic practice, not a complete mock exam, official CXC material, or an SBA replacement. No CXC questions, specimens or marking schemes have been copied. Kaizen pack identifiers are local identifiers, not CXC objective numbers.

Existing GCSE and IB banks are reused selectively with their diagram styles and provenance retained. New banks cover consumer arithmetic, set notation, matrix operations, linear programming, circle segments and CSEC statistics. Topics outside scope, such as calculus, eigenvalues, formal hypothesis tests and conditional-probability packs, are excluded. Standard deviation is interpreted rather than calculated; histogram bars have equal class widths.

Money examples use JMD where appropriate; all exchange, tax, insurance and utility rates are illustrative and explicitly supplied. These are arithmetic questions, not statements about current local rules or product terms.

## Rebuild

From the repository root, using Python with ReportLab, SymPy, pypdf and pdfplumber, and the Node dependencies in `scripts/pack-library/package.json`:

```sh
python3 scripts/csec-maths/author.py
KAIZEN_PACK_STRICT_TEX=1 KAIZEN_PACK_SOURCE=data/csec-maths/library.json KAIZEN_PACK_ASSETS=tmp/pdfs/csec-library-assets KAIZEN_PACK_OUTPUT=tmp/pdfs/csec-library-prepared.json KAIZEN_PACK_ERRORS=tmp/pdfs/csec-library-errors.json node scripts/pack-library/prepare.cjs
python3 scripts/csec-maths/build.py
python3 scripts/csec-maths/check-maths.py
python3 scripts/csec-maths/qa.py
node --test tests/csec-maths.test.cjs
```

Set `KAIZEN_PACK_NODE_MODULES` and `KAIZEN_AP_PYTHON_MODULES` if dependencies are elsewhere. The shared AP/GCSE renderer uses Georgia prose at 11pt on student pages; the build fails rather than shrinking text or adding a second student page. Strict MathJax preparation rejects undefined commands as well as normal TeX errors. Legacy escape normalisation is not applied to original matrix TeX.

Every PDF is rendered and checked for page count, content hashes, marks, numbering, notation and layout bounds. Review the student contacts and representative full student/teacher pages in `tmp/pdfs/csec-library-review/`. The mathematical checks are selected independent family checks, not proof of every answer in every reused bank.

Route: `#/csec-maths`, accessible through Ready-Made Resources and Teacher reference. Search spans all three modules. Eight-row pagination keeps longer topic lists compact. No production, database, authentication or payment changes are needed.
