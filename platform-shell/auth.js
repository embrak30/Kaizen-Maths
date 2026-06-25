(function () {
  const SUPABASE_CDN = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
  const config = window.KAIZEN_AUTH_CONFIG || {};
  const state = {
    ready: false,
    configured: Boolean(config.supabaseUrl && config.supabaseAnonKey),
    client: null,
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
      const schoolEnds = state.profile?.school_licence_ends_at ? new Date(state.profile.school_licence_ends_at) : null;
      const schoolActive = role === "school"
        && schoolName
        && state.profile?.school_is_active !== false
        && (!schoolEnds || Number.isNaN(schoolEnds.getTime()) || schoolEnds >= new Date());
      eyebrow.textContent = schoolActive ? "SCHOOL ACCESS" : role ? role.toUpperCase() : "SIGNED IN";
      label.textContent = schoolActive ? schoolName : displayName(user);
      action.textContent = "Sign out";
      action.disabled = false;
      action.onclick = signOut;
      action.title = shortEmail(user);
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
    label.textContent = "Trial access";
    action.textContent = "Sign in with Google";
    action.disabled = false;
    action.onclick = signInWithGoogle;
  }

  async function hydrateProfile(profile) {
    if (!profile?.school_id || !state.client) return profile;
    try {
      const { data, error } = await state.client
        .from("schools")
        .select("id, name, licence_ends_at, is_active")
        .eq("id", profile.school_id)
        .maybeSingle();
      if (error || !data) return profile;
      return {
        ...profile,
        school_name: data.name,
        school_licence_ends_at: data.licence_ends_at,
        school_is_active: data.is_active
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
    const mod = await import(SUPABASE_CDN);
    state.client = mod.createClient(config.supabaseUrl, config.supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
    return state.client;
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
      setAccountUi("not-configured");
      return null;
    }

    const client = await withTimeout(loadSupabase(), 6000, "Supabase client timed out");
    const { data } = await withTimeout(client.auth.getSession(), 6000, "Supabase session check timed out");
    state.session = data.session;

    if (state.session?.user) {
      state.profile = null;
      setAccountUi("signed-in", state.session.user);
      syncProfileInBackground(state.session.user);
    } else {
      state.profile = null;
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
    setAccountUi("signed-out");
  }

  async function initAuth() {
    setAccountUi("loading");
    window.setTimeout(() => {
      const { pill } = accountElements();
      if (pill?.dataset.authState === "loading") {
        console.warn("Kaizen auth check timed out.");
        setAccountUi(state.configured ? "signed-out" : "not-configured");
      }
    }, 8000);

    if (!state.configured) {
      setAccountUi("not-configured");
      return;
    }

    try {
      const client = await withTimeout(loadSupabase(), 6000, "Supabase client timed out");
      client.auth.onAuthStateChange(async (_event, session) => {
      state.session = session;
      if (session?.user) {
          state.profile = null;
          setAccountUi("signed-in", session.user);
          syncProfileInBackground(session.user);
        } else {
          state.profile = null;
          setAccountUi("signed-out");
        }
        window.dispatchEvent(new CustomEvent("kaizen-auth-change", { detail: { session, profile: state.profile } }));
      });
      await refreshSession();
    } catch (error) {
      console.warn("Kaizen auth unavailable:", error.message);
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
