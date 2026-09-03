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
const RESPONSE_SELECT_WITH_WORKING = "id, task_id, pupil_alias, answers, working, working_images, auto_score, max_score, marking, reviewed, teacher_notes, submitted_at";
const SUBMISSION_SELECT = "id, pupil_alias, answers, auto_score, max_score, marking, submitted_at";
const SUBMISSION_SELECT_WITH_WORKING = "id, pupil_alias, answers, working, working_images, auto_score, max_score, marking, submitted_at";
const PARTICIPANT_SELECT = "id, task_id, pupil_alias, status, current_attempt, submissions_count, last_score, max_score, pass_met, first_seen_at, last_seen_at";
const SCHOOL_PUPIL_MODULE_SELECT = "id, name, pupil_module_enabled, is_active";
const CLASS_GROUP_SELECT = "id, teacher_id, school_id, name, notes, is_active, created_at, updated_at";
const CLASS_GROUP_MEMBER_SELECT = "id, group_id, pupil_alias, pupil_code, notes, is_active, created_at, updated_at";

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

function cleanImageDataMap(value, maxValueLength = 650000) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value)
      .slice(0, 40)
      .map(([key, entry]) => [cleanText(key, 80), String(entry || "").trim().slice(0, maxValueLength)])
      .filter(([key, entry]) => key && /^data:image\/(?:png|jpeg);base64,[A-Za-z0-9+/=]+$/i.test(entry))
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

function normalisePupilCode(value) {
  return String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 16);
}

function normaliseRole(profile) {
  return String(profile?.role || "").toLowerCase();
}

function canManagePupilModule(profile, school = null) {
  const role = normaliseRole(profile);
  if (role === "admin") return true;
  return role === "school"
    && Boolean(profile?.school_id)
    && school?.is_active !== false
    && school?.pupil_module_enabled === true;
}

function pupilModuleAccessMessage(school = null) {
  if (school?.pupil_module_schema_missing) {
    return "Run the latest Supabase schema, then enable the pupil module for this school or tutor organisation.";
  }
  return "Pupil tasks are only available for school or tutor organisations with the pupil module enabled.";
}

function isMissingPupilModuleColumnError(error) {
  const text = [error?.code, error?.message, error?.details, error?.hint].filter(Boolean).join(" ");
  return /pupil_module_enabled|schema cache|column/i.test(text);
}

async function schoolForPupilModule(supabase, schoolId) {
  if (!schoolId) return null;
  const { data, error } = await supabase
    .from("schools")
    .select(SCHOOL_PUPIL_MODULE_SELECT)
    .eq("id", schoolId)
    .maybeSingle();
  if (error && isMissingPupilModuleColumnError(error)) {
    return { id: schoolId, name: "", pupil_module_enabled: false, is_active: true, pupil_module_schema_missing: true };
  }
  if (error) throw error;
  return data || null;
}

async function requirePupilModuleManager(res, supabase, profile) {
  const school = normaliseRole(profile) === "school"
    ? await schoolForPupilModule(supabase, profile.school_id)
    : null;
  if (!canManagePupilModule(profile, school)) {
    sendJson(res, 403, { error: pupilModuleAccessMessage(school) });
    return null;
  }
  return school || {};
}

function taskHasPupilModuleFlag(task) {
  return task?.settings?.source === "kaizen-class-task" && task.settings?.pupil_module_enabled === true;
}

