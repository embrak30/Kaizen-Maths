# Stripe Payment Setup

Kaizen Maths uses Supabase for sign-in/access and Stripe for payment.

## 1. Supabase

Run `supabase-schema.sql` in the Supabase SQL editor again. It uses `add column if not exists`, so it is safe to run on the existing project.

The important profile fields are:

- `role`
- `stripe_customer_id`
- `stripe_subscription_id`
- `subscription_status`
- `plan_key`
- `current_period_end`
- `billing_updated_at`

When Stripe confirms an active subscription, the webhook sets the user role to `pro`.

## 2. Stripe Products

Create two recurring prices in Stripe:

- Kaizen Maths Teacher Monthly: £7.99/month
- Kaizen Maths Teacher Annual: £69/year

Copy the two Stripe price IDs. They look like `price_...`.

School pilot access is manual for now, suggested from £299/year. Set school users to `school` in Supabase/Admin after arranging access.

## 3. Vercel Environment Variables

Add these in Vercel Project Settings -> Environment Variables:

```text
PUBLIC_SITE_URL=https://kaizenmaths.com
STRIPE_SECRET_KEY=sk_live_or_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_TEACHER_MONTHLY=price_...
STRIPE_PRICE_TEACHER_ANNUAL=price_...
KAIZEN_SUPABASE_URL=https://your-project.supabase.co
KAIZEN_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Use Stripe test keys while testing.

## 4. Stripe Webhook

In Stripe, create a webhook endpoint:

```text
https://kaizenmaths.com/api/stripe-webhook
```

Subscribe to these events:

- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`

Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

## 5. Test Flow

1. Sign in to Kaizen Maths.
2. Open `#/upgrade`.
3. Choose Monthly or Annual.
4. Complete Stripe Checkout using test card `4242 4242 4242 4242`.
5. Return to the site.
6. Check Supabase `profiles`: the user should have `role = pro`.

School licences can remain manual for now: set the profile role to `school` or manage access directly in Supabase/Admin.
