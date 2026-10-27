# heycatch implementation record — 27 October 2026

Source: https://app.heycatch.ai/audit/hck_pk_GwaO9Lwwk5Lo29_ugMezSlRLxf1lu3zZ?surface=website

All six dimension detail panels and the complete action plan were read before editing. Changes follow Quick wins, then Do this quarter, then the repo-only headline task under Bigger bets. No database or payment configuration was changed, no campaign was sent, and no production deployment was performed.

## Exact baseline findings and disposition

| Finding | Original score | Original status | Work / disposition |
|---|---|---|---|
| D1.1 Hook | 3/6 | Partial | Buyer and category in headline; remove dual-brand eyebrow; align title. |
| D1.2 Pain match | 4/5 | Pass marginal | Existing pain copy retained. The detail panel corrects its initial “4/6” text to “actually 4/5”. The claimed 86% time-burden statistic needs its original study, scope and permission before use; not invented. |
| D1.3 JTBD coverage | 3/4 | Pass marginal | Department consistency now names shared planning and intervention use. |
| D1.4 Objection handling | 2/3 | Partial | Six-question FAQ; alignment links; honest comparison pages. |
| D1.5 Desired-result visualization | 2/3 | Partial | Existing actual Level 1 substitution PDF and preview beside gallery. |
| D1.6 Audience language | 3/4 | Pass marginal | Replace internal “New Direction” phrasing; teacher task language in hero. |
| D2.1 5-second comprehension | 5/7 | Pass marginal | Buyer/category headline and one next step. |
| D2.2 CTA hierarchy | 2/5 | Partial | One button in hero and final CTA; programme becomes text link; partner action stays in relevant section. |
| D2.3 Visual hierarchy and scroll flow | 3/5 | Partial | Workflow/teacher benefits before programme explanation. |
| D2.4 Friction and navigation | 2/4 | Partial | Seven primary choices on desktop/mobile; topics/reference in expandable library directory. |
| D2.5 Mobile experience | 2/4 | Partial, capped | Responsive layout and real 390px iframe/browser check, menu opened successfully. |
| D2.B Scope honesty bonus | +1/2 | Bonus | Explicit adult teacher/tutor scope; not a pupil self-study subscription. |
| D3.1 Quantity proof | 2/4 | Partial | Approved-only adoption counter beside coverage, requires actual count and date. |
| D3.2 Story proof | 2/5 | Partial | Approved full name/photo/school/quote overrides and pricing testimonial section prepared; owner evidence required. Existing quotes not embellished. |
| D3.3 Founder-led trust | 2/4 | Partial, capped | Crawlable story from existing biography; approved name/photo/professional link byline ready, identity required. |
| D3.4 Transactional trust | 2/4 | Partial | Trial end, no automatic charge, renewal, Stripe, terms and data information. No invented money-back promise. |
| D3.5 Third-party and recency | 0/3 | Fail | Link genuine YouTube channel; dated approved external mention slot next to video. Independent mention still required. |
| D4.1 Location and accessibility | 1/2 | Partial | Real /pricing public page and nav link. |
| D4.2 Tier and offer design | 1/4 | Partial | Audience-named plans, monthly/yearly periods, free/trial/paid/school access table. |
| D4.3 Paywall and conversion mechanics | 1/5 | Partial | Limits, billing periods, annual saving £30.88, lower-yearly-cost emphasis. No fabricated most-popular label or promotional discount. |
| D4.4 Pricing vs competitors | 1/4 | Partial | Public existing prices; scoped comparisons to current official competitor pages. |
| D4.B Comparison-table bonus | +0/1 | Bonus | Public feature/access comparison table. |
| D5.1 Title and meta | 2/3 | Partial | Teacher/category title and distinct static page metadata. |
| D5.2 Heading structure | 2/2 | Pass | Existing heading hierarchy retained; one homepage h1. |
| D5.3 Indexable content/linking | 1.5/4 | Partial | robots, sitemap, prerendered actual home content, two public /vs pages. |
| D5.4 Page speed | 3/3 | Pass | No new browser framework or analytics; reuse preview asset and lazy loading. jsdom is build/test-only. No claim of a new performance benchmark. |
| D5.5 Structured data | 1/3 | Partial | Organization, SoftwareApplication/offers, matching FAQ schema; llms.txt. |
| Brief fit | 8/10 | Pass | No separate brief-fit rewrite; preserve product and proposed-programme distinction. |

## Owner inputs (unpublished)

Edit `assets/site/marketing-proof.js` only with approved evidence; empty/unapproved records render nothing.

- Founder: real publication name, permissioned photo and professional social URL. Existing experience/location biography is reused, not expanded.
- Testimonials: obtain full names, schools/organisations, photos, exact approved quotes and any genuine measured result from Levi, Sally and Daniel. Match the existing Supabase `slot_id`. Do not turn an estimate into a measured number.
- Adoption: a verified aggregate, definition, exclusions for tests/staff and an as-of date. Update monthly; do not derive from the proposed Jamaica pilot.
- External mention: a real independent review/community/newsletter URL, date, approved excerpt and title. Own YouTube presence is not independent validation.
- Pricing: confirm existing displayed £9.99/month, £89/year and school from £299/year match production Stripe. Confirm tax treatment and any refund policy before making additional promises. The older Stripe setup guide gives different numbers; payment configuration is deliberately untouched.
- D1.2: original source for the audit's 86% workload statistic. Omitted until sourced.

## Build and verify

Install development dependencies using the project's normal package manager. Run `npm run build:marketing` and `npm run test:marketing` (or the equivalent package-manager commands). These are local build/test tasks, not sending or deployment tasks. Regenerate committed HTML whenever pricing, FAQs, proof or relevant homepage copy changes.

The build shares pricing and FAQs between the application and static pages. It prerenders the real application home with no network, session, or customer records. Live admin content still hydrates normally; authorised custom hero edits are retained, with only exact old defaults migrated. Deploying updated Supabase-only copy does not automatically refresh static snapshots: regenerate before deployment. Existing auth/checkout API handlers are unchanged.

Exact Vercel rewrites add /pricing, /our-story, /vs/drfrostmaths and /vs/mathletics without changing hash routing, API routes or tool URLs. The sitemap deliberately contains real public URLs, not hash fragments or private workspace pages. No A/B-test or analytics infrastructure was added; the audit's target metrics still require the separately discussed measurement work.

## Comparison sources checked 27 October 2026

- https://www.drfrost.org/
- https://www.drfrost.org/pricing — £650 + VAT/UK school/year; includes teacher/student accounts; 60-day trial.
- https://www.mathletics.com/uk/ — school quote route; pupil activities, games, automatic marking and reporting.

Comparisons are scoped and sourced, not claims that Kaizen is universally better. Provider details can change.
