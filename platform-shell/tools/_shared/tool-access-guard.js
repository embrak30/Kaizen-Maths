(() => {
  const SUPABASE_CDN = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
  const ACCESS_LEVELS = ["free", "trial", "pro", "school", "admin"];
  const FREE_SAMPLE_TOOLS = new Set([
    "substitution",
    "fractions-practice",
    "pythagoras-theorem",
    "averages-range",
    "classroom-displays",
    "bar-models",
    "elementary-starter-board",
    "elementary-maths-playground",
    "interface-guide"
  ]);
  const root = document.documentElement;
  const slug = currentToolSlug();
  const SCHOOL_CONTEXT_KEY = "kaizen:school-context";

  if (!slug || root.dataset.kaizenToolAccessChecked) return;

  if (isTrustedClassroomFrame() || isTrustedWorksheetLoaderFrame()) {
    root.dataset.kaizenToolAccessChecked = "allowed";
    return;
  }

  root.dataset.kaizenToolAccessChecked = "pending";
  root.classList.add("kaizen-tool-access-pending");

  const style = document.createElement("style");
  style.textContent = `
    html.kaizen-tool-access-pending body { visibility: hidden; }
    .kaizen-access-blocker {
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 24px;
      background: linear-gradient(135deg, #f8fbff, #eefdf9);
      color: #172033;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }
    .kaizen-access-blocker-card {
      width: min(620px, 100%);
      border: 1px solid #dbe7ef;
      border-radius: 18px;
      background: white;
      box-shadow: 0 22px 50px rgba(15, 23, 42, 0.14);
      padding: 28px;
      text-align: center;
    }
    .kaizen-access-blocker-card h1 {
      margin: 0 0 10px;
      font-size: clamp(1.6rem, 4vw, 2.2rem);
      line-height: 1.1;
    }
    .kaizen-access-blocker-card p {
      margin: 0 0 18px;
      color: #5f6f86;
      font-size: 1rem;
      line-height: 1.5;
    }
    .kaizen-access-blocker-card a,
    .kaizen-access-blocker-card button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 42px;
      border: 0;
      border-radius: 10px;
      background: #0f766e;
      color: white;
      padding: 10px 16px;
      font: inherit;
      font-weight: 900;
      text-decoration: none;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  function currentToolSlug() {
    const path = window.location.pathname;
    const match = path.match(/\/tools\/([^/]+)\/index\.html?$/i) ||
      path.match(/\/tools\/([^/]+)\/?$/i);
    return match ? decodeURIComponent(match[1]) : "";
  }

  function isTrustedClassroomFrame() {
    try {
      if (window.self === window.top) return false;
      if (window.parent.location.origin !== window.location.origin) return false;
      const parentHash = window.parent.location.hash || "";
      const parentParts = parentHash.split("?")[0].replace(/^#\/?/, "").split("/");
      return parentParts[0] === "classroom" && decodeURIComponent(parentParts[1] || "") === slug;
    } catch (_error) {
      return false;
    }
  }

  function isTrustedWorksheetLoaderFrame() {
    try {
      if (window.self === window.top) return false;
      if (window.parent.location.origin !== window.location.origin) return false;
      const parentHash = window.parent.location.hash || "";
      const parentParts = parentHash.split("?")[0].replace(/^#\/?/, "").split("/");
      const worksheetLoad = new URLSearchParams(window.location.search).has("worksheetLoad");
      return worksheetLoad && ["worksheet-generator", "class-tasks"].includes(parentParts[0]);
    } catch (_error) {
      return false;
    }
  }

  function normalise(value) {
    return String(value || "").toLowerCase();
  }

  function trialEndDate(days) {
    const date = new Date();
    date.setDate(date.getDate() + Number(days || 30));
    return date.toISOString();
  }

  function displayName(user) {
    return user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || "Teacher";
  }

  function schoolContextFromRecord(school) {
    if (!school?.id) return null;
    return {
      school_id: school.id,
      school_name: school.name || "",
      organisation_name: school.organisation_name || "",
      pilot_name: school.pilot_name || "",
      country: school.country || "",
      currency_code: school.currency_code || "GBP",
      currency_symbol: school.currency_symbol || "£",
      locale: school.locale || "en-GB",
      curriculum_focus: school.curriculum_focus || "",
      standards_label: school.standards_label || "",
      logo_url: school.logo_url || "",
      contact_person: school.contact_person || "",
      school_synopsis: school.school_synopsis || ""
    };
  }

  function syncSchoolContext(context) {
    try {
      if (context?.school_id) {
        localStorage.setItem(SCHOOL_CONTEXT_KEY, JSON.stringify(context));
        window.KaizenSchoolContext = context;
      } else {
        localStorage.removeItem(SCHOOL_CONTEXT_KEY);
        window.KaizenSchoolContext = null;
      }
    } catch (_error) {
      window.KaizenSchoolContext = context || null;
    }
  }

  function withTimeout(promise, timeoutMs, message) {
    return Promise.race([
      promise,
      new Promise((_, reject) => {
        window.setTimeout(() => reject(new Error(message)), timeoutMs);
      })
    ]);
  }

  function defaultRequiredAccess(toolSlug) {
    return FREE_SAMPLE_TOOLS.has(toolSlug) ? "free" : "trial";
  }

  function normaliseRequiredAccess(value, toolSlug) {
    const configured = ACCESS_LEVELS.includes(normalise(value)) ? normalise(value) : defaultRequiredAccess(toolSlug);
    if (configured === "free" && !FREE_SAMPLE_TOOLS.has(toolSlug)) return "trial";
    return configured;
  }

  function accessRank(role) {
    return ACCESS_LEVELS.indexOf(role);
  }

  function profileRole(profile) {
    const role = normalise(profile?.role || window.KAIZEN_AUTH_CONFIG?.defaultRole || "trial");
    if (role === "trial" && profile?.trial_ends_at) {
      const trialEnds = new Date(profile.trial_ends_at);
      if (!Number.isNaN(trialEnds.getTime()) && trialEnds < new Date()) return "free";
    }
    if (role === "school") {
      if (profile?.school_is_active === false) return "free";
      if (profile?.school_licence_ends_at) {
        const schoolEnds = new Date(profile.school_licence_ends_at);
        if (!Number.isNaN(schoolEnds.getTime()) && schoolEnds < new Date()) return "free";
      }
    }
    return role;
  }

  async function loadSupabaseClient() {
    const config = window.KAIZEN_AUTH_CONFIG || {};
    if (!config.supabaseUrl || !config.supabaseAnonKey) return null;
    const mod = await withTimeout(import(SUPABASE_CDN), 6000, "Supabase client timed out");
    return mod.createClient(config.supabaseUrl, config.supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false
      }
    });
  }

  async function toolAccessSetting(client, toolSlug) {
    if (!client) return defaultRequiredAccess(toolSlug);
    const { data, error } = await withTimeout(client
      .from("tool_access")
      .select("required_access")
      .eq("tool_slug", toolSlug)
      .maybeSingle(), 6000, "Tool access check timed out");
    if (error) return defaultRequiredAccess(toolSlug);
    return normaliseRequiredAccess(data?.required_access, toolSlug);
  }

  async function ensureProfile(client, user) {
    if (!client || !user) return null;
    const { data: existing, error: selectError } = await withTimeout(client
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle(), 6000, "Profile check timed out");

    if (existing) return hydrateSchoolProfile(client, existing);
    if (selectError) return null;

    const profile = {
      id: user.id,
      email: user.email,
      full_name: displayName(user),
      role: window.KAIZEN_AUTH_CONFIG?.defaultRole || "trial",
      trial_ends_at: trialEndDate(window.KAIZEN_AUTH_CONFIG?.trialDays),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data, error } = await withTimeout(client
      .from("profiles")
      .insert(profile)
      .select()
      .single(), 6000, "Profile creation timed out");

    if (error) return profile;
    return hydrateSchoolProfile(client, data);
  }

  async function hydrateSchoolProfile(client, profile) {
    if (!profile?.school_id || !client) {
      syncSchoolContext(null);
      return profile;
    }
    let { data, error } = await withTimeout(client
      .from("schools")
      .select("id, name, organisation_name, pilot_name, country, currency_code, currency_symbol, locale, curriculum_focus, standards_label, logo_url, contact_person, school_synopsis, licence_ends_at, is_active")
      .eq("id", profile.school_id)
      .maybeSingle(), 6000, "School licence check timed out");
    if (error && /column|schema cache/i.test(error.message || "")) {
      const fallback = await withTimeout(client
        .from("schools")
        .select("id, name, licence_ends_at, is_active")
        .eq("id", profile.school_id)
        .maybeSingle(), 6000, "School licence check timed out");
      data = fallback.data;
      error = fallback.error;
    }
    if (error || !data) {
      syncSchoolContext(null);
      return profile;
    }
    const schoolContext = schoolContextFromRecord(data);
    syncSchoolContext(schoolContext);
    return {
      ...profile,
      school_name: data.name,
      school_organisation_name: data.organisation_name,
      school_pilot_name: data.pilot_name,
      school_country: data.country,
      school_currency_code: data.currency_code,
      school_currency_symbol: data.currency_symbol,
      school_locale: data.locale,
      school_curriculum_focus: data.curriculum_focus,
      school_standards_label: data.standards_label,
      school_logo_url: data.logo_url,
      school_contact_person: data.contact_person,
      school_synopsis: data.school_synopsis,
      school_licence_ends_at: data.licence_ends_at,
      school_is_active: data.is_active,
      school_context: schoolContext
    };
  }

  function canAccess(required, role) {
    if (required === "free") return true;
    if (role === "guest") return false;
    if (role === "admin") return true;
    if (role === "school") return ["free", "trial", "pro", "school"].includes(required);
    return accessRank(role) >= accessRank(required);
  }

  function finishAllowed() {
    root.dataset.kaizenToolAccessChecked = "allowed";
    root.classList.remove("kaizen-tool-access-pending");
  }

  function mainSiteUrl(route) {
    return `${window.location.origin}/#/${route}`;
  }

  function redirectBlocked(required, role) {
    const route = role === "guest"
      ? `tools/${encodeURIComponent(slug)}?signin=1`
      : `upgrade?tool=${encodeURIComponent(slug)}&required=${encodeURIComponent(required)}`;
    const target = mainSiteUrl(route);
    root.dataset.kaizenToolAccessChecked = "blocked";
    try {
      if (window.top && window.top !== window.self) {
        window.top.location.href = target;
        return;
      }
    } catch (_error) {
      // Fall through to same-window redirect.
    }
    window.location.replace(target);
  }

  function showBlockedFallback(message) {
    root.classList.remove("kaizen-tool-access-pending");
    document.body.innerHTML = `
      <main class="kaizen-access-blocker">
        <section class="kaizen-access-blocker-card">
          <h1>Kaizen Maths access required</h1>
          <p>${message}</p>
          <a href="${mainSiteUrl(`upgrade?tool=${encodeURIComponent(slug)}`)}">Open Kaizen Maths</a>
        </section>
      </main>
    `;
  }

  async function checkAccess() {
    try {
      const client = await loadSupabaseClient();
      const required = await toolAccessSetting(client, slug);
      if (required === "free") {
        finishAllowed();
        return;
      }

      if (!client) {
        redirectBlocked(required, "guest");
        return;
      }

      const { data } = await withTimeout(client.auth.getSession(), 6000, "Session check timed out");
      const session = data?.session || null;
      if (!session?.user) {
        redirectBlocked(required, "guest");
        return;
      }

      const profile = await ensureProfile(client, session.user);
      const role = profileRole(profile);
      if (canAccess(required, role)) {
        finishAllowed();
        return;
      }

      redirectBlocked(required, role);
    } catch (error) {
      console.warn("Kaizen tool access guard blocked direct tool load:", error);
      showBlockedFallback("This tool could not confirm an active trial, subscription, or school licence. Please open Kaizen Maths and sign in again.");
    }
  }

  checkAccess();
})();
