const {
  getSignedInUser,
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

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .maybeSingle();

    if (error) throw error;
    if (!profile?.stripe_customer_id) {
      return sendJson(res, 404, { error: "No billing profile found yet." });
    }

    const stripe = stripeClient();
    const portal = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${siteUrl()}/#/upgrade`
    });

    return sendJson(res, 200, { url: portal.url });
  } catch (error) {
    console.error("Billing portal error:", error);
    return sendJson(res, 500, { error: "Could not open billing portal." });
  }
};
