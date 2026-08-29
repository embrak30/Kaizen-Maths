const {
  getSignedInUser,
  readJsonBody,
  sendJson,
  supabaseAdmin
} = require("./_billing-utils");

const TASK_SELECT = [
  "id",
  "teacher_id",
  "school_id",
  "title",
  "instructions",
  "source_tool_slug",
  "source_tool_title",
  "source_level_label",
  "source_type_label",
  "join_code",
  "questions",
  "settings",
  "expires_at",
  "is_active",
  "created_at",
  "updated_at"
].join(", ");

const RESPONSE_SELECT = "id, task_id, pupil_alias, answers, auto_score, max_score, marking, reviewed, teacher_notes, submitted_at";
const RESPONSE_SELECT_WITH_WORKING = "id, task_id, pupil_alias, answers, working, auto_score, max_score, marking, reviewed, teacher_notes, submitted_at";
const SUBMISSION_SELECT = "id, pupil_alias, answers, auto_score, max_score, marking, submitted_at";
const SUBMISSION_SELECT_WITH_WORKING = "id, pupil_alias, answers, working, auto_score, max_score, marking, submitted_at";

function queryParam(req, name) {
  const url = new URL(req.url || "/", "https://kaizenmaths.com");
  return url.searchParams.get(name) || "";
}

function cleanText(value, max = 2000) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

function cleanLongText(value, max = 30000) {
  return String(value ?? "").trim().slice(0, max);
}

function cleanStringMap(value, maxValueLength = 4000) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value)
      .slice(0, 80)
      .map(([key, entry]) => [cleanText(key, 80), cleanLongText(entry, maxValueLength)])
      .filter(([key]) => key)
  );
}

function randomCode(length = 7) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let index = 0; index < length; index += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return code;
}

function normaliseCode(value) {
  return String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 16);
}

function normaliseRole(profile) {
  return String(profile?.role || "").toLowerCase();
}

function hasActiveTrial(profile) {
  if (!profile?.trial_ends_at) return true;
  const trialEnds = new Date(profile.trial_ends_at);
  return Number.isNaN(trialEnds.getTime()) || trialEnds >= new Date();
}

function canCreateClassTask(profile) {
  const role = normaliseRole(profile);
  if (["admin", "pro", "school"].includes(role)) return true;
  return role === "trial" && hasActiveTrial(profile);
}

function taskIsAvailable(task) {
  if (!task?.is_active) return false;
  if (!task.expires_at) return true;
  const expiry = new Date(task.expires_at);
  return Number.isNaN(expiry.getTime()) || expiry >= new Date();
}

function cleanQuestion(question, index) {
  const marks = Math.max(0, Math.min(20, Number(question?.marks || 1)));
  return {
    id: cleanText(question?.id || `q${index + 1}`, 80) || `q${index + 1}`,
    question: cleanLongText(question?.question || question?.questionText || question?.prompt || question?.equation || "", 24000),
    diagram: cleanLongText(question?.diagram || question?.diagramHtml || "", 30000),
    answer: cleanLongText(question?.answer || question?.answerText || question?.plainAnswer || "", 12000),
    steps: Array.isArray(question?.steps)
      ? question.steps.slice(0, 12).map((step) => cleanLongText(step, 12000)).filter(Boolean)
      : [],
    marks,
    instruction: cleanText(question?.instruction || question?.instructionText || "", 600),
    sectionTitle: cleanText(question?.sectionTitle || "", 120),
    sectionType: cleanText(question?.sectionType || "", 120)
  };
}

function publicQuestion(question, index) {
  return {
    id: question.id || `q${index + 1}`,
    question: question.question || "",
    diagram: question.diagram || "",
    marks: Number(question.marks) || 1,
    instruction: question.instruction || "",
    sectionTitle: question.sectionTitle || "",
    sectionType: question.sectionType || ""
  };
}

function stripHtml(value) {
  return String(value ?? "")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#039;/g, "'");
}

function normaliseSuperscripts(value) {
  const superscriptMap = {
    "⁰": "0",
    "¹": "1",
    "²": "2",
    "³": "3",
    "⁴": "4",
    "⁵": "5",
    "⁶": "6",
    "⁷": "7",
    "⁸": "8",
    "⁹": "9"
  };
  return String(value ?? "").replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (match) => `^${[...match].map((char) => superscriptMap[char] || "").join("")}`);
}

