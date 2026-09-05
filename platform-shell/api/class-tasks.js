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
const SUBMISSION_SELECT = "id, task_id, pupil_alias, answers, auto_score, max_score, marking, reviewed, teacher_notes, submitted_at";
const SUBMISSION_SELECT_WITH_WORKING = "id, task_id, pupil_alias, answers, working, working_images, auto_score, max_score, marking, reviewed, teacher_notes, submitted_at";
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

function cleanAnswerTemplate(template) {
  if (!template || typeof template !== "object") return null;
  const type = cleanText(template.type, 40);
  if (!["matrix", "column_vector"].includes(type)) return null;
  const rows = clampNumber(template.rows, 1, 5, 0);
  const cols = clampNumber(template.cols, 1, 5, 0);
  if (!rows || !cols) return null;
  if (type === "column_vector" && cols !== 1) return null;
  const defaultLabel = type === "column_vector" ? `${rows}-component column vector` : `${rows} by ${cols} matrix`;
  return {
    type,
    rows,
    cols,
    label: cleanText(template.label || defaultLabel, 80)
  };
}

function cleanQuestion(question, index) {
  const marks = Math.max(0, Math.min(20, Number(question?.marks || 1)));
  const answerTemplate = cleanAnswerTemplate(question?.answer_template || question?.answerTemplate);
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
    sectionType: cleanText(question?.sectionType || "", 120),
    ...(answerTemplate ? { answer_template: answerTemplate } : {})
  };
}

