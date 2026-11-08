# Teaching with Bar Models — Mason Hall pilot

Open Kaizen University → Teaching with Bar Models. Route: `#/bar-modelling-course`.

Eight lessons cover reading part–whole relationships, fractions, percentages, ratio from total/difference, reverse fractions, reverse percentages, changing reference wholes, and a combined reverse multi-step problem. Each has a worked example and an independent challenge. Structural diagrams appear before computed labels; each calculation step is revealed separately.

The starting check is recorded once before lessons. Seven parallel final items cover the same skills using new quantities. The original baseline and all final attempts are retained. A numerical score of 6/7 meets the pilot knowledge threshold; written explanations and classroom practice require human review. This is not an accredited or automatically assessed teaching qualification.

Optional videos: Admin → Kaizen University videos → Teaching with Bar Models — Mason Hall pilot. Eight `bar-course-*` slots reuse the existing `university_videos` service. No videos have been invented or uploaded. These slots do not become prerequisites in the existing site certification. Written lessons work without videos.

Progress is browser-local and partitioned by signed-in user ID (`kaizen:bar-modelling:v1:*`). The course says this explicitly. The download produces a readable text record with attempts, scores, confidence, practice responses, solution-view flags and reflection. It does not transmit responses. Clearing browser storage loses the local record; downloads are backups, not import files. No Supabase schema changes were made. This course currently has a Mason Hall pilot label, not school-restricted enrolment or a central reporting integration.

Before using records for a formal evaluation, agree participant information, participation/sharing arrangements, a facilitator marking protocol, and follow-up timing. Paper diagrams need to be reviewed alongside text responses. The course prompts users not to enter identifying pupil information. Do not interpret score/confidence changes as evidence of causal impact.

Content: `assets/courses/bar-modelling-data.js`. UI: `assets/courses/bar-modelling.js` and CSS. Integration: `app.js`, `index.html`; regenerate static shared-shell pages with `scripts/marketing/build.cjs` when changing shared includes.

Checks: `tests/bar-modelling-course.test.cjs` and `tests/marketing-audit.test.cjs` (jsdom).