function normaliseMathAnswer(value) {
  let text = normaliseSuperscripts(stripHtml(value)).toLowerCase();
  text = text
    .replace(/\\dfrac/g, "\\frac")
    .replace(/\\frac\s*\{([^{}]+)\}\s*\{([^{}]+)\}/g, "$1/$2")
    .replace(/\\sqrt\s*\{([^{}]+)\}/g, "sqrt($1)")
    .replace(/\\left|\\right/g, "")
    .replace(/\\times|×/g, "*")
    .replace(/\\div|÷/g, "/")
    .replace(/\\leq?|≤/g, "<=")
    .replace(/\\geq?|≥/g, ">=")
    .replace(/\\pi|π/g, "pi")
    .replace(/√\s*\(?([^)]*)\)?/g, "sqrt($1)")
    .replace(/[−–—]/g, "-")
    .replace(/\\\(|\\\)|\\\[|\\\]|\$|\{|\}/g, "")
    .replace(/\btherefore\b|\banswer\b|\bresult\b/g, "")
    .replace(/\s+/g, "");
  return text.replace(/[.;,]+$/g, "");
}

function acceptableAnswers(expected) {
  const clean = normaliseMathAnswer(expected);
  const answers = new Set([clean]);
  const withoutVariable = clean.replace(/^[a-z][a-z0-9_]*=/, "");
  if (withoutVariable) answers.add(withoutVariable);
  clean.split(/\bor\b|\/\//).forEach((part) => {
    const option = normaliseMathAnswer(part);
    if (option) answers.add(option);
  });
  return [...answers].filter(Boolean);
}

function scoreSubmission(questions, answers, working = {}) {
  let autoScore = 0;
  let maxScore = 0;
  const feedback = questions.map((question, index) => {
    const key = question.id || `q${index + 1}`;
    const expected = question.answer || "";
    const submitted = answers?.[key] ?? answers?.[String(index)] ?? "";
    const workingText = working?.[key] ?? working?.[String(index)] ?? "";
    const mark = Number(question.marks) || 1;
    const options = acceptableAnswers(expected);
    const submittedClean = normaliseMathAnswer(submitted);
    const markable = Boolean(options.length && submittedClean);
    const correct = markable && options.includes(submittedClean);
    if (options.length) {
      maxScore += mark;
      if (correct) autoScore += mark;
    }
    return {
      id: key,
      submitted: cleanText(submitted, 500),
      correct,
      markable: Boolean(options.length),
      marks: mark,
      expected: expected ? cleanLongText(expected, 12000) : "",
      working: cleanLongText(workingText, 4000)
    };
  });
  return { auto_score: autoScore, max_score: maxScore, feedback };
}

function isMissingWorkingColumnError(error) {
  const text = [error?.code, error?.message, error?.details, error?.hint].filter(Boolean).join(" ");
  return /working|schema cache|column/i.test(text);
}

async function teacherProfile(req, supabase) {
  const { user, error: userError } = await getSignedInUser(req, supabase);
  if (userError) return { user: null, profile: null, error: userError };
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, school_id, trial_ends_at")
    .eq("id", user.id)
    .maybeSingle();
  if (profileError) return { user, profile: null, error: profileError.message };
  return { user, profile: profile || { id: user.id, email: user.email, role: "trial" }, error: null };
}

