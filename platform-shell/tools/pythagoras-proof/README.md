# Pythagoras: A Moving Proof

Routes: `#/tools/pythagoras-proof` and `#/classroom/pythagoras-proof`.
Geometry → Trigonometry and Bearings; also in the cross-topic collection
`#/collections/visual-proofs` (Visual Manipulatives & Proofs).

Five stages: right triangle, grow the leg squares, cut, rearrange, area equality.
Independent legs 1–24, up to two decimals. Five Pythagorean triple presets and
equal legs. Changing dimensions stops playback and returns to the beginning.
The larger leg is drawn horizontally, with a/b labels following their inputs.
Play each stage, pause, scrub, reset, or run the entire proof. The guide is hidden
in a teacher dialog. Reduced-motion preference suppresses automatic stage
playback; manual playback remains possible. No dependency, service or data
storage is added. Normal production tool access controls remain intact.

## Geometry

Perigal's five-piece dissection. Let H ≥ V be the legs, with triangle vertices
(0,0), (H,0), (0,V). The hypotenuse square has corners (0,V), (H,0), (H+V,H),
(V,H+V). Its axes are u=(H,-V)/c and v=(V,H)/c, c=hypot(H,V).

The large source square has centre S=(H/2,-H/2). Clip it into four quadrants in
u/v coordinates about S. Translate each quadrant's origin to its corresponding
hypotenuse-square corner, placing its two cut edges along that corner's sides.
Both cut edges have length c/2. The outside boundary closes exactly; the gap is
an axis-aligned square of side V. Translate the uncut smaller square into that
gap, centred at ((H+V)/2,(H+V)/2). No piece rotates or changes shape.

The geometric construction uses the hypotenuse direction and its perpendicular;
it does not resize source pieces to match a target area. `hypot` normalises
coordinates and supplies a numerical side readout, not the proof's premise.
Equal legs give triangular pieces. Pieces may overlap in transit, never in the
completed arrangement. Borders delineate the pieces; they are not area gaps.

Tests verify rigid edge lengths throughout translation, source area partition,
final containment, pairwise zero overlap, and equal total area (therefore no
unfilled area), including equal/swapped/decimal/extreme legs. UI checks cover
play/pause/scrub, whole-proof completion, validation, presets and reduced motion.
Run `node tests/pythagoras-proof.test.cjs` with KAIZEN_PACK_NODE_MODULES set to
the directory containing jsdom when needed.
