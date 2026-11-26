# Multiplication Methods Explorer

Teacher-facing interactive explainer in Classroom Tools → Board Displays and
Visuals (`#/tools/multiplication-methods`, classroom route
`#/classroom/multiplication-methods`). Not a Worksheet Builder generator.

Six methods plus a comparison view share the same positive integer factors:
partitioning, place-value area grid, standard column algorithm, lattice,
Russian multiplication, and doubling/halving. Limits are first factor 1–999,
second 1–99. Includes nine presets and new examples. Switching method resets
its steps but preserves the factors. Reset and Back are reversible.

Column steps show every digit multiplication, incoming/outgoing carry, final
carry, place shift and each addition column. Lattice steps fill each cell then
collect diagonals, including carried values. Russian steps round the left
factor down and keep the right entries opposite odd left entries. Its teacher
explanation identifies the retained remainder. Doubling/halving never rounds:
when neither factor is even, an exact half is retained and the final prompt
explains that another method may be more convenient. Area-grid box dimensions
are schematic, explicitly explained in Teacher explanation. Comparison colours
identify place-value groups from the second factor, including their area-row
sums and corresponding column rows.

Longer explanations, discussion questions and misconceptions stay in a teacher
dialog. The short current teaching step remains beside the SVG on larger
screens and below it on smaller screens. Diagram dimensions and step-panel
allocation remain fixed as steps change. No pupil data, database changes,
tracking, remote assets or new services are involved.

## Verification

`KAIZEN_PACK_NODE_MODULES=<shared-jsdom-folder> node tests/multiplication-methods.test.cjs`
checks exact products, regrouping, partial rows, lattice diagonals, odd-row sums,
exact halving, preset/boundary examples, 4,290 column/lattice calculations, all
step controls, method switching, teacher explanations and registry placement.
Browser review uses a temporary local test copy with the access scripts omitted;
production files retain the standard tool access guard. Remove the temporary
copy after review.
