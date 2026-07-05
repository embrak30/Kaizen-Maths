const {
  getSignedInUser,
  planPriceId,
  sendJson,
  stripeClient,
  supabaseAdmin
} = require("./_billing-utils");

function valueState(value) {
  if (!value) return { present: false, prefix: "", suffix: "" };
  return {
    present: true,
    prefix: value.slice(0, Math.min(8, value.length)),
    suffix: value.length > 8 ? value.slice(-6) : ""
  };
}

function keyMode(value) {
  if (!value) return "missing";
  if (value.startsWith("sk_live_")) return "live";
  if (value.startsWith("sk_test_")) return "sandbox";
  if (value.startsWith("pk_")) return "publishable-key-used";
  return "unknown";
}

async function checkPrice(stripe, plan) {
  const priceId = planPriceId(plan);
  const summary = {
    plan,
    env: plan === "annual" ? "STRIPE_PRICE_TEACHER_ANNUAL" : "STRIPE_PRICE_TEACHER_MONTHLY",
    value: valueState(priceId),
    ok: false
  };

  if (!priceId) {
    summary.error = "Missing price environment variable.";
    return summary;
  }

  if (!priceId.startsWith("price_")) {
    summary.error = "This value is not a Stripe price ID. It must start with price_.";
    return summary;
  }

  try {
    const price = await stripe.prices.retrieve(priceId, { expand: ["product"] });
    summary.ok = true;
    summary.livemode = Boolean(price.livemode);
    summary.active = Boolean(price.active);
    summary.currency = price.currency || "";
    summary.interval = price.recurring?.interval || "";
    summary.product = typeof price.product === "string"
      ? price.product
      : price.product?.name || price.product?.id || "";
    return summary;
  } catch (error) {
    summary.error = String(error?.message || "Stripe could not retrieve this price.");
    summary.type = String(error?.type || "");
    summary.code = String(error?.code || "");
    return summary;
  }
}

async function checkCustomer(stripe, customerId) {
  const summary = {
    value: valueState(customerId),
    ok: false
  };

  if (!customerId) {
    summary.ok = true;
    summary.status = "none-saved";
    return summary;
  }

  try {
    const customer = await stripe.customers.retrieve(customerId);
    summary.ok = !customer?.deleted;
    summary.status = customer?.deleted ? "deleted" : "found";
    summary.email = customer?.email || "";
    return summary;
  } catch (error) {
    summary.status = "not-found";
    summary.error = String(error?.message || "Stripe could not retrieve this customer.");
    summary.type = String(error?.type || "");
    summary.code = String(error?.code || "");
    return summary;
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Method not allowed." });
  }

  try {
    const supabase = supabaseAdmin();
    const { user, error: userError } = await getSignedInUser(req, supabase);
    if (userError) return sendJson(res, 401, { error: userError });

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role, stripe_customer_id, stripe_subscription_id")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) return sendJson(res, 500, { error: profileError.message });
    if (profile?.role !== "admin") return sendJson(res, 403, { error: "Admin access required." });

    const secretKey = process.env.STRIPE_SECRET_KEY || "";
    const stripe = stripeClient();
    const monthly = await checkPrice(stripe, "monthly");
    const annual = await checkPrice(stripe, "annual");
    const customer = await checkCustomer(stripe, profile?.stripe_customer_id || "");
    const mode = keyMode(secretKey);

    return sendJson(res, 200, {
      ok: monthly.ok && annual.ok && customer.ok,
      stripeSecretKey: {
        mode,
        value: valueState(secretKey)
      },
      webhookSecret: {
        value: valueState(process.env.STRIPE_WEBHOOK_SECRET || "")
      },
      currentUserCustomer: customer,
      prices: [monthly, annual],
      likelyIssue: monthly.ok && annual.ok && customer.ok
        ? ""
        : "At least one Stripe record cannot be retrieved by the current STRIPE_SECRET_KEY. Price IDs and saved customer IDs must be from the same Stripe account and the same live/sandbox mode."
    });
  } catch (error) {
    console.error("Billing diagnostics error:", error);
    return sendJson(res, 500, { error: String(error?.message || "Billing diagnostics failed.") });
  }
};