async function taskPupilAccess(res, supabase, task) {
  if (!taskHasPupilModuleFlag(task)) {
    sendJson(res, 404, { error: "This pupil task is not available." });
    return null;
  }
  if (!task.school_id) return { schoolName: "" };
  const school = await schoolForPupilModule(supabase, task.school_id);
  if (!school || school.is_active === false || school.pupil_module_enabled !== true) {
    sendJson(res, 404, { error: "This pupil task is not available." });
    return null;
  }
  return { schoolName: school.name || "" };
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
      ? question.steps.slice(0, 24).map((step) => cleanLongText(step, 12000)).filter(Boolean)
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

function clampNumber(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.max(min, Math.min(max, number));
}

function taskPassPercent(settings = {}) {
  return clampNumber(settings.pass_percent, 0, 100, 0);
}

function taskMode(settings = {}) {
  const mode = String(settings.task_mode || settings.mode || "").toLowerCase();
  return mode === "practice_room" ? "practice_room" : "fixed_task";
}

function taskMinimumQuestions(settings = {}) {
  return clampNumber(settings.minimum_questions, 1, 40, clampNumber(settings.source_count, 1, 40, 5));
}

function taskTimeTargetMinutes(settings = {}) {
  return clampNumber(settings.time_target_minutes, 0, 180, 0);
}

function taskCoverageMode(settings = {}) {
  const mode = String(settings.coverage_mode || "").toLowerCase();
  return ["selected_type", "level_mix", "tool_mix"].includes(mode) ? mode : "selected_type";
}

function taskCoverageLabel(settings = {}) {
  if (taskCoverageMode(settings) === "tool_mix") return "Across levels";
  if (taskCoverageMode(settings) === "level_mix") return "Mixed question types";
  return "Selected question type";
}

function cleanActivity(activity = {}) {
  if (!activity || typeof activity !== "object") return {};
  const startedAt = activity.started_at ? new Date(activity.started_at) : null;
  const submittedAt = activity.submitted_at ? new Date(activity.submitted_at) : null;
  return {
    started_at: startedAt && !Number.isNaN(startedAt.getTime()) ? startedAt.toISOString() : "",
    submitted_at: submittedAt && !Number.isNaN(submittedAt.getTime()) ? submittedAt.toISOString() : "",
    active_seconds: clampNumber(activity.active_seconds, 0, 21600, 0)
  };
}

function taskAttemptSets(settings = {}) {
  return Array.isArray(settings.attempt_sets) ? settings.attempt_sets : [];
}

function taskMaxAttempts(task) {
  const configured = clampNumber(task?.settings?.max_attempts, 1, 10, 0);
  if (configured) return configured;
  return 1 + taskAttemptSets(task?.settings).length;
}

function questionsForAttempt(task, attemptIndex = 0) {
  const index = clampNumber(attemptIndex, 0, 9, 0);
  if (index <= 0) return Array.isArray(task?.questions) ? task.questions : [];
  const attemptSet = taskAttemptSets(task?.settings).find((set) => Number(set?.attempt_index) === index);
  return Array.isArray(attemptSet?.questions) ? attemptSet.questions : null;
}

function publicTaskSettings(settings = {}) {
  return {
    show_answers_after_submit: true,
    allow_multiple_submissions: Boolean(settings.allow_multiple_submissions),
    pass_percent: taskPassPercent(settings),
    max_attempts: clampNumber(settings.max_attempts, 1, 10, 1),
    task_mode: taskMode(settings),
    coverage_mode: taskCoverageMode(settings),
    coverage_label: taskCoverageLabel(settings),
    minimum_questions: taskMinimumQuestions(settings),
    time_target_minutes: taskTimeTargetMinutes(settings),
    score_only_answered: Boolean(settings.score_only_answered),
    roster_required: taskUsesRoster(settings),
    class_group_name: cleanText(settings.class_group_name, 120)
  };
}

function markPassStatus(marking, settings = {}, attemptIndex = 0) {
  const passPercent = taskPassPercent(settings);
  const maxScore = Number(marking.max_score) || 0;
  const score = Number(marking.auto_score) || 0;
  const passRequired = passPercent > 0 && maxScore > 0;
  const passMark = passRequired ? Math.ceil((maxScore * passPercent) / 100) : 0;
  return {
    ...marking,
    pass_required: passRequired,
    pass_percent: passPercent,
    pass_mark: passMark,
    pass_met: passRequired ? score >= passMark : true,
    attempt_index: clampNumber(attemptIndex, 0, 9, 0),
    attempt_number: clampNumber(attemptIndex, 0, 9, 0) + 1
  };
}

function publicTaskForAttempt(task, schoolName = "", attemptIndex = 0) {
  const questions = questionsForAttempt(task, attemptIndex);
  if (!questions) return null;
  return {
    id: task.id,
    title: task.title,
    instructions: task.instructions,
    source_tool_title: task.source_tool_title,
    source_level_label: task.source_level_label,
    source_type_label: task.source_type_label,
    join_code: task.join_code,
    expires_at: task.expires_at,
    school_name: schoolName,
    class_group_name: cleanText(task.settings?.class_group_name, 120),
    settings: publicTaskSettings(task.settings || {}),
    attempt_index: clampNumber(attemptIndex, 0, 9, 0),
    attempt_number: clampNumber(attemptIndex, 0, 9, 0) + 1,
    max_attempts: taskMaxAttempts(task),
    questions: questions.map(publicQuestion)
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
    "⁺": "+",
    "⁻": "-",
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
  return String(value ?? "").replace(/[⁺⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (match) => `^${[...match].map((char) => superscriptMap[char] || "").join("")}`);
}

function normaliseMathAnswer(value) {
  let text = normaliseSuperscripts(stripHtml(value)).toLowerCase();
  text = text
    .replace(/\\dfrac/g, "\\frac")
    .replace(/\\frac\s*\{([^{}]+)\}\s*\{([^{}]+)\}/g, "$1/$2")
    .replace(/\(([^()]+)\)\s*\/\s*\(([^()]+)\)/g, "$1/$2")
    .replace(/\^\(([^()]+)\)/g, "^$1")
    .replace(/\\sqrt\s*\{([^{}]+)\}/g, "sqrt($1)")
    .replace(/\b(-?\d+|[a-z][a-z0-9]*)\s+over\s+(-?\d+|[a-z][a-z0-9]*)\b/g, "$1/$2")
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

function answerVariants(value) {
  const answers = new Set();
  String(value ?? "").split(/\bor\b|\/\//i).forEach((part) => {
    const option = normaliseMathAnswer(part);
    if (option) answers.add(option);
    const withoutVariable = option.replace(/^[a-z][a-z0-9_]*=/, "");
    if (withoutVariable) answers.add(withoutVariable);
  });
  return [...answers].filter(Boolean);
}

function acceptableAnswers(expected) {
  return answerVariants(expected);
}

function scoreSubmission(questions, answers, working = {}, options = {}) {
  let autoScore = 0;
  let maxScore = 0;
  let attemptedCount = 0;
  const feedback = questions.map((question, index) => {
    const key = question.id || `q${index + 1}`;
    const expected = question.answer || "";
    const submitted = answers?.[key] ?? answers?.[String(index)] ?? "";
    const workingText = working?.[key] ?? working?.[String(index)] ?? "";
    const mark = Number(question.marks) || 1;
    const accepted = acceptableAnswers(expected);
    const submittedClean = normaliseMathAnswer(submitted);
    const submittedVariants = answerVariants(submitted);
    const attempted = Boolean(submittedClean || String(workingText || "").trim());
    if (attempted) attemptedCount += 1;
    const scoreThisQuestion = !(options.scoreOnlyAnswered && !attempted);
    const markable = Boolean(accepted.length && scoreThisQuestion);
    const correct = Boolean(markable && submittedVariants.some((entry) => accepted.includes(entry)));
    if (accepted.length) {
      if (scoreThisQuestion) maxScore += mark;
      if (correct) autoScore += mark;
    }
    return {
      id: key,
      submitted: cleanText(submitted, 500),
      correct,
      markable: Boolean(accepted.length && scoreThisQuestion),
      attempted,
      marks: mark,
      expected: expected ? cleanLongText(expected, 12000) : "",
      working: cleanLongText(workingText, 4000)
    };
  });
  return { auto_score: autoScore, max_score: maxScore, questions_attempted: attemptedCount, questions_available: questions.length, feedback };
}

function isMissingWorkingColumnError(error) {
  const text = [error?.code, error?.message, error?.details, error?.hint].filter(Boolean).join(" ");
  return /working|schema cache|column/i.test(text);
}

function isMissingParticipantsTableError(error) {
  const text = [error?.code, error?.message, error?.details, error?.hint].filter(Boolean).join(" ");
  return /class_task_participants|schema cache|relation .*does not exist|could not find the table/i.test(text);
}

function isMissingClassGroupsTableError(error) {
  const text = [error?.code, error?.message, error?.details, error?.hint].filter(Boolean).join(" ");
  return /class_groups|class_group_members|schema cache|relation .*does not exist|could not find the table/i.test(text);
}

function normaliseAliasKey(value) {
  return cleanText(value, 80).toLowerCase();
}

function taskGroupId(taskOrSettings = {}) {
  const settings = taskOrSettings.settings || taskOrSettings;
  return cleanText(settings.class_group_id, 80);
}

function taskUsesRoster(taskOrSettings = {}) {
  const settings = taskOrSettings.settings || taskOrSettings;
  return Boolean(settings.roster_required && taskGroupId(settings));
}

function cleanRosterMembers(value) {
  const rows = Array.isArray(value) ? value : [];
  const seenAliases = new Set();
  const seenCodes = new Set();
  return rows
    .slice(0, 80)
    .map((member) => ({
      id: cleanText(member?.id, 80),
      pupil_alias: cleanText(member?.pupil_alias || member?.alias, 80),
      pupil_code: normalisePupilCode(member?.pupil_code || member?.code),
      notes: cleanLongText(member?.notes, 1000),
      is_active: member?.is_active === false ? false : true
    }))
    .filter((member) => member.pupil_alias && member.pupil_code)
    .filter((member) => {
      const aliasKey = normaliseAliasKey(member.pupil_alias);
      const codeKey = normalisePupilCode(member.pupil_code);
      if (seenAliases.has(aliasKey) || seenCodes.has(codeKey)) return false;
      seenAliases.add(aliasKey);
      seenCodes.add(codeKey);
      return true;
    });
}

function classGroupOwnerQuery(supabase, profile, groupId) {
  let query = supabase
    .from("class_groups")
    .select(CLASS_GROUP_SELECT)
    .eq("id", groupId);
  if (normaliseRole(profile) !== "admin") query = query.eq("teacher_id", profile.id);
  return query;
}

async function classGroupForTaskSettings(supabase, profile, settings = {}) {
  const groupId = taskGroupId(settings);
  if (!groupId) return null;
  const { data, error } = await classGroupOwnerQuery(supabase, profile, groupId)
    .maybeSingle();
  if (error) {
    if (isMissingClassGroupsTableError(error)) {
      const schemaError = new Error("Run the latest Supabase schema before using class rosters.");
      schemaError.schemaMissing = true;
      throw schemaError;
    }
    throw error;
  }
  return data || null;
}

async function resolvePupilIdentity(supabase, task, body) {
  if (!taskUsesRoster(task)) {
    const alias = cleanText(body.pupil_alias, 80);
    if (!alias) {
      const error = new Error(body.forSubmit ? "Enter an alias or initials before submitting." : "Enter an alias or initials before starting.");
      error.status = 400;
      throw error;
    }
    return { pupilAlias: alias, pupilCode: "", memberId: "" };
  }

  const pupilCode = normalisePupilCode(body.pupil_code);
  if (!pupilCode) {
    const error = new Error(body.forSubmit ? "Enter your pupil code before submitting." : "Enter your pupil code before starting.");
    error.status = 400;
    throw error;
  }

  const { data: members, error } = await supabase
    .from("class_group_members")
    .select(CLASS_GROUP_MEMBER_SELECT)
    .eq("group_id", taskGroupId(task))
    .eq("is_active", true)
    .limit(200);
  if (error) {
    if (isMissingClassGroupsTableError(error)) {
      const schemaError = new Error("Run the latest Supabase schema before pupils can use roster codes.");
      schemaError.schemaMissing = true;
      schemaError.status = 500;
      throw schemaError;
    }
    throw error;
  }

  const member = (members || []).find((row) => normalisePupilCode(row.pupil_code) === pupilCode);
  if (!member) {
    const error = new Error("This pupil code was not found for this task. Check the code with your teacher.");
    error.status = 404;
    throw error;
  }

  return {
    pupilAlias: member.pupil_alias,
    pupilCode: member.pupil_code,
    memberId: member.id
  };
}

function cleanParticipantStatus(value) {
  const status = cleanText(value, 40).toLowerCase();
  return ["joined", "submitted", "retrying", "completed"].includes(status) ? status : "joined";
}

async function participantsForTasks(supabase, taskIds = []) {
  if (!taskIds.length) return [];
  const { data, error } = await supabase
    .from("class_task_participants")
    .select(PARTICIPANT_SELECT)
    .in("task_id", taskIds)
    .order("last_seen_at", { ascending: false });
  if (error) {
    if (isMissingParticipantsTableError(error)) return [];
    throw error;
  }
  return data || [];
}

async function upsertParticipantForTask(supabase, task, pupilAlias, patch = {}) {
  const alias = cleanText(pupilAlias, 80);
  if (!task?.id || !alias) return null;
  const now = new Date().toISOString();
  const { data: existingRows, error: readError } = await supabase
    .from("class_task_participants")
    .select(PARTICIPANT_SELECT)
    .eq("task_id", task.id)
    .limit(250);
  if (readError) {
    if (isMissingParticipantsTableError(readError)) return null;
    throw readError;
  }

  const existing = (existingRows || []).find((participant) => normaliseAliasKey(participant.pupil_alias) === normaliseAliasKey(alias));
  let nextStatus = cleanParticipantStatus(patch.status || existing?.status || "joined");
  if (nextStatus === "joined" && existing?.pass_met) nextStatus = "completed";
  if (nextStatus === "joined" && Number(existing?.submissions_count || 0) > 0) nextStatus = "retrying";

  const payload = {
    pupil_alias: alias,
    status: nextStatus,
    current_attempt: clampNumber(patch.current_attempt, 1, 10, Number(existing?.current_attempt) || 1),
    last_seen_at: now
  };
  if (patch.increment_submissions) {
    payload.submissions_count = Math.max(0, Number(existing?.submissions_count) || 0) + 1;
  }
  if (patch.last_score !== undefined) payload.last_score = Number(patch.last_score);
  if (patch.max_score !== undefined) payload.max_score = Number(patch.max_score);
  if (patch.pass_met !== undefined) payload.pass_met = Boolean(patch.pass_met);

  const result = existing
    ? await supabase
      .from("class_task_participants")
      .update(payload)
      .eq("id", existing.id)
      .select(PARTICIPANT_SELECT)
      .single()
    : await supabase
      .from("class_task_participants")
      .insert({
        task_id: task.id,
        first_seen_at: now,
        submissions_count: patch.increment_submissions ? 1 : 0,
        pass_met: Boolean(patch.pass_met),
        ...payload
      })
      .select(PARTICIPANT_SELECT)
      .single();

  if (result.error) {
    if (isMissingParticipantsTableError(result.error)) return null;
    throw result.error;
  }
  return result.data || null;
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
  const school = await requirePupilModuleManager(res, supabase, profile);
  if (!school) return;

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
  let participants = [];
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
    try {
      participants = await participantsForTasks(supabase, taskIds);
    } catch (participantError) {
      return sendJson(res, 500, { error: participantError.message });
    }
  }

  return sendJson(res, 200, {
    tasks: (tasks || []).map((task) => ({
      ...task,
      responses: responses.filter((response) => response.task_id === task.id),
      participants: participants.filter((participant) => participant.task_id === task.id)
    }))
  });
}

async function createTask(req, res, supabase) {
  const { user, profile, error } = await teacherProfile(req, supabase);
  if (error) return sendJson(res, 401, { error });
  const school = await requirePupilModuleManager(res, supabase, profile);
  if (!school) return;

  const body = await readJsonBody(req);
  const questions = Array.isArray(body.questions) ? body.questions.slice(0, 40).map(cleanQuestion).filter((question) => question.question) : [];
  if (!questions.length) return sendJson(res, 400, { error: "Add at least one question before creating a pupil task." });

  const incomingSettings = body.settings && typeof body.settings === "object" ? body.settings : {};
  let classGroup = null;
  if (taskGroupId(incomingSettings)) {
    classGroup = await classGroupForTaskSettings(supabase, { ...profile, id: user.id }, incomingSettings);
    if (!classGroup || classGroup.is_active === false) {
      return sendJson(res, 400, { error: "Choose an active class roster, or leave the class tracker blank." });
    }
  }
  const mode = taskMode(incomingSettings);
  const attemptSets = taskAttemptSets(incomingSettings)
    .slice(0, 9)
    .map((set, setIndex) => ({
      attempt_index: clampNumber(set?.attempt_index, 1, 9, setIndex + 1),
      questions: Array.isArray(set?.questions)
        ? set.questions.slice(0, 40).map(cleanQuestion).filter((question) => question.question)
        : []
    }))
    .filter((set) => set.questions.length);
  const settings = {
    show_answers_after_submit: true,
    allow_multiple_submissions: Boolean(incomingSettings.allow_multiple_submissions),
    pass_percent: taskPassPercent(incomingSettings),
    max_attempts: Math.max(1, Math.min(10, 1 + attemptSets.length)),
    attempt_sets: attemptSets,
    task_mode: mode,
    coverage_mode: taskCoverageMode(incomingSettings),
    minimum_questions: taskMinimumQuestions(incomingSettings),
    time_target_minutes: taskTimeTargetMinutes(incomingSettings),
    score_only_answered: mode === "practice_room" || Boolean(incomingSettings.score_only_answered),
    source_level_id: cleanText(incomingSettings.source_level_id, 80),
    source_type_id: cleanText(incomingSettings.source_type_id, 120),
    source_count: clampNumber(incomingSettings.source_count, 1, 40, questions.length),
    source_marks: clampNumber(incomingSettings.source_marks, 1, 20, 1),
    class_group_id: classGroup?.id || "",
    class_group_name: classGroup?.name || "",
    roster_required: Boolean(classGroup?.id),
    source: "kaizen-class-task",
    pupil_module_enabled: true,
    pupil_module_owner: profile.school_id ? "school" : "admin"
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
        school_id: profile.school_id || school.id || null,
        title: cleanText(body.title, 160) || "Kaizen Maths Pupil Task",
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

  if (!inserted) return sendJson(res, 500, { error: insertError?.message || "Could not create a unique pupil task code." });
  return sendJson(res, 200, { task: { ...inserted, responses: [] } });
}

async function getPublicTask(req, res, supabase) {
  const code = normaliseCode(queryParam(req, "code"));
  if (!code) return sendJson(res, 400, { error: "Enter a pupil task code." });

  const { data: task, error } = await supabase
    .from("class_tasks")
    .select(TASK_SELECT)
    .eq("join_code", code)
    .maybeSingle();
  if (error) return sendJson(res, 500, { error: error.message });
  if (!task || !taskIsAvailable(task)) return sendJson(res, 404, { error: "This pupil task was not found or has expired." });
  const access = await taskPupilAccess(res, supabase, task);
  if (!access) return;

  return sendJson(res, 200, {
    task: publicTaskForAttempt(task, access.schoolName, 0)
  });
}

async function joinPublicTask(req, res, supabase) {
  const body = await readJsonBody(req);
  const code = normaliseCode(body.code);
  const attemptIndex = clampNumber(body.attempt_index, 0, 9, 0);
  if (!code) return sendJson(res, 400, { error: "Enter a pupil task code." });

  const { data: task, error } = await supabase
    .from("class_tasks")
    .select(TASK_SELECT)
    .eq("join_code", code)
    .maybeSingle();
  if (error) return sendJson(res, 500, { error: error.message });
  if (!task || !taskIsAvailable(task)) return sendJson(res, 404, { error: "This pupil task was not found or has expired." });
  const access = await taskPupilAccess(res, supabase, task);
  if (!access) return;

  try {
    const identity = await resolvePupilIdentity(supabase, task, body);
    const participant = await upsertParticipantForTask(supabase, task, identity.pupilAlias, {
      status: "joined",
      current_attempt: attemptIndex + 1
    });
    return sendJson(res, 200, {
      participant: participant ? {
        ...participant,
        pupil_code: identity.pupilCode,
        class_group_member_id: identity.memberId
      } : null
    });
  } catch (participantError) {
    if (isMissingParticipantsTableError(participantError)) return sendJson(res, 200, { participant: null });
    return sendJson(res, participantError.status || 500, { error: participantError.message });
  }
}

async function submitPublicTask(req, res, supabase) {
  const body = await readJsonBody(req);
  const code = normaliseCode(body.code);
  const attemptIndex = clampNumber(body.attempt_index, 0, 9, 0);
  if (!code) return sendJson(res, 400, { error: "Enter a pupil task code." });

  const { data: task, error } = await supabase
    .from("class_tasks")
    .select(TASK_SELECT)
    .eq("join_code", code)
    .maybeSingle();
  if (error) return sendJson(res, 500, { error: error.message });
  if (!task || !taskIsAvailable(task)) return sendJson(res, 404, { error: "This pupil task was not found or has expired." });
  const access = await taskPupilAccess(res, supabase, task);
  if (!access) return;
  let identity = null;
  try {
    identity = await resolvePupilIdentity(supabase, task, { ...body, forSubmit: true });
  } catch (identityError) {
    return sendJson(res, identityError.status || 500, { error: identityError.message });
  }

  const passPercent = taskPassPercent(task.settings || {});
  if (!task.settings?.allow_multiple_submissions) {
    const { data: existing } = await supabase
      .from("class_task_responses")
      .select("id, marking")
      .eq("task_id", task.id)
      .ilike("pupil_alias", identity.pupilAlias)
      .limit(20);
    const hasCompleted = (existing || []).some((response) => response.marking?.pass_met);
    const hasSameAttempt = (existing || []).some((response) => Number(response.marking?.attempt_index || 0) === attemptIndex);
    if ((!passPercent && existing?.length) || hasCompleted || hasSameAttempt) {
      return sendJson(res, 409, { error: "This alias has already submitted this task. Ask your teacher before trying again." });
    }
  }

  const attemptQuestions = questionsForAttempt(task, attemptIndex);
  if (!attemptQuestions) return sendJson(res, 404, { error: "This task attempt is not available. Ask your teacher for a new code." });

  const answers = cleanStringMap(body.answers, 3000);
  const working = cleanStringMap(body.working, 8000);
  const workingImages = cleanImageDataMap(body.working_images);
  const scored = scoreSubmission(attemptQuestions, answers, working, {
    scoreOnlyAnswered: Boolean(task.settings?.score_only_answered)
  });
  const marking = markPassStatus({
    ...scored,
    activity: cleanActivity(body.activity),
    class_group_member_id: identity.memberId,
    pupil_code: identity.pupilCode
  }, task.settings || {}, attemptIndex);
  const baseResponse = {
    task_id: task.id,
    pupil_alias: identity.pupilAlias,
    answers,
    auto_score: marking.auto_score,
    max_score: marking.max_score,
    marking,
    submitted_at: new Date().toISOString()
  };
  let responseResult = await supabase
    .from("class_task_responses")
    .insert({ ...baseResponse, working, working_images: workingImages })
    .select(SUBMISSION_SELECT_WITH_WORKING)
    .single();
  if (responseResult.error && isMissingWorkingColumnError(responseResult.error)) {
    responseResult = await supabase
      .from("class_task_responses")
      .insert({ ...baseResponse, working })
      .select(SUBMISSION_SELECT)
      .single();
    if (responseResult.data) {
      responseResult.data.working = working;
      responseResult.data.working_images = workingImages;
    }
  }
  const { data: response, error: responseError } = responseResult;
  if (responseError) return sendJson(res, 500, { error: responseError.message });

  const nextTask = marking.pass_required && !marking.pass_met
    ? publicTaskForAttempt(task, access.schoolName, attemptIndex + 1)
    : null;
  let participant = null;
  try {
    participant = await upsertParticipantForTask(supabase, task, identity.pupilAlias, {
      status: marking.pass_met ? "completed" : nextTask ? "retrying" : "submitted",
      current_attempt: marking.attempt_number,
      last_score: marking.auto_score,
      max_score: marking.max_score,
      pass_met: marking.pass_met,
      increment_submissions: true
    });
  } catch (participantError) {
    if (!isMissingParticipantsTableError(participantError)) {
      console.warn("Class task participant update failed:", participantError.message);
    }
  }

  return sendJson(res, 200, {
    response,
    participant: participant ? {
      ...participant,
      pupil_code: identity.pupilCode,
      class_group_member_id: identity.memberId
    } : null,
    show_answers: true,
    answers: attemptQuestions.map((question, index) => ({
      id: question.id || `q${index + 1}`,
      answer: question.answer || "",
      steps: question.steps || []
    })),
    next_task: nextTask
  });
}

async function reviewResponse(req, res, supabase) {
  const { user, profile, error } = await teacherProfile(req, supabase);
  if (error) return sendJson(res, 401, { error });
  const school = await requirePupilModuleManager(res, supabase, profile);
  if (!school) return;

  const body = await readJsonBody(req);
  const taskId = cleanText(body.task_id, 80);
  const responseId = cleanText(body.response_id, 80);
  if (!taskId || !responseId) return sendJson(res, 400, { error: "Missing task or response id." });

  let taskQuery = supabase
    .from("class_tasks")
    .select("id, teacher_id")
    .eq("id", taskId);
  if (normaliseRole(profile) !== "admin") taskQuery = taskQuery.eq("teacher_id", user.id);
  const { data: task, error: taskError } = await taskQuery.maybeSingle();
  if (taskError) return sendJson(res, 500, { error: taskError.message });
  if (!task) return sendJson(res, 403, { error: "You cannot review this response." });

  let updateResult = await supabase
    .from("class_task_responses")
    .update({
      teacher_notes: cleanLongText(body.teacher_notes, 4000),
      reviewed: Boolean(body.reviewed)
    })
    .eq("id", responseId)
    .eq("task_id", task.id)
    .select(RESPONSE_SELECT_WITH_WORKING)
    .single();
  if (updateResult.error && isMissingWorkingColumnError(updateResult.error)) {
    updateResult = await supabase
      .from("class_task_responses")
      .update({
        teacher_notes: cleanLongText(body.teacher_notes, 4000),
        reviewed: Boolean(body.reviewed)
      })
      .eq("id", responseId)
      .eq("task_id", task.id)
      .select(RESPONSE_SELECT)
      .single();
  }
  const { data: response, error: updateError } = updateResult;
  if (updateError) return sendJson(res, 500, { error: updateError.message });
  return sendJson(res, 200, { response });
}

async function closeTask(req, res, supabase) {
  const { user, profile, error } = await teacherProfile(req, supabase);
  if (error) return sendJson(res, 401, { error });
  const school = await requirePupilModuleManager(res, supabase, profile);
  if (!school) return;
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

async function groupsWithMembers(supabase, groups = []) {
  const groupIds = groups.map((group) => group.id).filter(Boolean);
  if (!groupIds.length) return groups;
  const { data: members, error } = await supabase
    .from("class_group_members")
    .select(CLASS_GROUP_MEMBER_SELECT)
    .in("group_id", groupIds)
    .order("pupil_alias", { ascending: true });
  if (error) throw error;
  return groups.map((group) => ({
    ...group,
    members: (members || []).filter((member) => member.group_id === group.id)
  }));
}

async function listGroups(req, res, supabase) {
  const { user, profile, error } = await teacherProfile(req, supabase);
  if (error) return sendJson(res, 401, { error });
  const school = await requirePupilModuleManager(res, supabase, profile);
  if (!school) return;

  try {
    let query = supabase
      .from("class_groups")
      .select(CLASS_GROUP_SELECT)
      .order("updated_at", { ascending: false })
      .limit(40);
    if (normaliseRole(profile) !== "admin") query = query.eq("teacher_id", user.id);
    const { data, error: groupsError } = await query;
    if (groupsError) throw groupsError;
    return sendJson(res, 200, { groups: await groupsWithMembers(supabase, data || []) });
  } catch (groupsError) {
    if (isMissingClassGroupsTableError(groupsError)) {
      return sendJson(res, 200, { groups: [], schema_missing: true });
    }
    return sendJson(res, 500, { error: groupsError.message });
  }
}

async function saveGroup(req, res, supabase) {
  const { user, profile, error } = await teacherProfile(req, supabase);
  if (error) return sendJson(res, 401, { error });
  const school = await requirePupilModuleManager(res, supabase, profile);
  if (!school) return;

  const body = await readJsonBody(req);
  const groupId = cleanText(body.id, 80);
  const rawMemberRows = Array.isArray(body.members)
    ? body.members
        .slice(0, 80)
        .filter((member) => cleanText(member?.pupil_alias || member?.alias, 80) || normalisePupilCode(member?.pupil_code || member?.code))
    : [];
  const members = cleanRosterMembers(body.members);
  const aliasSet = new Set(members.map((member) => normaliseAliasKey(member.pupil_alias)));
  const codeSet = new Set(members.map((member) => normalisePupilCode(member.pupil_code)));
  if (!cleanText(body.name, 120)) return sendJson(res, 400, { error: "Give the class tracker a name." });
  if (rawMemberRows.length !== members.length || aliasSet.size !== members.length || codeSet.size !== members.length) {
    return sendJson(res, 400, { error: "Each pupil alias and pupil code must be unique inside the class tracker." });
  }

  try {
    let savedGroup = null;
    if (groupId) {
      const { data: existing, error: readError } = await classGroupOwnerQuery(supabase, { ...profile, id: user.id }, groupId).maybeSingle();
      if (readError) throw readError;
      if (!existing) return sendJson(res, 403, { error: "You cannot edit this class tracker." });
      const { data, error: updateError } = await supabase
        .from("class_groups")
        .update({
          name: cleanText(body.name, 120),
          notes: cleanLongText(body.notes, 2000),
          is_active: body.is_active === false ? false : true,
          updated_at: new Date().toISOString()
        })
        .eq("id", groupId)
        .select(CLASS_GROUP_SELECT)
        .single();
      if (updateError) throw updateError;
      savedGroup = data;
    } else {
      const { data, error: insertError } = await supabase
        .from("class_groups")
        .insert({
          teacher_id: user.id,
          school_id: profile.school_id || school.id || null,
          name: cleanText(body.name, 120),
          notes: cleanLongText(body.notes, 2000),
          is_active: body.is_active === false ? false : true,
          updated_at: new Date().toISOString()
        })
        .select(CLASS_GROUP_SELECT)
        .single();
      if (insertError) throw insertError;
      savedGroup = data;
    }

    const { data: existingMembers, error: existingMembersError } = await supabase
      .from("class_group_members")
      .select(CLASS_GROUP_MEMBER_SELECT)
      .eq("group_id", savedGroup.id)
      .limit(200);
    if (existingMembersError) throw existingMembersError;

    const keepIds = new Set();
    for (const member of members) {
      const existing = (existingMembers || []).find((row) => (
        (member.id && row.id === member.id)
        || normalisePupilCode(row.pupil_code) === normalisePupilCode(member.pupil_code)
        || normaliseAliasKey(row.pupil_alias) === normaliseAliasKey(member.pupil_alias)
      ));
      const payload = {
        pupil_alias: member.pupil_alias,
        pupil_code: member.pupil_code,
        notes: member.notes,
        is_active: member.is_active,
        updated_at: new Date().toISOString()
      };
      if (existing) {
        const { data, error: updateError } = await supabase
          .from("class_group_members")
          .update(payload)
          .eq("id", existing.id)
          .select(CLASS_GROUP_MEMBER_SELECT)
          .single();
        if (updateError) throw updateError;
        keepIds.add(data.id);
      } else {
        const { data, error: insertError } = await supabase
          .from("class_group_members")
          .insert({
            group_id: savedGroup.id,
            ...payload
          })
          .select(CLASS_GROUP_MEMBER_SELECT)
          .single();
        if (insertError) throw insertError;
        keepIds.add(data.id);
      }
    }

    const retireIds = (existingMembers || [])
      .filter((member) => !keepIds.has(member.id))
      .map((member) => member.id);
    if (retireIds.length) {
      const { error: retireError } = await supabase
        .from("class_group_members")
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .in("id", retireIds);
      if (retireError) throw retireError;
    }

    const [group] = await groupsWithMembers(supabase, [savedGroup]);
    return sendJson(res, 200, { group });
  } catch (saveError) {
    if (isMissingClassGroupsTableError(saveError)) {
      return sendJson(res, 500, { error: "Run the latest Supabase schema before saving class trackers." });
    }
    return sendJson(res, 500, { error: saveError.message });
  }
}

async function archiveGroup(req, res, supabase) {
  const { user, profile, error } = await teacherProfile(req, supabase);
  if (error) return sendJson(res, 401, { error });
  const school = await requirePupilModuleManager(res, supabase, profile);
  if (!school) return;
  const body = await readJsonBody(req);
  const groupId = cleanText(body.id, 80);
  if (!groupId) return sendJson(res, 400, { error: "Missing class tracker id." });

  let query = supabase
    .from("class_groups")
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq("id", groupId);
  if (normaliseRole(profile) !== "admin") query = query.eq("teacher_id", user.id);
  const { error: updateError } = await query;
  if (updateError) {
    if (isMissingClassGroupsTableError(updateError)) {
      return sendJson(res, 500, { error: "Run the latest Supabase schema before archiving class trackers." });
    }
    return sendJson(res, 500, { error: updateError.message });
  }
  return sendJson(res, 200, { ok: true });
}

module.exports = async function handler(req, res) {
  const action = queryParam(req, "action");
  const supabase = supabaseAdmin();

  try {
    if (req.method === "GET" && action === "list") return listTasks(req, res, supabase);
    if (req.method === "GET" && action === "list-groups") return listGroups(req, res, supabase);
    if (req.method === "POST" && action === "create") return createTask(req, res, supabase);
    if (req.method === "POST" && action === "save-group") return saveGroup(req, res, supabase);
    if (req.method === "POST" && action === "archive-group") return archiveGroup(req, res, supabase);
    if (req.method === "GET" && action === "get") return getPublicTask(req, res, supabase);
    if (req.method === "POST" && action === "join") return joinPublicTask(req, res, supabase);
    if (req.method === "POST" && action === "submit") return submitPublicTask(req, res, supabase);
    if (req.method === "POST" && action === "review") return reviewResponse(req, res, supabase);
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
