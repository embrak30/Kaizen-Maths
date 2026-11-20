# Teacher usage reporting

Admin → Usage shows active teacher accounts, visits, active days, tool opens and estimated active seconds. Sort teachers by visits, tool opens or active time; filter by 7/30/90 days and current school membership, search accounts, inspect a teacher's tools and recent visits, and download the visible teacher table as CSV. Admin accounts are excluded by default.

This is a first-party Supabase feature. No paid analytics service or new production dependency is required. No production schema or collection has been activated by the repository change.

## Activation

1. Review the updated Privacy Basics page (`#/trust/privacy`) and the optional reporting choice. The business owner should confirm the purpose, privacy contact and retention period. The current design collects only after the signed-in teacher allows it; it is separate from email marketing permission.
2. Back up the database. In staging, apply `migrations/20261120_admin_usage.sql` after the existing base schema. It relies on `public.profiles`, `public.schools`, `auth.users` and the existing `public.is_admin()` function.
3. Enable Supabase's pg_cron extension through its supported database extension settings if not already enabled. Schedule the daily purge as the database operator:
   ```sql
   select cron.schedule(
     'kaizen-teacher-usage-retention',
     '15 3 * * *',
     'select public.purge_teacher_usage()'
   );
   ```
   Check for an existing job with that name before scheduling it. Confirm it succeeds in `cron.job_run_details`. The purge removes sessions older than 180 days and cascades their tool visits. Keep consent preferences while the account exists, so declining is remembered. Deleting an auth account cascades all usage records and its preference.
4. Enable `usageReportingEnabled: true` in `auth-config.js` in staging. Sign in as two separate test teachers and an admin. Verify opting in, opting out, attribution, tool activity, hidden tabs, idle expiry, the school filter and admin isolation. A non-admin must not be able to call `admin_usage_report` or read other accounts' raw usage.
5. Apply the verified migration and retention job in production, then deploy the matching code and enable the flag. Existing users will be asked to choose. There is no backfill of prior activity.

The disabled flag is intentional: deploying the frontend alone does not collect anything. A missing migration leaves the admin panel with a setup message, and teaching tools continue to work.

## What the numbers mean

- **Sign-in:** the latest `auth.users.last_sign_in_at`, read only inside the admin RPC. It is not an OAuth-login count, and is not limited to the report window. Supabase authentication stays authoritative.
- **Visit:** a browser-tab session renewed after 30 minutes without recorded active use. Reloading a tab within that interval reuses its session ID. Separate tabs can create separate visits; do not equate visits to sign-ins or distinct people.
- **Active day:** UTC date on which a visit started. Daily bars use the same definition.
- **Tool open:** a new visit to a registered tool rendered in the main Kaizen workspace's actual tool iframe. Returning to it creates another open. A refresh can create another tool open within the same site visit.
- **Active time:** heartbeat estimates while the page is visible and the user interacted within the last 90 seconds. Heartbeats are at most every 15 seconds; elapsed credit is bounded by database time, request limits and a per-account lock/watermark across tabs. Tool time is part of site time, not additional time to add to it. Passive reading beyond 90 seconds is deliberately undercounted. Closing a page may lose up to one heartbeat; there is no offline replay or unload tracking.
- Windows select sessions that **started** in the last 7/30/90 days. A visit crossing the cutoff is not included. Current school membership controls school filters; the session stores its school at creation for future historical work.
- Only consenting, signed-in teachers in the main workspace are measured. Standalone tool URLs and pupil-task screens are excluded. Unrecorded activity is not evidence of non-use.
- Rankings are descriptive, not a teaching-quality or efficacy score. They are visible to Kaizen admins, not other teachers or school users.

## Data and controls

Three RLS-protected tables: `usage_preferences`, `usage_sessions`, `usage_tool_visits`. Profile/name/email/school and latest sign-in are joined for reporting; they are not copied into telemetry rows. Browser inserts/updates are revoked. Security-definer functions use authenticated identity, explicit role checks, a fixed search path and server timestamps. There is no client-supplied user ID or duration timestamp. Session/visit ownership and visit-to-session/tool consistency are checked. Requests are capped per account to 60 new tab sessions and 600 tool opens an hour.

No pupil answers, worksheet content, keys pressed, pointer coordinates, IP addresses, referrers or screen recordings are stored by this feature. The iframe bridge sends a throttled activity signal only, and the parent validates both its origin and the actual iframe window. Session storage is used only after opt-in; no anonymous analytics identifier is created.

Supabase's normal platform/security logs are separate. Account deletion in `auth.users` cascades usage; deleting only a profile is not the same operation. Admin CSV exports contain teacher personal information and should be kept only as needed. The retention job cannot delete exported files.

## Verification and rollback

- `tests/admin-usage-db.test.cjs`: disposable embedded PostgreSQL, using `KAIZEN_PGLITE_MODULE` or the temporary `/tmp/kaizen-usage-db/node_modules/@electric-sql/pglite`. No production connection. Checks migration idempotence, RLS, owner spoofing, opt-in/out, admin-only reporting, duration limits, overlap and deletion.
- `tests/usage-client.test.cjs`: fake clock/auth/RPC in jsdom; inactive/hidden/pupil/sign-out/withdrawal paths and iframe validation.
- `tests/admin-usage-ui.test.cjs`: filtering, detail, escaping, setup state and failure behaviour.
- Existing marketing and resource-navigation tests cover shell regressions.

To pause collection, set the flag false and deploy. Also revoke execute on `public.record_teacher_usage(uuid,uuid,text,integer)` from `authenticated` to stop already-open old clients immediately; restore the grant when reactivating. Keep the retention job running. Do not drop tables until any required records have been reviewed/exported and deletion is authorized. The rest of the application does not depend on these tables.

Privacy design references: [ICO data minimisation](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/data-minimisation/) and [right to be informed](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/). These references informed the limited fields and clear teacher choice; they are not a claim of legal certification.