async function listTasks(req, res, supabase) {
  const { user, profile, error } = await teacherProfile(req, supabase);
  if (error) return sendJson(res, 401, { error });
  if (!canCreateClassTask(profile)) return sendJson(res, 403, { error: "Teacher access is required to view class tasks." });

  let query = supabase
    .from("class_tasks")
    .select(TASK_SELECT)
    .order("created_at", { ascending: false })
    .limit(30);
  if (normaliseRole(profile) !== "admin") query = query.eq("teacher_id", user.id);
  const { data: tasks, error: taskError } = await query;
  if (taskError) return sendJson(res, 500, { error: taskError.message });

  const taskIds = (tasks || []).map((task) => task.id);
  let responses = [];
  if (taskIds.length) {
    let responseResult = await supabase
      .from("class_task_responses")
      .select(RESPONSE_SELECT_WITH_WORKING)
      .in("task_id", taskIds)
      .order("submitted_at", { ascending: false });
    if (responseResult.error && isMissingWorkingColumnError(responseResult.error)) {
      responseResult = await supabase
        .from("class_task_responses")
        .select(RESPONSE_SELECT)
        .in("task_id", taskIds)
        .order("submitted_at", { ascending: false });
    }
    const { data, error: responseError } = responseResult;
    if (responseError) return sendJson(res, 500, { error: responseError.message });
    responses = data || [];
  }

  return sendJson(res, 200, {
    tasks: (tasks || []).map((task) => ({
      ...task,
      responses: responses.filter((response) => response.task_id === task.id)
    }))
  });
}

async function createTask(req, res, supabase) {
  const { user, profile, error } = await teacherProfile(req, supabase);
  if (error) return sendJson(res, 401, { error });
  if (!canCreateClassTask(profile)) return sendJson(res, 403, { error: "Teacher access is required to create pupil tasks." });

  const body = await readJsonBody(req);
  const questions = Array.isArray(body.questions) ? body.questions.slice(0, 40).map(cleanQuestion).filter((question) => question.question) : [];
  if (!questions.length) return sendJson(res, 400, { error: "Add at least one question before creating a class task." });

  const settings = {
    show_answers_after_submit: true,
    allow_multiple_submissions: Boolean(body.settings?.allow_multiple_submissions),
    source: "kaizen-class-task"
  };
  const expiresAt = body.expires_at ? new Date(body.expires_at) : null;

  let inserted = null;
  let insertError = null;
  for (let attempt = 0; attempt < 5 && !inserted; attempt += 1) {
    const joinCode = normaliseCode(body.join_code) || randomCode();
    const { data, error: taskError } = await supabase
      .from("class_tasks")
      .insert({
        teacher_id: user.id,
        school_id: profile.school_id || null,
        title: cleanText(body.title, 160) || "Kaizen Maths Class Task",
        instructions: cleanText(body.instructions, 900) || "Answer each question. Show working where appropriate.",
        source_tool_slug: cleanText(body.source_tool_slug, 100),
        source_tool_title: cleanText(body.source_tool_title, 160),
        source_level_label: cleanText(body.source_level_label, 160),
        source_type_label: cleanText(body.source_type_label, 160),
        join_code: joinCode,
        questions,
        settings,
        expires_at: expiresAt && !Number.isNaN(expiresAt.getTime()) ? expiresAt.toISOString() : null,
        is_active: true,
        updated_at: new Date().toISOString()
      })
      .select(TASK_SELECT)
      .single();
    if (data) inserted = data;
    insertError = taskError || null;
    if (taskError && !/duplicate|unique/i.test(taskError.message || "")) break;
  }

  if (!inserted) return sendJson(res, 500, { error: insertError?.message || "Could not create a unique class task code." });
  return sendJson(res, 200, { task: { ...inserted, responses: [] } });
}

async function getPublicTask(req, res, supabase) {
  const code = normaliseCode(queryParam(req, "code"));
  if (!code) return sendJson(res, 400, { error: "Enter a class task code." });

  const { data: task, error } = await supabase
    .from("class_tasks")
    .select(TASK_SELECT)
    .eq("join_code", code)
    .maybeSingle();
  if (error) return sendJson(res, 500, { error: error.message });
  if (!task || !taskIsAvailable(task)) return sendJson(res, 404, { error: "This class task was not found or has expired." });

  let schoolName = "";
  if (task.school_id) {
    const { data: school } = await supabase.from("schools").select("name").eq("id", task.school_id).maybeSingle();
    schoolName = school?.name || "";
  }

  return sendJson(res, 200, {
    task: {
      id: task.id,
      title: task.title,
      instructions: task.instructions,
      source_tool_title: task.source_tool_title,
      source_level_label: task.source_level_label,
      source_type_label: task.source_type_label,
      join_code: task.join_code,
      expires_at: task.expires_at,
      school_name: schoolName,
      settings: task.settings || {},
      questions: (task.questions || []).map(publicQuestion)
    }
  });
}

