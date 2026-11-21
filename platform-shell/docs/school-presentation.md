# Make It Count school presentation

Open `#/school-presentation`, or select **School Presentation** from **Make It Count** or **For Schools**. The six-section presentation is public; no admin sign-in is needed to open it. Sign in before the meeting if using access-controlled live teaching tools.

1. Select **Open presenter notes** before presenting. Keep the notes in a separate window from the content you share. They follow the current section through same-origin BroadcastChannel messaging; manual section navigation still works if messaging is unavailable.
2. Select **Present** for a clean full-screen view. A focus-mode fallback is provided when the browser cannot enter native fullscreen. Use **Exit presentation** or Escape to return to the website navigation.
3. Use **Previous**, **Next**, the six section buttons, or the left/right arrow keys. Home and End select the first/last section. Controls do not auto-advance.
4. In the teaching demonstration, select **Primary** or **Secondary**. Reveal the worked example one step at a time. The primary example is a reverse fraction problem; the secondary example connects equal groups to a linear equation.
5. Live-tool links open separate tabs, preserving the presentation position. If sharing a browser tab in the meeting, switch the shared tab for the live demonstration and switch back afterwards. Keep the presenter notes out of the shared view.
6. The final section links to the existing school-interest form and can copy its public link. No enquiries are submitted or emails sent by the presentation itself.

The script follows the agreed six-part pitch: the classroom need; professional learning connected to Kaizen resources; a short demonstration; onboarding and the proposed six-week initial programme; feedback and development; school access or a supported partnership. Pricing, dates and continued access are explicitly agreed before enrolment. There are no invented fees, testimonials, school endorsements or attainment claims.

The existing sidebar stays in place in ordinary view. Only the explicit Present action hides it. The notes URL (`?view=notes`) is a presentation convenience, not a private document: do not add confidential school information to the module.

Implementation: `assets/site/school-presentation.js` and `.css`, with the existing logo in `assets/brand/`. The main application registers the route, page title and entry links. No database or paid service is required. `tests/school-presentation.test.cjs` verifies navigation, both demos, real tool destinations, stable fullscreen DOM, notes synchronisation, URL validation and cleanup when leaving the page.
