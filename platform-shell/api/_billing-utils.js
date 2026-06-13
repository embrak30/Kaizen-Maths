const { createClient } = require("@supabase/supabase-js");
const Stripe = require("stripe");

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

function siteUrl() {
  return (process.env.PUBLIC_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || "https://kaizenmaths.com")
    .replace(/^([^h])/, "https://$1")
    .replace(/\/$/, "");
}

function stripeClient() {
  return new Stripe(requireEnv("STRIPE_SECRET_KEY"));
}

function supabaseAdmin() {
  return createClient(
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || requireEnv("KAIZEN_SUPABASE_URL"),
    process.env.SUPABASE_SERVICE_ROLE_KEY || requireEnv("KAIZEN_SUPABASE_SERVICE_ROLE_KEY"),
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
}

function bearerToken(req) {
  const header = req.headers.authorization || req.headers.Authorization || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : "";
}

async function getSignedInUser(req, supabase) {
  const token = bearerToken(req);
  if (!token) return { user: null, error: "Missing sign-in token." };
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) return { user: null, error: "Could not verify signed-in user." };
  return { user: data.user, error: null };
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1e6) {
        req.destroy();
        reject(new Error("Request body too large."));
      }
    });
    req.on("end", () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error("Invalid JSON body."));
      }
    });
    req.on("error", reject);
  });
}

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

function planPriceId(plan) {
  if (plan === "annual") return process.env.STRIPE_PRICE_TEACHER_ANNUAL;
  return process.env.STRIPE_PRICE_TEACHER_MONTHLY;
}

module.exports = {
  getSignedInUser,
  planPriceId,
  readJsonBody,
  readRawBody,
  sendJson,
  siteUrl,
  stripeClient,
  supabaseAdmin
};