function publicQuestion(question, index) {
  const answerTemplate = cleanAnswerTemplate(question.answer_template || question.answerTemplate);
  return {
    id: question.id || `q${index + 1}`,
    question: question.question || "",
    diagram: question.diagram || "",
    marks: Number(question.marks) || 1,
    instruction: question.instruction || "",
    sectionTitle: question.sectionTitle || "",
    sectionType: question.sectionType || "",
    ...(answerTemplate ? { answer_template: answerTemplate } : {})
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
    allow_handwriting: taskAllowsHandwriting(settings),
    show_in_pupil_profile: taskShowsInPupilProfile(settings),
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

function responseAttemptIndex(response) {
  return clampNumber(response?.marking?.attempt_index, 0, 9, 0);
}

function shouldReturnPupilWork(task, response) {
  if (!response?.id) return false;
  if (!task?.settings?.allow_multiple_submissions) return true;
  return Boolean(response.reviewed || cleanLongText(response.teacher_notes, 4000));
}

function publicSubmissionForResponse(task, response, schoolName = "", participant = null) {
  const attemptIndex = responseAttemptIndex(response);
  const attemptQuestions = questionsForAttempt(task, attemptIndex) || [];
  const marking = response.marking || {};
  const nextTask = marking.pass_required && !marking.pass_met
    ? publicTaskForAttempt(task, schoolName, attemptIndex + 1)
    : null;
  return {
    response: {
      ...response,
      working: response.working || {},
      working_images: response.working_images || {},
      teacher_notes: response.teacher_notes || "",
      reviewed: Boolean(response.reviewed)
    },
    participant,
    returned_work: true,
    show_answers: true,
    answers: attemptQuestions.map((question, index) => ({
      id: question.id || `q${index + 1}`,
      answer: question.answer || "",
      steps: question.steps || []
    })),
    next_task: nextTask,
    task: publicTaskForAttempt(task, schoolName, attemptIndex)
  };
}

function responsePercent(response) {
  const score = Number(response?.auto_score);
  const max = Number(response?.max_score);
  if (!Number.isFinite(score) || !Number.isFinite(max) || max <= 0) return null;
  return Math.round((score / max) * 100);
}

function responseScoreLabel(response) {
  const score = Number(response?.auto_score);
  const max = Number(response?.max_score);
  if (!Number.isFinite(score) || !Number.isFinite(max) || max <= 0) return "Needs review";
  return `${score}/${max}`;
}

function rewardForResponse(response, task = {}, previousBestPercent = null) {
  if (!response?.id) {
    return {
      stars: 0,
      growth_star: false,
      total_stars: 0,
      labels: [],
      label: "No stars yet"
    };
  }
  const percent = responsePercent(response);
  const passRequired = Boolean(response?.marking?.pass_required) || taskPassPercent(task.settings || {}) > 0;
  const metTarget = Boolean(response?.marking?.pass_met) || (!passRequired && Number.isFinite(percent) && percent >= 80);
  const fullMarks = Number.isFinite(percent) && percent === 100;
  const strongMastery = Number.isFinite(percent) && percent >= 95;
  const improved = Number.isFinite(percent) && Number.isFinite(previousBestPercent) && percent > previousBestPercent;
  let stars = 1;
  const labels = ["Completed task"];
  if (metTarget) {
    stars = Math.max(stars, 2);
    labels.push("Met target");
  }
  if (fullMarks || strongMastery) {
    stars = Math.max(stars, 3);
    labels.push(fullMarks ? "Full marks" : "Strong mastery");
  }
  if (improved) labels.push("Improved from last best");
  const growthStar = Boolean(improved);
  const totalStars = stars + (growthStar ? 1 : 0);
  return {
    stars,
    growth_star: growthStar,
    total_stars: totalStars,
    labels,
    label: labels.join(" · ")
  };
}

function bestReward(rewards = []) {
  return rewards
    .slice()
    .sort((a, b) => Number(b.total_stars || 0) - Number(a.total_stars || 0) || Number(b.stars || 0) - Number(a.stars || 0))[0] || {
      stars: 0,
      growth_star: false,
      total_stars: 0,
      labels: [],
      label: "No stars yet"
    };
}

function rewardMapForTask(task, sortedResponses = []) {
  const rewardById = new Map();
  let previousBest = null;
  sortedResponses
    .slice()
    .sort((a, b) => String(a.submitted_at || "").localeCompare(String(b.submitted_at || "")))
    .forEach((response) => {
      const reward = rewardForResponse(response, task, previousBest);
      rewardById.set(response.id, reward);
      const percent = responsePercent(response);
      if (Number.isFinite(percent)) previousBest = previousBest === null ? percent : Math.max(previousBest, percent);
    });
  return rewardById;
}

function publicPupilSubmissionHistory(task, response, reward = null) {
  const attemptIndex = responseAttemptIndex(response);
  const attemptQuestions = questionsForAttempt(task, attemptIndex) || [];
  const feedback = Array.isArray(response?.marking?.feedback) ? response.marking.feedback : [];
  const feedbackById = new Map(feedback.map((item, index) => [item.id || `q${index + 1}`, item]));
  const submittedAnswers = response.answers || {};
  const submittedWorking = response.working || {};
  return {
    id: response.id,
    attempt_number: response?.marking?.attempt_number || attemptIndex + 1,
    submitted_at: response.submitted_at,
    score: Number(response.auto_score) || 0,
    max_score: Number(response.max_score) || 0,
    score_label: responseScoreLabel(response),
    percent: responsePercent(response),
    reward: reward || rewardForResponse(response, task),
    pass_met: Boolean(response?.marking?.pass_met),
    reviewed: Boolean(response.reviewed),
    teacher_notes: cleanLongText(response.teacher_notes, 4000),
    questions: attemptQuestions.map((question, index) => {
      const id = question.id || `q${index + 1}`;
      const item = feedbackById.get(id) || feedbackById.get(`q${index + 1}`) || {};
      return {
        id,
        question: question.question || "",
        submitted: cleanLongText(submittedAnswers[id] ?? submittedAnswers[String(index)] ?? item.submitted ?? "", 3000),
        expected: cleanLongText(item.expected || question.answer || "", 12000),
        correct: Boolean(item.correct),
        markable: item.markable !== false,
        working: cleanLongText(submittedWorking[id] ?? submittedWorking[String(index)] ?? item.working ?? "", 4000),
        steps: Array.isArray(question.steps) ? question.steps.slice(0, 24) : []
      };
    })
  };
}

function publicPupilTaskProgress(task, responses = []) {
  const sortedResponses = responses
    .slice()
    .sort((a, b) => String(b.submitted_at || "").localeCompare(String(a.submitted_at || "")));
  const rewardById = rewardMapForTask(task, sortedResponses);
  const rewards = sortedResponses.map((response) => rewardById.get(response.id) || rewardForResponse(response, task));
  const latest = sortedResponses[0] || null;
  const best = sortedResponses
    .slice()
    .sort((a, b) => (responsePercent(b) ?? -1) - (responsePercent(a) ?? -1))[0] || null;
  const passRequired = sortedResponses.some((response) => response?.marking?.pass_required) || taskPassPercent(task.settings || {}) > 0;
  const mastered = sortedResponses.some((response) => response?.marking?.pass_met) || (!passRequired && sortedResponses.length > 0);
  const status = mastered ? "mastered" : sortedResponses.length ? "needs_retry" : "assigned";
  return {
    id: task.id,
    title: task.title || "Kaizen Maths Pupil Task",
    join_code: task.join_code,
    source_tool_title: task.source_tool_title || "",
    source_type_label: task.source_type_label || "",
    source_level_label: task.source_level_label || "",
    submitted_count: sortedResponses.length,
    status,
    mastered,
    completed: sortedResponses.length > 0,
    reviewed: latest ? Boolean(latest.reviewed) : false,
    latest_submitted_at: latest?.submitted_at || "",
    latest_score_label: latest ? responseScoreLabel(latest) : "Not started",
    latest_percent: responsePercent(latest),
    best_percent: responsePercent(best),
    latest_reward: latest ? rewardById.get(latest.id) || rewardForResponse(latest, task) : bestReward([]),
    best_reward: bestReward(rewards),
    total_stars: Number(bestReward(rewards).total_stars || 0),
    growth_stars: rewards.filter((reward) => reward.growth_star).length,
    pass_percent: taskPassPercent(task.settings || {}),
    submissions: sortedResponses.slice(0, 5).map((response) => publicPupilSubmissionHistory(task, response, rewardById.get(response.id)))
  };
}

function publicPupilProfile(tasks = [], responses = [], identity = {}, groupName = "") {
  const aliasKey = normaliseAliasKey(identity.pupilAlias);
  const pupilCodeKey = normalisePupilCode(identity.pupilCode);
  const visibleTasks = tasks
    .filter((task) => taskHasPupilModuleFlag(task))
    .filter((task) => taskShowsInPupilProfile(task))
    .sort((a, b) => String(b.created_at || "").localeCompare(String(a.created_at || "")));
  const responseMatchesPupil = (response) => {
    const responseAliasKey = normaliseAliasKey(response.pupil_alias);
    const responseCodeKey = normalisePupilCode(response?.marking?.pupil_code || response?.pupil_code);
    return Boolean((aliasKey && responseAliasKey === aliasKey) || (pupilCodeKey && responseCodeKey === pupilCodeKey));
  };
  const items = visibleTasks.map((task) => publicPupilTaskProgress(
    task,
    responses.filter((response) => response.task_id === task.id && responseMatchesPupil(response))
  ));
  const completed = items.filter((item) => item.completed).length;
  const mastered = items.filter((item) => item.mastered).length;
  const attempts = items.reduce((sum, item) => sum + item.submitted_count, 0);
  const totalStars = items.reduce((sum, item) => sum + Number(item.total_stars || 0), 0);
  const growthStars = items.reduce((sum, item) => sum + Number(item.growth_stars || 0), 0);
  const percentages = items.map((item) => item.best_percent).filter((value) => Number.isFinite(value));
  const averageBest = percentages.length
    ? Math.round(percentages.reduce((sum, value) => sum + value, 0) / percentages.length)
    : null;
  return {
    pupil_alias: identity.pupilAlias || "",
    pupil_code: identity.pupilCode || "",
    class_group_name: groupName || "",
    summary: {
      assigned: items.length,
      completed,
      mastered,
      attempts,
      total_stars: totalStars,
      growth_stars: growthStars,
      average_best_percent: averageBest
    },
    tasks: items
  };
}

function decodeCommonMathEntities(value, options = {}) {
  const decodeAngles = options.decodeAngles !== false;
  let text = String(value ?? "");
  for (let pass = 0; pass < 2; pass += 1) {
    text = text
      .replace(/&amp;(nbsp|minus|times|divide|plusmn|leq?|geq?|lt|gt|deg|pound|pi|mu|theta|sigma|radic);/gi, "&$1;")
      .replace(/&amp;#(\d+);/gi, "&#$1;");
  }
  text = text
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&minus;|&#8722;/gi, "−")
    .replace(/&times;|&#215;/gi, "×")
    .replace(/&divide;|&#247;/gi, "÷")
    .replace(/&plusmn;|&#177;/gi, "±")
    .replace(/&leq;|&le;|&#8804;/gi, "≤")
    .replace(/&geq;|&ge;|&#8805;/gi, "≥")
    .replace(/&deg;|&#176;/gi, "°")
    .replace(/&pound;|&#163;/gi, "£")
    .replace(/&pi;|&#960;/gi, "π")
    .replace(/&mu;|&#956;/gi, "μ")
    .replace(/&theta;|&#952;/gi, "θ")
    .replace(/&sigma;|&#963;/gi, "σ")
    .replace(/&radic;|&#8730;/gi, "√")
    .replace(/&#039;|&apos;/gi, "'")
    .replace(/&quot;/gi, "\"");
  if (decodeAngles) {
    text = text
      .replace(/&lt;|&#60;/gi, "<")
      .replace(/&gt;|&#62;/gi, ">");
  }
  return text.replace(/&amp;/gi, "&");
}

function stripHtml(value) {
  return decodeCommonMathEntities(String(value ?? "")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
  );
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
    .replace(/\\frac\s*\{([^{}]+)\}\s*\{([^{}]+)\}/g, "($1)/($2)")
    .replace(/\(([^()]+)\)\s*\/\s*\(([^()]+)\)/g, "($1)/($2)")
    .replace(/\^\(([^()]+)\)/g, "^$1")
    .replace(/\\sqrt\s*\{([^{}]+)\}/g, "sqrt($1)")
    .replace(/\b(-?\d+|[a-z][a-z0-9]*)\s+over\s+(-?\d+|[a-z][a-z0-9]*)\b/g, "$1/$2")
    .replace(/\\left|\\right/g, "")
    .replace(/\\(sin|cos|tan|sec|csc|cot|ln|log)/g, "$1")
    .replace(/\\times|×/g, "*")
    .replace(/\\cdot|·/g, "*")
    .replace(/\\div|÷/g, "/")
    .replace(/\\leq?|≤/g, "<=")
    .replace(/\\geq?|≥/g, ">=")
    .replace(/\\pi|π/g, "pi")
    .replace(/√\s*\(([^()]+)\)/g, "sqrt($1)")
    .replace(/√\s*([a-z0-9.]+)/g, "sqrt($1)")
    .replace(/[−–—]/g, "-")
    .replace(/\\\(|\\\)|\\\[|\\\]|\$|\{|\}/g, "")
    .replace(/\btherefore\b|\banswer\b|\bresult\b/g, "")
    .replace(/\b([a-z])([2-9])\b/g, "$1^$2")
    .replace(/\s+/g, "");
  return text.replace(/[.;,]+$/g, "");
}

const mathKnownNames = ["sqrt", "sin", "cos", "tan", "sec", "csc", "cot", "ln", "log", "abs", "pi"];
const mathFunctionNames = new Set(mathKnownNames.filter((name) => name !== "pi"));
const mathSampleValues = [-5, -3, -2, -1, -0.5, 0, 0.5, 1, 2, 3, 5, 7, 11];

function mathTokens(value) {
  const source = String(value || "").replace(/\s+/g, "");
  const tokens = [];
  let index = 0;
  while (index < source.length) {
    const char = source[index];
    if (/[0-9.]/.test(char)) {
      const match = source.slice(index).match(/^(?:\d+(?:\.\d*)?|\.\d+)/);
      if (!match) return null;
      tokens.push({ type: "number", value: Number(match[0]) });
      index += match[0].length;
      continue;
    }
    if (/[a-z]/.test(char)) {
      const tail = source.slice(index);
      const known = mathKnownNames.find((name) => tail.startsWith(name));
      if (known) {
        tokens.push({ type: "name", value: known });
        index += known.length;
      } else {
        tokens.push({ type: "name", value: char });
        index += 1;
      }
      continue;
    }
    if ("+-*/^(),".includes(char)) {
      tokens.push({ type: "operator", value: char });
      index += 1;
      continue;
    }
    return null;
  }
  return tokens;
}

function parseMathExpression(value) {
  const tokens = mathTokens(value);
  if (!tokens || !tokens.length) return null;
  let index = 0;
  const current = () => tokens[index] || null;
  const take = (valueToTake) => {
    if (current()?.value !== valueToTake) return false;
    index += 1;
    return true;
  };
  const startsPrimary = (token) => Boolean(token && (token.type === "number" || token.type === "name" || token.value === "("));

  function parseAddSub() {
    let node = parseMulDiv();
    if (!node) return null;
    while (current()?.value === "+" || current()?.value === "-") {
      const operator = current().value;
      index += 1;
      const right = parseMulDiv();
      if (!right) return null;
      node = { type: "binary", operator, left: node, right };
    }
    return node;
  }

  function parseMulDiv() {
    let node = parseUnary();
    if (!node) return null;
    while (current()?.value === "*" || current()?.value === "/" || startsPrimary(current())) {
      const implicit = startsPrimary(current());
      const operator = implicit ? "*" : current().value;
      if (!implicit) index += 1;
      const right = parseUnary();
      if (!right) return null;
      node = { type: "binary", operator, left: node, right };
    }
    return node;
  }

  function parseUnary() {
    if (take("+")) return parseUnary();
    if (take("-")) {
      const argument = parseUnary();
      return argument ? { type: "unary", operator: "-", argument } : null;
    }
    return parsePower();
  }

  function parsePower() {
    let node = parsePrimary();
    if (!node) return null;
    if (take("^")) {
      const right = parseUnary();
      if (!right) return null;
      node = { type: "binary", operator: "^", left: node, right };
    }
    return node;
  }

  function parsePrimary() {
    const token = current();
    if (!token) return null;
    if (token.type === "number") {
      index += 1;
      return { type: "number", value: token.value };
    }
    if (token.value === "(") {
      index += 1;
      const node = parseAddSub();
      if (!take(")")) return null;
      return node;
    }
    if (token.type === "name") {
      index += 1;
      if (token.value === "pi") return { type: "number", value: Math.PI };
      if (mathFunctionNames.has(token.value) && startsPrimary(current())) {
        const argument = parsePrimary();
        return argument ? { type: "function", name: token.value, argument } : null;
      }
      return { type: "variable", name: token.value };
    }
    return null;
  }

  const ast = parseAddSub();
  return ast && index === tokens.length ? ast : null;
}

function evaluateMathAst(node, variables = {}) {
  if (!node) return NaN;
  if (node.type === "number") return node.value;
  if (node.type === "variable") return Object.prototype.hasOwnProperty.call(variables, node.name) ? variables[node.name] : NaN;
  if (node.type === "unary") return -evaluateMathAst(node.argument, variables);
  if (node.type === "function") {
    const value = evaluateMathAst(node.argument, variables);
    if (!Number.isFinite(value)) return NaN;
    if (node.name === "sqrt") return value < -1e-10 ? NaN : Math.sqrt(Math.max(0, value));
    if (node.name === "sin") return Math.sin(value);
    if (node.name === "cos") return Math.cos(value);
    if (node.name === "tan") return Math.abs(Math.cos(value)) < 1e-10 ? NaN : Math.tan(value);
    if (node.name === "sec") return Math.abs(Math.cos(value)) < 1e-10 ? NaN : 1 / Math.cos(value);
    if (node.name === "csc") return Math.abs(Math.sin(value)) < 1e-10 ? NaN : 1 / Math.sin(value);
    if (node.name === "cot") return Math.abs(Math.sin(value)) < 1e-10 ? NaN : 1 / Math.tan(value);
    if (node.name === "ln") return value <= 0 ? NaN : Math.log(value);
    if (node.name === "log") return value <= 0 ? NaN : Math.log10(value);
    if (node.name === "abs") return Math.abs(value);
    return NaN;
  }
  if (node.type !== "binary") return NaN;
  const left = evaluateMathAst(node.left, variables);
  const right = evaluateMathAst(node.right, variables);
  if (!Number.isFinite(left) || !Number.isFinite(right)) return NaN;
  if (node.operator === "+") return left + right;
  if (node.operator === "-") return left - right;
  if (node.operator === "*") return left * right;
  if (node.operator === "/") return Math.abs(right) < 1e-10 ? NaN : left / right;
  if (node.operator === "^") {
    const result = Math.pow(left, right);
    return Number.isFinite(result) ? result : NaN;
  }
  return NaN;
}

function collectMathVariables(node, variables = new Set()) {
  if (!node) return variables;
  if (node.type === "variable") variables.add(node.name);
  if (node.argument) collectMathVariables(node.argument, variables);
  if (node.left) collectMathVariables(node.left, variables);
  if (node.right) collectMathVariables(node.right, variables);
  return variables;
}

function mathAssignments(variableNames) {
  if (!variableNames.length) return [{}];
  return Array.from({ length: 36 }, (_, sampleIndex) => Object.fromEntries(variableNames.map((name, variableIndex) => [
    name,
    mathSampleValues[(sampleIndex * (variableIndex + 3) + variableIndex * 2) % mathSampleValues.length]
  ])));
}

function mathClose(left, right) {
  return Math.abs(left - right) <= 1e-7 * Math.max(1, Math.abs(left), Math.abs(right));
}

function expressionsEquivalent(leftExpression, rightExpression) {
  const left = parseMathExpression(leftExpression);
  const right = parseMathExpression(rightExpression);
  if (!left || !right) return false;
  const variables = [...new Set([
    ...collectMathVariables(left),
    ...collectMathVariables(right)
  ])].sort();
  if (variables.length > 5) return false;
  let validComparisons = 0;
  for (const assignment of mathAssignments(variables)) {
    const leftValue = evaluateMathAst(left, assignment);
    const rightValue = evaluateMathAst(right, assignment);
    if (!Number.isFinite(leftValue) || !Number.isFinite(rightValue)) continue;
    if (!mathClose(leftValue, rightValue)) return false;
    validComparisons += 1;
  }
  return validComparisons >= (variables.length ? 8 : 1);
}

function equationDifferenceAst(value) {
  const parts = String(value || "").split("=");
  if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
  const left = parseMathExpression(parts[0]);
  const right = parseMathExpression(parts[1]);
  return left && right ? { type: "binary", operator: "-", left, right } : null;
}

function isIsolatedNumericSolution(value) {
  const parts = String(value || "").split("=");
  if (parts.length !== 2 || !/^[a-z]$/.test(parts[0])) return false;
  const right = parseMathExpression(parts[1]);
  return Boolean(right && collectMathVariables(right).size === 0);
}

function sameIsolatedSolution(leftValue, rightValue) {
  const leftParts = String(leftValue || "").split("=");
  const rightParts = String(rightValue || "").split("=");
  if (leftParts.length !== 2 || rightParts.length !== 2 || leftParts[0] !== rightParts[0]) return false;
  return expressionsEquivalent(leftParts[1], rightParts[1]);
}

function splitAnswerList(value) {
  const source = String(value ?? "")
    .replace(/\bor\b/gi, "\n")
    .replace(/([0-9a-z)])or(?=[a-z0-9(-])/gi, "$1\n");
  const parts = [];
  let depth = 0;
  let buffer = "";
  for (const char of source) {
    if ("([{".includes(char)) depth += 1;
    if (")]}".includes(char)) depth = Math.max(0, depth - 1);
    if ((char === "," || char === ";" || char === "\n") && depth === 0) {
      if (buffer.trim()) parts.push(buffer.trim());
      buffer = "";
    } else {
      buffer += char;
    }
  }
  if (buffer.trim()) parts.push(buffer.trim());
  return parts;
}

function readIsolatedNumericSolutionPart(part, fallbackVariable = "") {
  const clean = normaliseMathAnswer(part);
  const equation = clean.match(/^([a-z])=(.+)$/);
  if (equation) {
    const right = parseMathExpression(equation[2]);
    return right && collectMathVariables(right).size === 0
      ? { variable: equation[1], value: equation[2] }
      : null;
  }
  if (fallbackVariable) {
    const value = parseMathExpression(clean);
    return value && collectMathVariables(value).size === 0
      ? { variable: fallbackVariable, value: clean }
      : null;
  }
  return null;
}

function expectedSolutionSet(value) {
  const parts = splitAnswerList(value);
  if (parts.length < 2) return null;
  const solutions = parts.map((part) => readIsolatedNumericSolutionPart(part));
  if (solutions.some((solution) => !solution)) return null;
  const variable = solutions[0].variable;
  if (solutions.some((solution) => solution.variable !== variable)) return null;
  return { variable, values: solutions.map((solution) => solution.value) };
}

function submittedSolutionValues(value, variable) {
  const parts = splitAnswerList(value);
  if (!parts.length) return null;
  const solutions = parts.map((part) => readIsolatedNumericSolutionPart(part, variable));
  return solutions.some((solution) => !solution) ? null : solutions.map((solution) => solution.value);
}

function multiSolutionSetMatches(expected, submitted) {
  const expectedSet = expectedSolutionSet(expected);
  if (!expectedSet) return null;
  const submittedValues = submittedSolutionValues(submitted, expectedSet.variable);
  if (!submittedValues || submittedValues.length !== expectedSet.values.length) return false;
  const used = new Set();
  return expectedSet.values.every((expectedValue) => {
    const matchIndex = submittedValues.findIndex((submittedValue, index) => (
      !used.has(index) && expressionsEquivalent(expectedValue, submittedValue)
    ));
    if (matchIndex < 0) return false;
    used.add(matchIndex);
    return true;
  });
}

function equationsEquivalent(leftEquation, rightEquation) {
  if (isIsolatedNumericSolution(leftEquation) || isIsolatedNumericSolution(rightEquation)) {
    return sameIsolatedSolution(leftEquation, rightEquation);
  }
  const left = equationDifferenceAst(leftEquation);
  const right = equationDifferenceAst(rightEquation);
  if (!left || !right) return false;
  const variables = [...new Set([
    ...collectMathVariables(left),
    ...collectMathVariables(right)
  ])].sort();
  if (variables.length > 5) return false;
  let ratio = null;
  let validComparisons = 0;
  for (const assignment of mathAssignments(variables)) {
    const leftValue = evaluateMathAst(left, assignment);
    const rightValue = evaluateMathAst(right, assignment);
    if (!Number.isFinite(leftValue) || !Number.isFinite(rightValue)) continue;
    const leftZero = mathClose(leftValue, 0);
    const rightZero = mathClose(rightValue, 0);
    if (leftZero && rightZero) {
      validComparisons += 1;
      continue;
    }
    if (leftZero !== rightZero || Math.abs(rightValue) < 1e-10) return false;
    const nextRatio = leftValue / rightValue;
    if (!Number.isFinite(nextRatio)) return false;
    if (ratio === null) ratio = nextRatio;
    if (!mathClose(nextRatio, ratio)) return false;
    validComparisons += 1;
  }
  return validComparisons >= (variables.length ? 8 : 1);
}

function algebraicallyEquivalent(expected, submitted) {
  if (!expected || !submitted || expected === submitted) return expected === submitted;
  const expectedIsEquation = expected.includes("=");
  const submittedIsEquation = submitted.includes("=");
  if (expectedIsEquation || submittedIsEquation) {
    return expectedIsEquation && submittedIsEquation && equationsEquivalent(expected, submitted);
  }
  return expressionsEquivalent(expected, submitted);
}

function splitMatrixCells(rowBody) {
  const cells = [];
  let depth = 0;
  let buffer = "";
  for (const char of String(rowBody || "")) {
    if ("([{".includes(char)) depth += 1;
    if (")]}".includes(char)) depth = Math.max(0, depth - 1);
    if (char === "," && depth === 0) {
      if (!buffer.trim()) return null;
      cells.push(buffer.trim());
      buffer = "";
      continue;
    }
    buffer += char;
  }
  if (!buffer.trim()) return null;
  cells.push(buffer.trim());
  return cells;
}

function matrixRowsFromLiteral(literal) {
  const source = String(literal || "").trim();
  if (!source.startsWith("[[") || !source.endsWith("]]")) return null;
  const body = source.slice(1, -1).trim();
  const rows = [];
  let depth = 0;
  let rowStart = -1;
  for (let index = 0; index < body.length; index += 1) {
    const char = body[index];
    if (char === "[") {
      if (depth === 0) rowStart = index + 1;
      depth += 1;
      continue;
    }
    if (char === "]") {
      depth -= 1;
      if (depth < 0) return null;
      if (depth === 0 && rowStart >= 0) {
        const cells = splitMatrixCells(body.slice(rowStart, index));
        if (!cells?.length) return null;
        rows.push(cells);
        rowStart = -1;
      }
      continue;
    }
    if (depth === 0 && !/[\s,]/.test(char)) return null;
  }
  if (depth !== 0 || !rows.length) return null;
  const width = rows[0].length;
  if (!width || rows.some((row) => row.length !== width)) return null;
  return rows;
}

function matrixAnswersEquivalent(expected, submitted) {
  const expectedRows = matrixRowsFromLiteral(expected);
  if (!expectedRows) return null;
  const submittedRows = matrixRowsFromLiteral(submitted);
  if (!submittedRows) return false;
  if (expectedRows.length !== submittedRows.length || expectedRows[0].length !== submittedRows[0].length) return false;
  return expectedRows.every((row, rowIndex) => row.every((expectedCell, colIndex) => {
    const submittedCell = submittedRows[rowIndex][colIndex];
    const expectedClean = normaliseMathAnswer(expectedCell);
    const submittedClean = normaliseMathAnswer(submittedCell);
    return expectedClean === submittedClean || algebraicallyEquivalent(expectedClean, submittedClean);
  }));
}

function addAnswerVariant(answers, clean) {
  if (!clean) return;
  answers.add(clean);
  const withoutVariable = clean.replace(/^[a-z][a-z0-9_]*=/, "");
  if (withoutVariable) answers.add(withoutVariable);
}

function answerVariants(value) {
  const answers = new Set();
  String(value ?? "").split(/\bor\b|\/\//i).forEach((part) => {
    const option = normaliseMathAnswer(part);
    addAnswerVariant(answers, option);
  });
  return [...answers].filter(Boolean);
}

function acceptableAnswers(expected) {
  return answerVariants(expected);
}

function answersMatch(acceptedAnswers = [], submittedAnswers = []) {
  return submittedAnswers.some((submitted) => acceptedAnswers.some((expected) => (
    submitted === expected || algebraicallyEquivalent(expected, submitted)
  )));
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
    const multiSolutionMatch = multiSolutionSetMatches(expected, submitted);
    const matrixMatch = matrixAnswersEquivalent(expected, submitted);
    const correct = Boolean(markable && (
      matrixMatch === null
        ? (multiSolutionMatch === null ? answersMatch(accepted, submittedVariants) : multiSolutionMatch)
        : matrixMatch
    ));
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

function taskShowsInPupilProfile(taskOrSettings = {}) {
  const settings = taskOrSettings.settings || taskOrSettings;
  return settings.show_in_pupil_profile !== false;
}

function taskAllowsHandwriting(taskOrSettings = {}) {
  const settings = taskOrSettings.settings || taskOrSettings;
  return settings.allow_handwriting === true;
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

async function latestResponseForPupil(supabase, task, pupilAlias, attemptIndex = 0) {
  const aliasKey = normaliseAliasKey(pupilAlias);
  if (!task?.id || !aliasKey) return null;
  const targetAttempt = clampNumber(attemptIndex, 0, 9, 0);
  let responseResult = await supabase
    .from("class_task_responses")
    .select(RESPONSE_SELECT_WITH_WORKING)
    .eq("task_id", task.id)
    .order("submitted_at", { ascending: false })
    .limit(500);
  if (responseResult.error && isMissingWorkingColumnError(responseResult.error)) {
    responseResult = await supabase
      .from("class_task_responses")
      .select(RESPONSE_SELECT)
      .eq("task_id", task.id)
      .order("submitted_at", { ascending: false })
      .limit(500);
  }
  if (responseResult.error) throw responseResult.error;
  const matches = (responseResult.data || []).filter((response) => normaliseAliasKey(response.pupil_alias) === aliasKey);
  if (targetAttempt > 0) {
    return matches.find((response) => responseAttemptIndex(response) === targetAttempt) || null;
  }
  return matches[0] || null;
}

async function responsesForPupilTasks(supabase, tasks = [], identity = {}) {
  const taskIds = tasks.map((task) => task.id).filter(Boolean);
  const aliasKey = normaliseAliasKey(identity.pupilAlias || identity.pupil_alias || identity);
  const pupilCodeKey = normalisePupilCode(identity.pupilCode || identity.pupil_code);
  if (!taskIds.length || (!aliasKey && !pupilCodeKey)) return [];
  let responseResult = await supabase
    .from("class_task_responses")
    .select(RESPONSE_SELECT_WITH_WORKING)
    .in("task_id", taskIds)
    .order("submitted_at", { ascending: false })
    .limit(500);
  if (responseResult.error && isMissingWorkingColumnError(responseResult.error)) {
    responseResult = await supabase
      .from("class_task_responses")
      .select(RESPONSE_SELECT)
      .in("task_id", taskIds)
      .order("submitted_at", { ascending: false })
      .limit(500);
  }
  if (responseResult.error) throw responseResult.error;
  return (responseResult.data || []).filter((response) => {
    const responseAliasKey = normaliseAliasKey(response.pupil_alias);
    const responseCodeKey = normalisePupilCode(response?.marking?.pupil_code || response?.pupil_code);
    return Boolean((aliasKey && responseAliasKey === aliasKey) || (pupilCodeKey && responseCodeKey === pupilCodeKey));
  });
}

async function pupilProgressProfile(supabase, anchorTask, identity, schoolName = "") {
  if (!anchorTask?.id || !identity?.pupilAlias) return null;
  const groupId = taskGroupId(anchorTask);
  let tasks = [anchorTask];
  if (groupId) {
    let taskQuery = supabase
      .from("class_tasks")
      .select(TASK_SELECT)
      .order("created_at", { ascending: false })
      .limit(120);
    taskQuery = anchorTask.school_id
      ? taskQuery.eq("school_id", anchorTask.school_id)
      : taskQuery.eq("teacher_id", anchorTask.teacher_id);
    const { data, error } = await taskQuery;
    if (error) throw error;
    tasks = (data || []).filter((task) => taskHasPupilModuleFlag(task) && taskGroupId(task) === groupId);
  }
  const responses = await responsesForPupilTasks(supabase, tasks, identity);
  return publicPupilProfile(tasks, responses, identity, anchorTask.settings?.class_group_name || schoolName);
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
    allow_handwriting: Boolean(incomingSettings.allow_handwriting),
    show_in_pupil_profile: incomingSettings.show_in_pupil_profile !== false,
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
  const includeProfile = body.include_profile !== false;

  try {
    const identity = await resolvePupilIdentity(supabase, task, body);
    const participant = await upsertParticipantForTask(supabase, task, identity.pupilAlias, {
      status: "joined",
      current_attempt: attemptIndex + 1
    });
    const participantPayload = participant ? {
      ...participant,
      pupil_code: identity.pupilCode,
      class_group_member_id: identity.memberId
    } : null;
    const latestResponse = includeProfile ? await latestResponseForPupil(supabase, task, identity.pupilAlias, attemptIndex) : null;
    const pupilProfile = includeProfile ? await pupilProgressProfile(supabase, task, identity, access.schoolName) : null;
    if (shouldReturnPupilWork(task, latestResponse)) {
      return sendJson(res, 200, {
        ...publicSubmissionForResponse(task, latestResponse, access.schoolName, participantPayload),
        pupil_profile: pupilProfile,
        source: "remote"
      });
    }
    return sendJson(res, 200, {
      participant: participantPayload,
      pupil_profile: pupilProfile
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
  let pupilProfile = null;
  try {
    pupilProfile = await pupilProgressProfile(supabase, task, identity, access.schoolName);
  } catch (profileError) {
    console.warn("Class task pupil profile update failed:", profileError.message);
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
    next_task: nextTask,
    pupil_profile: pupilProfile
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

async function updateTaskProfileVisibility(req, res, supabase) {
  const { user, profile, error } = await teacherProfile(req, supabase);
  if (error) return sendJson(res, 401, { error });
  const school = await requirePupilModuleManager(res, supabase, profile);
  if (!school) return;

  const body = await readJsonBody(req);
  const taskId = cleanText(body.task_id, 80);
  const showInProfile = body.show_in_pupil_profile !== false;
  if (!taskId) return sendJson(res, 400, { error: "Missing task id." });

  let taskQuery = supabase
    .from("class_tasks")
    .select("id, teacher_id, settings")
    .eq("id", taskId);
  if (normaliseRole(profile) !== "admin") taskQuery = taskQuery.eq("teacher_id", user.id);
  const { data: task, error: taskError } = await taskQuery.maybeSingle();
  if (taskError) return sendJson(res, 500, { error: taskError.message });
  if (!task) return sendJson(res, 403, { error: "You cannot update this pupil task." });

  const settings = {
    ...(task.settings || {}),
    show_in_pupil_profile: showInProfile
  };
  const { data: updatedTask, error: updateError } = await supabase
    .from("class_tasks")
    .update({ settings, updated_at: new Date().toISOString() })
    .eq("id", task.id)
    .select(TASK_SELECT)
    .single();
  if (updateError) return sendJson(res, 500, { error: updateError.message });
  return sendJson(res, 200, { task: updatedTask });
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
    if (req.method === "POST" && action === "profile-visibility") return updateTaskProfileVisibility(req, res, supabase);
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
