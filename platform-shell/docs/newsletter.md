# Kaizen Maths newsletter — Brevo setup

Admin → Newsletter contains a plain-text editor, featured-tool picker, HTML email
preview, saved drafts, Brevo preparation, a test to the signed-in admin's own
email, manual live sending and delivery summaries. The starter draft features
the Multiplication Methods Explorer. Sender proposed by the owner:
**embark30@gmail.com**, displayed as **Kaizen Maths**. No sending schedule is
created. No production migrations, keys, lists or campaigns were changed while
building this feature; automated tests use disposable/local services.

## Activate in this order

1. **Brevo:** add and verify `embark30@gmail.com` as a sender. Confirm that Brevo
   marks it active. If Brevo cannot use that address, choose a verified sender
   on a domain you control; keep the Gmail address as your contact/reply address
   only after adjusting the server configuration. Review Brevo's current account
   limits before sending. This code does not purchase a plan.
2. Create a dedicated **static list** for Kaizen newsletter subscribers. Do not
   select the general customer/contact list. Create a Brevo-hosted signup form
   that adds contacts to this list **only after double-opt-in confirmation**.
   State the sender, teaching-resource/newsletter purpose and unsubscribe choice
   clearly. No pre-ticked consent or forced signup. Retain consent evidence in
   Brevo, including signup/confirmation records and the wording/form version.
   Existing Kaizen/Google accounts are **not** automatically subscribed. The site
   does not import profile emails, purchase lists, or resubscribe blocked contacts.
3. Review the newsletter privacy text (`#/trust/privacy`) and your Brevo data
   processing arrangements. For the initial launch, turn off email open and click
   tracking in Brevo unless you have established the appropriate notice/consent
   for your use. Delivery/bounce/unsubscribe summaries are sufficient initially.
4. In **staging Supabase**, back up and run
   `migrations/20261127_newsletter.sql` after the base schema. It creates only
   `newsletter_drafts`. Test with an admin, a teacher and a signed-out visitor.
   Admins may read drafts; all browser inserts/updates/deletes are revoked.
   Writes go through the authenticated Vercel endpoint using the server service
   role. Repeat in production only after staging checks pass.
5. Add these **server-only Vercel environment variables**. Never put the API key
   or service-role key in `auth-config.js`, browser JavaScript or this repository:

   | Variable | Value |
   | --- | --- |
   | `BREVO_API_KEY` | Your Brevo API key, entered directly in Vercel |
   | `BREVO_SENDER_EMAIL` | `embark30@gmail.com`, after verification |
   | `BREVO_SENDER_NAME` | `Kaizen Maths` |
   | `BREVO_REPLY_TO` | Optional: `embark30@gmail.com`; defaults to the sender |
   | `BREVO_NEWSLETTER_LIST_ID` | The dedicated confirmed-consent list's numeric ID |
   | `BREVO_NEWSLETTER_SIGNUP_URL` | The hosted HTTPS double-opt-in signup form URL |
   | `BREVO_NEWSLETTER_POSTAL_ADDRESS` | Your genuine business postal address |
   | `PUBLIC_SITE_URL` | `https://www.kaizenmaths.com` |
   | `BREVO_NEWSLETTER_LIST_CONFIRMED` | `true` only after checking list/form/consent settings |
   | `BREVO_NEWSLETTER_SEND_ENABLED` | Keep `false` for initial setup and tests |

   Existing server Supabase URL and service-role variables are reused, as in the
   billing APIs. The new function has an explicit 60-second execution budget in
   `vercel.json`; other function configurations remain unchanged.
6. Deploy the matching frontend and API. Open **Admin → Newsletter**. Check the
   connection checklist, save the draft, prepare it in Brevo and send a test to
   your signed-in admin email. Brevo may require that address to be in its test
   list. The test endpoint explicitly passes one address and never falls back to
   the entire test list. Check the real email on desktop and mobile, all links,
   sender/reply address, footer and unsubscribe flow.
