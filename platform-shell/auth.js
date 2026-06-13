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
      eyebrow.textContent = state.profile?.role ? state.profile.role.toUpperCase() : "SIGNED IN";
      label.textContent = displayName(user);
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

  function redirectUrl() {
    const path = config.googleRedirectPath || "/auth/callback.html";
    return new URL(path, window.location.origin).toString();
  }

  function supabaseAuthUrl() {
    return String(config.supabaseUrl || "").replace(/\/+$/, "");
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

    if (existing) return existing;
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
    return data;
  }

  async function refreshSession() {
    if (!state.configured) {
      setAccountUi("not-configured");
      return null;
    }

    const client = await loadSupabase();
    const { data } = await client.auth.getSession();
    state.session = data.session;

    if (state.session?.user) {
      state.profile = await ensureProfile(state.session.user);
      setAccountUi("signed-in", state.session.user);
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
    const params = new URLSearchParams({
      provider: "google",
      redirect_to: redirectUrl(),
      access_type: "offline",
      prompt: "consent"
    });
    window.location.assign(`${supabaseAuthUrl()}/auth/v1/authorize?${params.toString()}`);
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
    if (!state.configured) {
      setAccountUi("not-configured");
      return;
    }

    const client = await loadSupabase();
    client.auth.onAuthStateChange(async (_event, session) => {
      state.session = session;
      if (session?.user) {
        state.profile = await ensureProfile(session.user);
        setAccountUi("signed-in", session.user);
      } else {
        state.profile = null;
        setAccountUi("signed-out");
      }
      window.dispatchEvent(new CustomEvent("kaizen-auth-change", { detail: { session, profile: state.profile } }));
    });
    await refreshSession();
  }

  window.KaizenAuth = {
    state,
    initAuth,
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
