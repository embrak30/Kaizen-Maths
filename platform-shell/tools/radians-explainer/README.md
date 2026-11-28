# Why π Radians = 180°

Standalone teaching explainer: `#/tools/radians-explainer`, classroom display:
`#/classroom/radians-explainer`. Registered under Algebra → Trigonometry, with
links to/from the Unit Circle Explainer. Not a Worksheet Builder generator.

Six stages: radius; length-preserving wrap to one radian; three unit arcs plus
the (π − 3) remainder; half the circumference; s/r = πr/r = π radians = 180°;
and exploration from 0° to 360°. Radius control is 1–5. Exact π fractions are
used for whole-degree angles, with an exact one-radian preset. Other numbers
are explicitly approximate. The teacher explanation keeps the number π
separate from the unit radian and explains radius invariance.

The animated copy first translates and rotates a straight radius-length
segment to the tangent. It then bends with curve radius R/t and central angle
t, preserving length R. It coincides with the original circle's one-radian arc
only when bending finishes. One-radian labels are withheld until that endpoint.
The semicircle is not labelled as three radians: its fourth segment is the
explicit (π − 3)r remainder.

Teaching steps 2 and 3 animate when entered forwards, unless reduced motion is
requested. Play/pause/replay and a scrub slider allow teacher control. Stage
changes, radius changes, opening the teacher dialog, page hiding and navigation
cancel the running frame. Other stages are static. Explore has a manual full-
turn sweep and angle presets. All teaching controls remain outside the SVG,
so redrawing does not move focus or resize the workspace.

`model.js` contains the geometry and exact-value helpers. Run
`KAIZEN_PACK_NODE_MODULES=<jsdom folder> node tests/radians-explainer.test.cjs`
for length-preservation, radius invariance, exact values, remainder sums,
full-circle arcs, animation lifecycle, UI, validation and registry checks.
No external libraries, images, student data, schema changes or new services
are required. Production files retain the normal tool access guard.
