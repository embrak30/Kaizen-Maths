(function(root){
'use strict';
const bar=(label,parts,values,highlight=0)=>({label,parts,values,highlight});
const task=(question,answer,unit,steps,bars,prompt)=>({question,answer,unit,steps,bars,prompt:prompt||'Draw and label the bars. Explain what one equal part represents before calculating.'});
const lessons=[
{id:'read',title:'Read the relationship',focus:'Equal lengths mean equal quantities. Label the whole, the known amount and the unknown. Bars show relationships; they are not pictures of objects.',misconception:'Equal-looking parts must represent equal amounts. Do not split a bar into unequal parts and treat them as equal units.',example:task('A library has 48 books. There are 12 fiction books and the rest are non-fiction. How many are non-fiction?',36,'books',['Draw one whole bar labelled 48 books.','Partition it into a known part of 12 and an unknown remainder. These two parts need not be equal.','The two parts together make 48: 12 + ? = 48.','Find the missing part: 48 − 12 = 36 books.'],[bar('48 books altogether',[1,3],['12 fiction','? non-fiction'],1)]),practice:task('A club has 65 members. 27 are adults; the rest are children. How many children are there?',38,'children',['Label the whole 65 and one part 27.','The missing part is 65 − 27 = 38 children.'],[bar('65 members',[27,38],['27 adults','? children'],1)])},
{id:'fractions',title:'Fractions of a quantity',focus:'The denominator tells you how many equal parts make the whole. The numerator tells you how many of those parts to select.',misconception:'Dividing by the numerator makes the wrong unit. First identify one denominator-sized part.',example:task('Find 3/5 of 80 counters.',48,'counters',['The whole is 80 counters. Split the bar into 5 equal parts.','One part is 1/5 of the whole: 80 ÷ 5 = 16.','Select 3 of the equal parts.','Three parts contain 16 × 3 = 48 counters.'],[bar('80 counters = 5 equal parts',[1,1,1,1,1],['16','16','16','16','16'],3)]),practice:task('A class has 42 pupils. 4/7 travel by bus. How many travel by bus?',24,'pupils',['The whole is 42; draw 7 equal parts.','One part: 42 ÷ 7 = 6 pupils.','Four parts: 6 × 4 = 24 pupils.'],[bar('42 pupils',[1,1,1,1,1,1,1],['6','6','6','6','6','6','6'],4)])},
{id:'percentages',title:'Percentages of a quantity',focus:'The full bar is 100%. Choose useful equal chunks: 10%, 5%, 25% or 1%. Connect these to fractions.',misconception:'A percentage is relative to a specified whole. A 25% bar means one quarter of that whole, not 25 items.',example:task('Find 35% of J$240.',84,'J$',['Label the full bar J$240 and 100%.','One 10% part is J$240 ÷ 10 = J$24.','30% is 3 × J$24 = J$72.','5% is half of 10%: J$24 ÷ 2 = J$12.','35% is J$72 + J$12 = J$84.'],[bar('J$240 = 100% (each small part is 5%)',Array(20).fill(1),Array(20).fill(''),7)]),practice:task('Find 15% of J$360.',54,'J$',['The whole is J$360 = 100%.','10% = J$360 ÷ 10 = J$36.','5% = J$36 ÷ 2 = J$18.','15% = J$36 + J$18 = J$54.'],[bar('J$360 = 100%; shaded = 15%',Array(20).fill(1),Array(20).fill(''),3)])},
{id:'ratio',title:'Ratio: total and difference',focus:'Use the same unit length for both quantities. A total combines all parts; a difference counts only the extra parts.',misconception:'For a 3:5 ratio, the total has 8 parts but the difference has 2 parts. Decide which amount the question gives.',example:task('Red and blue counters are in the ratio 3:5. There are 64 counters altogether. How many are blue?',40,'blue counters',['Red has 3 equal parts; blue has 5 of the same parts.','The total is 3 + 5 = 8 parts.','One part is 64 ÷ 8 = 8 counters.','Blue is 5 parts: 5 × 8 = 40 counters.'],[bar('Red',[1,1,1],['8','8','8'],3),bar('Blue',[1,1,1,1,1],['8','8','8','8','8'],5)]),practice:task('A and B share money in the ratio 3:5. B receives J$18 more than A. How much do they share altogether?',72,'J$',['The difference is 5 − 3 = 2 parts.','Two parts represent J$18, so one part is J$18 ÷ 2 = J$9.','The total is 3 + 5 = 8 parts.','Eight parts represent 8 × J$9 = J$72.'],[bar('A: 3 parts',[1,1,1],['9','9','9'],0),bar('B: 5 parts; extra 2 = J$18',[1,1,1,1,1],['9','9','9','9','9'],5)])},
{id:'reverse-fraction',title:'Reverse fractions',focus:'The known amount may represent several parts, rather than the whole. Find one part from the known group, then rebuild the whole.',misconception:'If 3/5 is 54, dividing 54 by 5 treats a part as the whole. The 54 belongs to 3 parts.',example:task('3/5 of a quantity is 54. Find the whole quantity.',90,'units',['Draw a whole split into 5 equal parts.','Bracket 3 parts and label that group 54.','One part is 54 ÷ 3 = 18.','The whole is 5 parts: 18 × 5 = 90.','Check: 3/5 of 90 = 54.'],[bar('5 parts in the whole; first 3 together = 54',[1,1,1,1,1],['18','18','18','18','18'],3)]),practice:task('After 2/7 of a ribbon is cut off, 45 cm remains. How long was the ribbon originally?',63,'cm',['The original ribbon is 7 equal parts.','The remaining fraction is 7/7 − 2/7 = 5/7.','Five parts represent 45 cm. One part is 45 ÷ 5 = 9 cm.','The original 7 parts measure 7 × 9 = 63 cm.'],[bar('Original ribbon; remaining 5 parts = 45 cm',[2,5],['cut: 2/7','remain: 5/7'],1)])},
{id:'reverse-percent',title:'Reverse percentages',focus:'Identify the percentage represented by the amount given. After a decrease it is below 100%; after an increase it is above 100%.',misconception:'Adding 20% of the reduced price does not undo a 20% reduction. The reduced price is a different whole.',example:task('A jacket costs J$72 after a 20% reduction. Find its original price.',90,'J$',['The original price is 100%.','After a 20% reduction, 80% remains.','Draw 5 equal 20% parts; 4 of them represent J$72.','One 20% part is J$72 ÷ 4 = J$18.','The original 100% is 5 parts: 5 × J$18 = J$90.','Check: 20% of J$90 = J$18; J$90 − J$18 = J$72.'],[bar('Original 100%; first 4 parts = J$72',[1,1,1,1,1],['20%','20%','20%','20%','20%'],4)]),practice:task('A bill is J$138 after a 15% service charge is added. What was the bill before the charge?',120,'J$',['The final bill represents 115%, not 100%.','Find 1% of the original: J$138 ÷ 115 = J$1.20.','Find the original 100%: J$1.20 × 100 = J$120.','Check: J$120 + J$18 = J$138.'],[bar('Final J$138 = 115% of original',[100,15],['original: 100%','extra: 15%'],1)])},
{id:'successive',title:'Multi-step: a fraction of what remains',focus:'Redraw the remaining amount as a new whole before the second operation. Link the new bar back to the original.',misconception:'1/4 of the remainder is not 1/4 of the original. Name the reference whole at every step.',example:task('A teacher has 120 counters. She gives away 2/5, then uses 1/4 of what remains. How many counters are left?',54,'counters',['Original whole: 120 counters in 5 equal parts.','One original part: 120 ÷ 5 = 24.','Give away 2 parts: 2 × 24 = 48.','Remainder: 120 − 48 = 72. This is the new whole.','Divide the new whole into 4 parts: 72 ÷ 4 = 18.','Use 1 part, leaving 3 parts: 3 × 18 = 54 counters.','Check: 48 given away + 18 used + 54 left = 120.'],[bar('Original: 120; give away 2/5',[1,1,1,1,1],['24','24','24','24','24'],2),bar('New whole: 72; use 1/4',[1,1,1,1],['18','18','18','18'],1)]),practice:task('A tank contains 200 litres. 30% is used, then 2/7 of the remaining water is used. How much water is left?',100,'litres',['30% of 200 = 60 litres.','The remainder is 200 − 60 = 140 litres: a new whole.','One seventh of 140 = 20 litres.','Two sevenths used = 2 × 20 = 40 litres.','Left: 140 − 40 = 100 litres.'],[bar('200 litres: 30% used',[3,7],['60 used','140 remain'],1),bar('140 litres: 2/7 used',[1,1,1,1,1,1,1],['20','20','20','20','20','20','20'],2)])},
{id:'challenge',title:'Multi-step: rebuild the original',focus:'Work forwards through the relationships first, then backwards through the quantities. Combine a changing whole with a final ratio.',misconception:'Do not apply the last ratio to the original quantity. It describes only the final remainder.',example:task('A fund gives 1/4 of its money to books, then spends 20% of the remainder on equipment. The money left is shared between clubs A and B in the ratio 2:3. B receives J$108. How much was in the fund originally?',300,'J$',['B has 3 parts of the final remainder, worth J$108.','One final ratio part: J$108 ÷ 3 = J$36.','The final remainder has 5 parts: 5 × J$36 = J$180.','J$180 is 80% of the money left after buying books.','One 20% part: J$180 ÷ 4 = J$45. Before equipment: 5 × J$45 = J$225.','J$225 is 3/4 of the original fund. One original quarter: J$225 ÷ 3 = J$75.','The original fund: 4 × J$75 = J$300.','Check forwards: J$300 − J$75 = J$225; J$225 − J$45 = J$180; 3/5 of J$180 = J$108.'],[bar('Original fund: 1/4 books',[1,1,1,1],['75','75','75','75'],1),bar('After books: J$225; 20% equipment',[1,1,1,1,1],['45','45','45','45','45'],1),bar('Final J$180 shared A:B = 2:3',[2,3],['A: J$72','B: J$108'],1)]),practice:task('A school spends 1/3 of a fund on books, then 25% of the remainder on equipment. The rest is shared A:B = 3:2. A receives J$90. Find the original fund.',300,'J$',['A is 3 parts worth J$90, so one ratio part is J$30.','The final remainder is 5 × J$30 = J$150.','J$150 represents 75% after equipment: 3 equal 25% parts.','One 25% part is J$150 ÷ 3 = J$50; before equipment: 4 × J$50 = J$200.','J$200 represents 2/3 of the original. One third is J$100.','Original fund: 3 × J$100 = J$300.','Check: J$300 → J$200 → J$150; 3/5 × J$150 = J$90.'],[bar('Original fund: books 1/3',[1,1,1],['100','100','100'],1),bar('After books: equipment 25%',[1,1,1,1],['50','50','50','50'],1),bar('Final: A:B = 3:2',[3,2],['A: J$90','B: J$60'],1)])}
];
// Structural models are shown first; calculated values appear only at the final reveal.
const initialModels = [
  [bar('48 books altogether',[1,3],['12 fiction','? non-fiction'],1)],
  [bar('80 counters = 5 equal parts',[1,1,1,1,1],['?','?','?','?','?'],3)],
  [bar('J$240 = 100%; shaded = 35% (each part is 5%)',Array(20).fill(1),Array(20).fill(''),7)],
  [bar('Red: 3 equal parts',[1,1,1],['?','?','?'],3),bar('Blue: 5 equal parts; total with red = 64',[1,1,1,1,1],['?','?','?','?','?'],5)],
  [bar('Whole = 5 parts; first 3 together = 54',[1,1,1,1,1],['?','?','?','?','?'],3)],
  [bar('Original = 100%; first 4 parts together = J$72',[1,1,1,1,1],['20%','20%','20%','20%','20%'],4)],
  [bar('Original: 120; 2/5 given away',[1,1,1,1,1],['?','?','?','?','?'],2),bar('Remainder becomes new whole; 1/4 used',[1,1,1,1],['?','?','?','?'],1)],
  [bar('Original fund: unknown; 1/4 for books',[1,1,1,1],['books','?','?','?'],1),bar('Remainder: unknown; 20% for equipment',[1,1,1,1,1],['20%','20%','20%','20%','20%'],1),bar('Final remainder: unknown; A:B = 2:3',[2,3],['A: ?','B: J$108'],1)]
];
lessons.forEach((lesson,i)=>{lesson.example.initialBars=initialModels[i];});
for (const type of ['example','practice']) lessons[3][type].bars.forEach(b=>{b.sharedUnit=true;});
initialModels[3].forEach(b=>{b.sharedUnit=true;});
lessons[7].example.bars[2].unitSegments = true;
lessons[7].practice.bars[2].unitSegments = true;
initialModels[7][2].unitSegments = true;
const assessment=[
{skill:'Fraction of a quantity',pre:['Find 3/4 of 60.',45],post:['Find 3/4 of 84.',63]},
{skill:'Percentage of a quantity',pre:['Find 35% of 180.',63],post:['Find 35% of 260.',91]},
{skill:'Ratio from a difference',pre:['A:B = 2:5. B has 24 more than A. How many do they have altogether?',56],post:['A:B = 2:5. B has 36 more than A. How many do they have altogether?',84]},
{skill:'Reverse fraction',pre:['3/5 of a quantity is 42. What is the whole?',70],post:['3/5 of a quantity is 66. What is the whole?',110]},
{skill:'Reverse percentage',pre:['A price is J$64 after a 20% reduction. Find the original price.',80],post:['A price is J$96 after a 20% reduction. Find the original price.',120]},
{skill:'Changing whole',pre:['There are 150 counters. 1/3 are removed, then 20% of the remainder are removed. How many remain?',80],post:['There are 210 counters. 1/3 are removed, then 20% of the remainder are removed. How many remain?',112]},
{skill:'Combined reverse steps',pre:['A fund spends 1/4 on books, then 20% of the remainder on equipment. The rest is shared A:B = 2:3. B gets J$72. Find the original fund.',200],post:['A fund spends 1/4 on books, then 20% of the remainder on equipment. The rest is shared A:B = 2:3. B gets J$144. Find the original fund.',400]}
];
const curriculum = {
  title: 'Jamaica NSC Grades 4–6 · teacher development',
  sourceTitle: 'Ministry of Education: NSC Grades 4–6 Essential Objectives, 2nd edition (2021)',
  sourceUrl: 'https://educate.gov.jm/wp-content/uploads/2021/10/2nd-Edition_-Curriculum-Analysis-Essential-Objectives-Grades-4-6-_-Sept-2021.pdf',
  updateUrl: 'https://pep.moey.gov.jm/2026/01/15/general-bulletin-141-2025-the-use-of-modified-national-standards-curriculum-for-the-2025-2026-academic-year-grades-1-9/',
  notice: 'This is a teaching-method map to the 2021 NSC essential objectives, not a complete PEP preparation course or Ministry endorsement. Confirm Mason Hall’s current grade plans and 2026–2027 guidance before using it as an assessment coverage map. The published modified-curriculum notice linked below concerns 2025–2026.',
  revision: 'grades-4-6-2026-11-08'
};
const alignment = [
  {grade:'Grades 4–6 foundations',scope:'Classroom foundation',section:'Grade 4 · Algebra / word problems',objective:'Select operations and represent word problems.',application:'Start with counters, equal groups and comparison language. Connect each physical group to a labelled bar before drawing abstract models.',prompt:'Which bar is the whole? Which amount is known? Where is the difference?',tools:['bar-models','fractions']},
  {grade:'Grade 5 focus · Grade 4 preparation',scope:'Classroom core',section:'Grade 5 · Number',objective:'Solve fractional-number problems and multiply proper fractions.',application:'For Grade 4 preparation, use halves and quarters with objects. In Grade 5, move from one equal part to several parts, naming the whole each time.',prompt:'Why do we divide by the denominator before selecting the numerator’s parts?',tools:['bar-models','fractions-practice']},
  {grade:'Grade 6',scope:'Classroom core',section:'Grade 6 · Number, Term 2 Unit 1',objective:'Find percentages of quantities, money and measures.',application:'Connect 50% to one half and 25% to one quarter before composing 35% or 15%. All money in this course is Jamaican dollars (J$).',prompt:'Can you show the same amount as a fraction and a percentage of the whole?',tools:['bar-models','percentages-real-world']},
  {grade:'Grade 6',scope:'Core example · extension challenge',section:'Grade 6 · Number, Term 2 Unit 1',objective:'Compare quantities using ratios and solve equivalent-ratio problems.',application:'Teach ratio from a total first. The independent difference-given problem is a teacher extension; use it with pupils only when equal-unit reasoning is secure.',prompt:'Does the known amount represent all the parts or only the extra parts?',tools:['bar-models','ratio-proportion']},
  {grade:'Grades 5–6 application',scope:'Teacher extension',section:'Grade 5 · Number / Grade 6 · Algebra',objective:'Connect fractional operations with missing-value problems.',application:'Use a missing half or quarter as the classroom bridge. The remaining-ribbon problem extends that reasoning; it is not a separately verified PEP objective.',prompt:'Which group of parts does the known amount belong to?',tools:['bar-models','fractions-practice']},
  {grade:'Grade 6',scope:'Core objective · extension contexts',section:'Grade 6 · Number, Term 2 Unit 1',objective:'Find a whole from a known percentage, in multiples of five.',application:'Start with a known 25%, 50% or 75%. Discount and service-charge contexts add teacher challenge; check pupil readiness before using them.',prompt:'What percentage does the stated amount represent? Is it the original 100%?',tools:['bar-models','percentages-real-world']},
  {grade:'Grade 6 application',scope:'Teacher extension',section:'Grade 6 · Number, Term 3 Unit 1',objective:'Represent and solve two-step problems; apply percentages.',application:'Use the simpler two-operation classroom bridge below first. The worked example and challenge deliberately extend this into successive operations.',prompt:'After the first action, what has become the new whole?',tools:['bar-models']},
  {grade:'Grades 4–6 teacher development',scope:'Teacher extension',section:'Builds on Grade 6 · Number',objective:'Combines ratio, percentages and fractional operations.',application:'This is a teacher reasoning challenge, not an asserted Grade 6 or PEP requirement. Adapt it into one relationship at a time for pupils.',prompt:'Can you explain each intermediate whole without starting with a formula?',tools:['bar-models','ratio-proportion']}
];
lessons.forEach((lesson,i)=>{lesson.alignment=alignment[i];});
lessons[0].bridges = [
  task('Share 24 pencils equally among 4 groups. How many pencils are in each group?',6,'pencils',[
    'Build 4 equal groups with counters, then draw a bar split into 4 equal parts.',
    'Label the full bar 24 pencils; each part represents one group.',
    'Four equal groups make 24, so one group is 24 ÷ 4 = 6 pencils.',
    'Check: 4 × 6 = 24.'
  ],[bar('24 pencils: 4 equal groups',[1,1,1,1],['6','6','6','6'],1)]),
  task('One class collects 18 books. Another collects 7 more. How many books does the second class collect?',25,'books',[
    'Draw a bar of 18 for the first class.',
    'For the second class, draw the same 18 and an extra part labelled 7.',
    'The second class has 18 + 7 = 25 books.',
    'Check: the difference between 25 and 18 is 7.'
  ],[bar('First class',[18],['18'],0),bar('Second class: 7 more',[18,7],['same 18','extra 7'],1)])
];
lessons[0].bridges[1].bars.forEach(b=>{b.sharedUnit=true;});
lessons[1].bridges = [task('Find 1/4 of 20 counters.',5,'counters',[
  'Share the 20 counters into 4 equal groups.',
  'Draw 4 equal parts for the whole bar and label the whole 20.',
  'One quarter is one part: 20 ÷ 4 = 5 counters.',
  'Check: 4 groups of 5 make 20.'
],[bar('20 counters: one quarter selected',[1,1,1,1],['5','5','5','5'],1)])];
lessons[2].bridges = [task('Find 25% of J$200.',50,'J$',[
  'The whole J$200 represents 100%.',
  'Four equal 25% parts make 100%; 25% is 1/4.',
  'One part is J$200 ÷ 4 = J$50.',
  'Check: 4 × J$50 = J$200.'
],[bar('J$200 = 100%',[1,1,1,1],['J$50','J$50','J$50','J$50'],1)])];
lessons[4].bridges = [task('1/2 of a collection is 12 counters. How many counters are in the whole collection?',24,'counters',[
  'Draw 2 equal parts for the whole collection.',
  'One part is the known half: 12 counters.',
  'Both parts together give 12 × 2 = 24 counters.',
  'Check: half of 24 is 12.'
],[bar('Whole collection: 2 equal halves',[1,1],['12','12'],1)])];
lessons[5].bridges = [task('25% of a book fund is J$50. Find the whole fund.',200,'J$',[
  'Draw the whole as 4 equal 25% parts.',
  'The known J$50 represents one part.',
  'The whole fund is 4 × J$50 = J$200.',
  'Check: 25% of J$200 is J$50.'
],[bar('Whole fund: 100%',[1,1,1,1],['J$50','J$50','J$50','J$50'],1)])];
lessons[6].bridges = [task('There are 40 pencils. 1/4 are given away. How many remain?',30,'pencils',[
  'The whole is 40 pencils, split into 4 equal parts.',
  'Find the part given away: 40 ÷ 4 = 10 pencils.',
  'Subtract from the whole: 40 − 10 = 30 pencils remain.',
  'Check: 10 + 30 = 40.'
],[bar('40 pencils; one quarter given away',[1,1,1,1],['10','10','10','10'],1)])];
const assessmentScopes = ['Classroom core','Classroom core','Teacher extension','Teacher extension','Core objective in an extension context','Teacher extension','Teacher extension'];
assessment.forEach((item,i)=>{item.scope=assessmentScopes[i];});
const api={lessons,assessment,curriculum,version:1};
if(typeof module==='object'&&module.exports)module.exports=api;else root.KaizenBarCourseData=api;
})(typeof window==='object'?window:globalThis);