async function submitPublicTask(req, res, supabase) {
  const body = await readJsonBody(req);
  const code = normaliseCode(body.code);
  const pupilAlias = cleanText(body.pupil_alias, 80);
  if (!code) return sendJson(res, 400, { error: "Enter a class task code." });
  if (!pupilAlias) return sendJson(res, 400, { error: "Enter an alias or initials before submitting." });

  const { data: task, error } = await supabase
    .from("class_tasks")
    .select(TASK_SELECT)
    .eq("join_code", code)
    .maybeSingle();
  if (error) return sendJson(res, 500, { error: error.message });
  if (!task || !taskIsAvailable(task)) return sendJson(res, 404, { error: "This class task was not found or has expired." });

  if (!task.settings?.allow_multiple_submissions) {
    const { data: existing } = await supabase
      .from("class_task_responses")
      .select("id")
      .eq("task_id", task.id)
      .ilike("pupil_alias", pupilAlias)
      .limit(1);
    if (existing?.length) {
      return sendJson(res, 409, { error: "This alias has already submitted this task. Ask your teacher before trying again." });
    }
  }

  const answers = cleanStringMap(body.answers, 3000);
  const working = cleanStringMap(body.working, 8000);
  const marking = scoreSubmission(task.questions || [], answers, working);
  const baseResponse = {
    task_id: task.id,
    pupil_alias: pupilAlias,
    answers,
    auto_score: marking.auto_score,
    max_score: marking.max_score,
    marking,
    submitted_at: new Date().toISOString()
  };
  let responseResult = await supabase
    .from("class_task_responses")
    .insert({ ...baseResponse, working })
    .select(SUBMISSION_SELECT_WITH_WORKING)
    .single();
  if (responseResult.error && isMissingWorkingColumnError(responseResult.error)) {
    responseResult = await supabase
      .from("class_task_responses")
      .insert(baseResponse)
      .select(SUBMISSION_SELECT)
      .single();
    if (responseResult.data) responseResult.data.working = working;
  }
  const { data: response, error: responseError } = responseResult;
  if (responseError) return sendJson(res, 500, { error: responseError.message });

  return sendJson(res, 200, {
    response,
    show_answers: true,
    answers: (task.questions || []).map((question, index) => ({
      id: question.id || `q${index + 1}`,
      answer: question.answer || "",
      steps: question.steps || []
    }))
  });
}

async function closeTask(req, res, supabase) {
  const { user, profile, error } = await teacherProfile(req, supabase);
  if (error) return sendJson(res, 401, { error });
  if (!canCreateClassTask(profile)) return sendJson(res, 403, { error: "Teacher access is required to update class tasks." });
  const body = await readJsonBody(req);
  const taskId = cleanText(body.task_id, 80);
  if (!taskId) return sendJson(res, 400, { error: "Missing task id." });

  let query = supabase
    .from("class_tasks")
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq("id", taskId);
  if (normaliseRole(profile) !== "admin") query = query.eq("teacher_id", user.id);
  const { error: updateError } = await query;
  if (updateError) return sendJson(res, 500, { error: updateError.message });
  return sendJson(res, 200, { ok: true });
}

module.exports = async function handler(req, res) {
  const action = queryParam(req, "action");
  const supabase = supabaseAdmin();

  try {
    if (req.method === "GET" && action === "list") return listTasks(req, res, supabase);
    if (req.method === "POST" && action === "create") return createTask(req, res, supabase);
    if (req.method === "GET" && action === "get") return getPublicTask(req, res, supabase);
    if (req.method === "POST" && action === "submit") return submitPublicTask(req, res, supabase);
    if (req.method === "POST" && action === "close") return closeTask(req, res, supabase);

    res.setHeader("Allow", "GET, POST");
    return sendJson(res, 405, { error: "Unsupported class task action." });
  } catch (error) {
    console.error("Class task error:", error);
    if (String(error?.message || "").startsWith("Missing ")) {
      return sendJson(res, 500, { error: `Class tasks are not fully configured. ${error.message}.` });
    }
    return sendJson(res, 500, { error: error.message || "Class task request failed." });
  }
};
