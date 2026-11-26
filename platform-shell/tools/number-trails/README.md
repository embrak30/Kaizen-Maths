# Number Trails

Teacher-facing branching arithmetic display, available at `#/tools/number-trails`.
The twelve-circle topology follows the supplied reference. Each destination has
one incoming arrow; two outgoing arrows independently use the same source value.

New challenge randomises the start and all eleven operations/operands. Use start
creates a fresh trail from the teacher's chosen whole number. Three levels:
addition/subtraction within 0–30; mixed four operations within 0–200; signed
integer challenge within −500–500. Division is exact, denominators are at least
two, and identity operations are excluded. Circles have accessible labels for keyboard and screen-reader use.
Individual circle reveals support mouse and keyboard; Show/Hide answers resets
all answers. New challenges and level changes clear all reveals.

Download PDF creates an A4 landscape vector document, with black lines and large
numbers. Signs are vector paths, avoiding missing multiplication/division glyphs.
Question sheets always have eleven blank circles regardless of on-screen reveals.
The optional answer key is a separate second page of the same PDF. No pupil data
is stored. Teacher guidance stays in a dialog.

`model.js` exports deterministic generation for checks. Run
`node tests/number-trails.test.cjs` with the shared jsdom runtime available through
`KAIZEN_PACK_NODE_MODULES`. The SVG has a fixed viewBox and the display region
keeps its height during reveals. Print CSS uses A4 landscape.
