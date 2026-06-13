const {
  readRawBody,
  sendJson,
  stripeClient,
  supabaseAdmin
} = require("./_billing-utils");

function subscriptionRole(status) {
  return ["active", "trialing"].includes(status) ? "pro" : "free";
}

async function updateProfileForSubscription(supabase, subscription, extra = {}) {
  const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id;
  if (!customerId) return;

  const { data: existing, error: lookupError } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();

  if (lookupError) throw lookupError;
  if (!existing) return;

  const nextRole = subscriptionRole(subscription.status);
  const protectedRole = ["admin", "school"].includes(existing.role);
  const shouldChangeRole = !protectedRole && (nextRole === "pro" || existing.role === "pro");

  const update = {
    stripe_customer_id: customerId,
    stripe_subscription_id: subscription.id,
    subscription_status: subscription.status,
    plan_key: subscription.metadata?.plan || extra.plan || null,
    current_period_end: subscription.current_period_end ? new Date(subscription.current_period_end * 1000).toISOString() : null,
    billing_updated_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  if (shouldChangeRole) update.role = nextRole;

  const { error } = await supabase
    .from("profiles")
    .update(update)
    .eq("id", existing.id);
  if (error) throw error;
}

async function updateProfileForCheckout(supabase, stripe, session) {
  const userId = session.metadata?.user_id || session.client_reference_id;
  if (!userId) return;

  const subscription = session.subscription
    ? await stripe.subscriptions.retrieve(session.subscription)
    : null;

  const update = {
    stripe_customer_id: typeof session.customer === "string" ? session.customer : session.customer?.id,
    stripe_subscription_id: subscription?.id || (typeof session.subscription === "string" ? session.subscription : null),
    subscription_status: subscription?.status || "active",
    plan_key: session.metadata?.plan || subscription?.metadata?.plan || null,
    current_period_end: subscription?.current_period_end ? new Date(subscription.current_period_end * 1000).toISOString() : null,
    billing_updated_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  const { data: existing } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  if (!["admin", "school"].includes(existing?.role)) update.role = "pro";

  const { error } = await supabase
    .from("profiles")
    .update(update)
    .eq("id", userId);
  if (error) throw error;
}

async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Method not allowed." });
  }

  const stripe = stripeClient();
  const signature = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) return sendJson(res, 500, { error: "Missing Stripe webhook secret." });

  let event;
  try {
    const rawBody = await readRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook verification failed:", error.message);
    return sendJson(res, 400, { error: "Webhook signature verification failed." });
  }

  try {
    const supabase = supabaseAdmin();
    if (event.type === "checkout.session.completed") {
      await updateProfileForCheckout(supabase, stripe, event.data.object);
    }

    if (event.type === "customer.subscription.updated" || event.type === "customer.subscription.deleted") {
      await updateProfileForSubscription(supabase, event.data.object);
    }

    return sendJson(res, 200, { received: true });
  } catch (error) {
    console.error("Stripe webhook handling failed:", error);
    return sendJson(res, 500, { error: "Webhook handling failed." });
  }
}

handler.config = {
  api: {
    bodyParser: false
  }
};

module.exports = handler;