7. Run a small opted-in staging campaign. Verify duplicate-click protection,
   suppression/unsubscribe handling and reports. Only then enable
   `BREVO_NEWSLETTER_SEND_ENABLED=true` in the intended production environment
   and redeploy. Each send still requires a successful test of the current
   revision within 24 hours and the explicit review checkbox. No cron or
   automatic recurring emails are enabled. Decide frequency after reviewing
   the first newsletter and subscriber expectations.

## Where teachers join

`#/newsletter`, linked from the shared footer, account/upgrade page and Privacy
Basics. It opens the configured Brevo form without passing profile data or
pre-filling a pupil email. The public endpoint exposes only the signup URL.
Without a configured form/API, the page says signup is not open. It does not
pretend to have subscribed anyone. Brevo is authoritative for consent, global
blocking, unsubscribes and delivery statistics; Supabase stores no subscriber
mailing list. Account deletion alone does not delete the separate Brevo contact;
handle newsletter access/deletion requests in Brevo as well.

## Draft workflow and recovery

Saving changes increments the revision and invalidates its preparation/test.
Preparing creates or updates a Brevo **draft**, never a scheduled send. Brevo
campaign IDs and revision fingerprints prevent sending a different provider
revision or recipient list from the one tested. Do not edit/schedule/send the
same campaign directly in Brevo while managing it in Kaizen. If changed, prepare
and test again. Subscriber membership can change between a test and sending;
the dedicated current list and Brevo suppression are used at send time.

Atomic status claims prevent concurrent prepare/test/send requests. A provider
or database failure after an external operation moves the draft to `needs_review`
when possible; an interrupted function may leave it `preparing`, `testing` or
`sending`. These states are locked, not automatically retried. Check the mapped
campaign in Brevo before making another draft or any manual resend. Do not
blindly change the status to `tested` or `draft` in SQL. If Brevo accepted a send
but the response was lost, resending could duplicate the email. Delivery status
uses the provider report; `sent` in Kaizen means the send request was accepted,
not that every recipient received it. Brevo remains the delivery authority.

No subscriber identities are exposed in admin statistics. The first version
shows sent, delivered, hard-bounce and unsubscribe counts; not efficacy scores.
Do not place pupil names, private school information or sensitive personal data
in newsletter copy. Drafts reference admin identities; auth-user deletion clears
those references. Sent drafts are retained until an administrator follows an
agreed retention/deletion process; establish that retention period for your
operation. Withdrawn newsletter consent must remain suppressed in Brevo, rather
than being overwritten from another contact source.

## Checks and rollback

- `node tests/newsletter-api.test.cjs`: mocked provider, auth, payload safety,
  gates, revisions, self-only tests, concurrency and uncertain delivery. No live
  provider calls or emails.
- `KAIZEN_PGLITE_MODULE=<pglite-package> node tests/newsletter-db.test.cjs`:
  disposable PostgreSQL, migration idempotence, RLS and write restrictions.
- `KAIZEN_MARKETING_NODE_MODULES=<jsdom-folder> node tests/newsletter-ui.test.cjs`:
  drafting, preview, gates, feature picker, reports and signup failure states.
- Existing marketing and resource-navigation tests cover shell regression.

To pause sending, set the server send flag false and redeploy; pause any campaigns
already queued directly in Brevo. To close new signup, clear the form URL and
redeploy. Existing Brevo unsubscribe links must continue to work. The other
Kaizen tools, billing and account access do not depend on these tables or keys.

## References

- [Brevo campaign API](https://developers.brevo.com/reference/create-email-campaign)
- [Brevo test emails](https://developers.brevo.com/reference/send-test-email)
- [Brevo unsubscribe handling](https://help.brevo.com/hc/en-us/articles/9741388688402-Do-I-need-to-add-an-unsubscribe-link-to-my-emails)
- [ICO electronic mail marketing guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/electronic-and-telephone-marketing/electronic-mail-marketing/)

The opt-in-only design avoids assuming legacy registrations meet the soft-opt-in
conditions. This is an implementation description, not legal certification.
