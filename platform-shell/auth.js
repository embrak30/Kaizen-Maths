(function () {
  const SUPABASE_CDN = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
  const config = window.KAIZEN_AUTH_CONFIG || {};
  const state = {
    ready: false,
    configured: Boolean(config.supabaseUrl && config.supabaseAnonKey),
    client: null,
    clientPromise: null,
    session: null,
    profile: null
  };

  function accountElements() {
    return {
      pill: document.getElementById("accountPill"),
      eyebrow: document.getElementById("accountEyebrow"),
      label: document.getElementById("accountLabel"),
      action: document.getElementById("accountAction")
    };
  }

  function displayName(user) {
    return user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || "Teacher";
  }

  function shortEmail(user) {
    const email = user?.email || "";
    return email.length > 24 ? email.slice(0, 21) + "..." : email;
  }

  const SCHOOL_CONTEXT_KEY = "kaizen:school-context";
  const SCHOOL_CURRICULUM_FALLBACK_KEY = "kaizen:school-default-curriculum";

  function schoolCurriculumFallbacks() {
    try {
      return JSON.parse(localStorage.getItem(SCHOOL_CURRICULUM_FALLBACK_KEY) || "{}") || {};
    } catch (_error) {
      return {};
    }
  }

  function storedDefaultCurriculumForSchool(schoolId) {
    if (!schoolId) return "";
    return schoolCurriculumFallbacks()[schoolId] || "";
  }

  function schoolContextFromRecord(school) {
    if (!school?.id) return null;
    const storedCurriculumId = storedDefaultCurriculumForSchool(school.id);
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
      default_curriculum_id: school.default_curriculum_id || storedCurriculumId,
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

  function storedSchoolContext() {
    try {
      return JSON.parse(localStorage.getItem(SCHOOL_CONTEXT_KEY) || "null");
    } catch (_error) {
      return null;
    }
  }

  function trialEndDate() {
    const date = new Date();
    date.setDate(date.getDate() + Number(config.trialDays || 30));
    return date.toISOString();
  }

  function setAccountUi(mode, user) {
    const { pill, eyebrow, label, action } = accountElements();
    if (!pill || !eyebrow || !label || !action) return;

    pill.dataset.authState = mode;
    action.onclick = null;

    if (mode === "signed-in") {
      const role = state.profile?.role || "";
      const schoolName = state.profile?.school_name || "";
      const pilotName = state.profile?.school_pilot_name || "";
      const schoolEnds = state.profile?.school_licence_ends_at ? new Date(state.profile.school_licence_ends_at) : null;
      const schoolActive = role === "school"
        && schoolName
        && state.profile?.school_is_active !== false
        && (!schoolEnds || Number.isNaN(schoolEnds.getTime()) || schoolEnds >= new Date());
      eyebrow.textContent = schoolActive ? (pilotName ? "PILOT ACCESS" : "SCHOOL ACCESS") : role ? role.toUpperCase() : "SIGNED IN";
      label.textContent = schoolActive ? schoolName : displayName(user);
      action.textContent = "Sign out";
      action.disabled = false;
      action.onclick = signOut;
      action.title = schoolActive && pilotName ? `${pilotName} · ${shortEmail(user)}` : shortEmail(user);
      return;
    }

    if (mode === "not-configured") {
      eyebrow.textContent = "Access";
      label.textContent = "Supabase not connected";
      action.textContent = "Connect";
      action.disabled = false;
      action.onclick = () => {
        window.location.hash = "#/teacher";
      };
      return;
    }

    if (mode === "loading") {
      eyebrow.textContent = "Access";
      label.textContent = "Checking sign-in...";
      action.textContent = "Sign in";
      action.disabled = true;
      return;
    }

    eyebrow.textContent = "Access";
    label.textContent = "Teacher trial";
    action.textContent = "Sign in with Google";
    action.disabled = false;
    action.onclick = signInWithGoogle;
  }

  async function hydrateProfile(profile) {
    if (!profile?.school_id || !state.client) {
      syncSchoolContext(null);
      return profile;
    }
    try {
      let { data, error } = await state.client
        .from("schools")
        .select("id, name, organisation_name, pilot_name, country, currency_code, currency_symbol, locale, curriculum_focus, default_curriculum_id, standards_label, logo_url, contact_person, school_synopsis, licence_ends_at, is_active")
        .eq("id", profile.school_id)
        .maybeSingle();
      if (error && /column|schema cache/i.test(error.message || "")) {
        const fallback = await state.client
          .from("schools")
          .select("id, name, organisation_name, pilot_name, country, currency_code, currency_symbol, locale, curriculum_focus, standards_label, logo_url, contact_person, school_synopsis, licence_ends_at, is_active")
          .eq("id", profile.school_id)
          .maybeSingle();
        data = fallback.data;
        error = fallback.error;
      }
      if (error || !data) {
        syncSchoolContext(null);
        return profile;
      }
      const previousContext = storedSchoolContext();
      const preservedCurriculum = previousContext?.school_id === data.id
        ? previousContext.default_curriculum_id || storedDefaultCurriculumForSchool(data.id)
        : storedDefaultCurriculumForSchool(data.id);
      const schoolContext = schoolContextFromRecord({
        ...data,
        default_curriculum_id: data.default_curriculum_id || preservedCurriculum
      });
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
        school_default_curriculum_id: data.default_curriculum_id || preservedCurriculum,
        school_standards_label: data.standards_label,
        school_logo_url: data.logo_url,
        school_contact_person: data.contact_person,
        school_synopsis: data.school_synopsis,
        school_licence_ends_at: data.licence_ends_at,
        school_is_active: data.is_active,
        school_context: schoolContext
      };
    } catch (error) {
      console.warn("Kaizen school lookup skipped:", error.message);
      return profile;
    }
  }

  function syncProfileInBackground(user) {
    if (!user) return;
    ensureProfile(user)
      .then((profile) => {
        state.profile = profile;
        if (state.session?.user?.id === user.id) {
          setAccountUi("signed-in", user);
          window.dispatchEvent(new CustomEvent("kaizen-auth-change", { detail: { session: state.session, profile: state.profile } }));
        }
      })
      .catch((error) => {
        console.warn("Kaizen profile check skipped:", error.message);
      });
  }

  function redirectUrl() {
    const path = config.googleRedirectPath || "/auth/callback.html";
    return new URL(path, window.location.origin).toString();
  }

  function withTimeout(promise, timeoutMs, message) {
    return Promise.race([
      promise,
      new Promise((_, reject) => {
        window.setTimeout(() => reject(new Error(message)), timeoutMs);
      })
    ]);
  }

  async function loadSupabase() {
    if (!state.configured) return null;
    if (state.client) return state.client;
    if (!state.clientPromise) {
      state.clientPromise = import(SUPABASE_CDN).then((mod) => {
        state.client = mod.createClient(config.supabaseUrl, config.supabaseAnonKey, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
          }
        });
        return state.client;
      }).catch((error) => {
        state.clientPromise = null;
        throw error;
      });
    }
    return state.clientPromise;
  }
  async function ensureProfile(user) {
    if (!state.client || !user) return null;
    const { data: existing, error: selectError } = await state.client
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (existing) return hydrateProfile(existing);
    if (selectError) {
      console.warn("Kaizen profile lookup skipped:", selectError.message);
      return null;
    }

    const profile = {
      id: user.id,
      email: user.email,
      full_name: displayName(user),
      role: config.defaultRole || "trial",
      trial_ends_at: trialEndDate(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data, error } = await state.client
      .from("profiles")
      .insert(profile)
      .select()
      .single();

    if (error) {
      console.warn("Kaizen profile sync skipped:", error.message);
      return null;
    }
    return hydrateProfile(data);
  }

  async function refreshProfile() {
    if (!state.session?.user) return null;
    state.profile = await ensureProfile(state.session.user);
    setAccountUi("signed-in", state.session.user);
    window.dispatchEvent(new CustomEvent("kaizen-auth-change", { detail: { session: state.session, profile: state.profile } }));
    return state.profile;
  }

  async function refreshSession() {
    if (!state.configured) {
      state.ready = true;
      setAccountUi("not-configured");
      return null;
    }

    const client = await withTimeout(loadSupabase(), 6000, "Supabase client timed out");
    const { data } = await withTimeout(client.auth.getSession(), 6000, "Supabase session check timed out");
    state.ready = true;
    state.session = data.session;

    if (state.session?.user) {
      state.profile = null;
      setAccountUi("signed-in", state.session.user);
      syncProfileInBackground(state.session.user);
    } else {
      state.profile = null;
      syncSchoolContext(null);
      setAccountUi("signed-out");
    }
    return state.session;
  }

  async function signInWithGoogle() {
    if (!state.configured) {
      setAccountUi("not-configured");
      return;
    }
    const client = await loadSupabase();
    await client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUrl(),
        queryParams: {
          access_type: "offline",
          prompt: "consent"
        }
      }
    });
  }

  async function signOut() {
    if (!state.client) return;
    await state.client.auth.signOut();
    state.session = null;
    state.profile = null;
    syncSchoolContext(null);
    setAccountUi("signed-out");
  }

  async function initAuth() {
    setAccountUi("loading");
    window.setTimeout(() => {
      const { pill } = accountElements();
      if (pill?.dataset.authState === "loading") {
        console.warn("Kaizen auth check timed out.");
        state.ready = true;
        setAccountUi(state.configured ? "signed-out" : "not-configured");
      }
    }, 8000);

    if (!state.configured) {
      state.ready = true;
      setAccountUi("not-configured");
      return;
    }

    try {
      const client = await withTimeout(loadSupabase(), 6000, "Supabase client timed out");
      client.auth.onAuthStateChange(async (_event, session) => {
        state.ready = true;
        state.session = session;
        if (session?.user) {
          state.profile = null;
          setAccountUi("signed-in", session.user);
          syncProfileInBackground(session.user);
        } else {
          state.profile = null;
          syncSchoolContext(null);
          setAccountUi("signed-out");
        }
        window.dispatchEvent(new CustomEvent("kaizen-auth-change", { detail: { session, profile: state.profile } }));
      });
      await refreshSession();
    } catch (error) {
      console.warn("Kaizen auth unavailable:", error.message);
      state.ready = true;
      setAccountUi("signed-out");
    }
  }

  window.KaizenAuth = {
    state,
    getClient: loadSupabase,
    initAuth,
    refreshProfile,
    refreshSession,
    signInWithGoogle,
    signOut
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAuth);
  } else {
    initAuth();
  }
})();
