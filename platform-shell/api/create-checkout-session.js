const {
  getSignedInUser,
  planPriceId,
  readJsonBody,
  sendJson,
  siteUrl,
  stripeClient,
  supabaseAdmin
} = require("./_billing-utils");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Method not allowed." });
  }

  try {
    const supabase = supabaseAdmin();
    const { user, error: userError } = await getSignedInUser(req, supabase);
    if (userError) return sendJson(res, 401, { error: userError });

    const body = await readJsonBody(req);
    const plan = body.plan === "annual" ? "annual" : "monthly";
    const priceId = planPriceId(plan);
    if (!priceId) return sendJson(res, 500, { error: `Missing Stripe price id for ${plan} plan.` });

    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .maybeSingle();

    const stripe = stripeClient();
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: profile?.stripe_customer_id || undefined,
      customer_email: profile?.stripe_customer_id ? undefined : user.email,
      client_reference_id: user.id,
      success_url: `${siteUrl()}/#/upgrade?checkout=success`,
      cancel_url: `${siteUrl()}/#/upgrade?checkout=cancelled`,
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      metadata: {
        user_id: user.id,
        plan
      },
      subscription_data: {
        metadata: {
          user_id: user.id,
          plan
        }
      },
      allow_promotion_codes: true
    });

    return sendJson(res, 200, { url: session.url });
  } catch (error) {
    console.error("Checkout session error:", error);
    const message = String(error?.message || "");
    const type = String(error?.type || "");
    const code = String(error?.code || "");

    if (message.startsWith("Missing ")) {
      return sendJson(res, 500, { error: `Checkout is not fully configured. ${message}.` });
    }

    if (type === "StripeAuthenticationError") {
      return sendJson(res, 500, {
        error: "Stripe rejected the secret key. Check that STRIPE_SECRET_KEY is a valid live key in Vercel, then redeploy."
      });
    }

    if (code === "resource_missing" || /No such price/i.test(message)) {
      return sendJson(res, 500, {
        error: "Stripe could not find this price. Check that the live price ID in Vercel matches the live Stripe secret key, then redeploy."
      });
    }

    if (/testmode|live mode|livemode|sandbox/i.test(message)) {
      return sendJson(res, 500, {
        error: "Stripe mode mismatch. Check that all Stripe keys, price IDs, and webhook secrets are either all live or all sandbox."
      });
    }

    if (type.startsWith("Stripe")) {
      return sendJson(res, 500, {
        error: `Stripe could not start checkout: ${message}`
      });
    }

    return sendJson(res, 500, { error: "Could not start checkout. Check the Vercel Function log for the checkout error." });
  }
};
