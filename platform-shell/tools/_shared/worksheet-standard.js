(() => {
  const VERSION = '0.2.1';

  function readBinding(name, fallback = undefined) {
    try {
      const value = window.eval(`typeof ${name} !== "undefined" ? ${name} : undefined`);
      return value === undefined ? fallback : value;
    } catch (_) {
      return fallback;
    }
  }

  function writeBinding(name, value) {
    try {
      window.eval(`${name} = ${JSON.stringify(value)}`);
      return true;
    } catch (_) {
      return false;
    }
  }

  function textFromHtml(value) {
    if (value == null) return '';
    const text = String(value);
    if (!/[<&]/.test(text)) return normaliseAlgebraUnitCoefficients(text);
    const template = document.createElement('template');
    template.innerHTML = text;
    return normaliseAlgebraUnitCoefficients(template.content.textContent.replace(/\s+/g, ' ').trim());
  }

  function normaliseAlgebraUnitCoefficients(value) {
    return String(value ?? '').replace(/(^|[^A-Za-z0-9])([+\-−]?\s*)1([A-Za-z])(?=(?:\^|[⁰¹²³⁴⁵⁶⁷⁸⁹]|\b))/g, '$1$2$3');
  }

  function looksLikeSharedInstruction(text) {
    const clean = String(text || '').replace(/\s+/g, ' ').trim();
    if (!clean || clean.length > 110) return false;
    return /^(simplify|solve|express|evaluate|calculate|find|write|expand|factorise|factorize|differentiate|integrate|convert|complete|state|show|prove|sketch|draw)\b/i.test(clean);
  }

  function splitQuestionInstruction(question) {
    const html = String(question || '').trim();
    if (!html) return null;
    const parts = html.split(/<br\s*\/?>/i);
    if (parts.length < 2) return null;
    const instructionHtml = parts.shift().trim();
    const instructionText = textFromHtml(instructionHtml).replace(/:$/, '').trim();
    if (!looksLikeSharedInstruction(instructionText)) return null;
    const remainder = parts.join('<br>').trim();
    if (!remainder) return null;
    return { instruction: instructionText, question: remainder };
  }

  function normalizeStep(step) {
    if (step == null) return '';
    if (typeof step === 'string' || typeof step === 'number') return normaliseAlgebraUnitCoefficients(step);
    if (typeof step.text === 'string') return normaliseAlgebraUnitCoefficients(step.text);
    if (typeof step.latex === 'string') return normaliseAlgebraUnitCoefficients(step.latex);
    if (typeof step.html === 'string') return normaliseAlgebraUnitCoefficients(step.html);
    if (typeof step.equation === 'string') return normaliseAlgebraUnitCoefficients(step.equation);
    return normaliseAlgebraUnitCoefficients(step);
  }

  function normalizeSteps(steps) {
    if (!steps) return [];
    if (!Array.isArray(steps)) return [normalizeStep(steps)].filter(Boolean);
    return steps.map(normalizeStep).filter(Boolean);
  }

  function installWorkedStepStructure() {
    if (document.documentElement.dataset.kaizenStepStructureReady === 'true') return;
    document.documentElement.dataset.kaizenStepStructureReady = 'true';

    const style = document.createElement('style');
    style.textContent = `
      .solution-steps .kaizen-worked-step{display:grid;grid-template-columns:auto minmax(0,1fr);gap:.55rem;align-items:start;margin:.42rem 0;padding:.45rem .55rem;border-radius:6px;background:rgba(255,255,255,.52);border:1px solid rgba(49,130,206,.08)}
      .solution-steps .kaizen-worked-step.kaizen-math-step{background:rgba(255,255,255,.72)}
      .solution-steps .kaizen-step-index{display:inline-flex;align-items:center;justify-content:center;min-width:4.1rem;padding:.18rem .45rem;border-radius:999px;background:#3182ce;color:#fff;font-size:.78em;font-weight:800;white-space:nowrap}
      .solution-steps .kaizen-step-body{min-width:0;overflow-x:auto}
      .solution-steps .kaizen-worked-step .step-indicator{margin-right:.4rem}
      .solution-steps .kaizen-step-explicit{display:block}
    `;
    document.head.appendChild(style);

    function hasExplicitStep(element) {
      const text = element.textContent || '';
      return /step\s*\d+/i.test(text) || Boolean(element.querySelector('.step-indicator'));
    }

    function isSkippableStep(element) {
      return element.classList.contains('final-answer') ||
        element.classList.contains('answer-label') ||
        element.classList.contains('kaizen-worked-step') ||
        element.closest('.final-answer');
    }

    function isMathLike(text, element) {
      return element.classList.contains('step-equation') ||
        element.classList.contains('step-math') ||
        /(\$\$|\\\(|\\\[|=|→|->|⇒|\\frac|dfrac|sqrt|∫|∑|[+\-*/×÷]\s*)/.test(text);
    }

    function enhanceContainer(container) {
      if (!container || container.dataset.kaizenStepStructured === 'true') return;
      const children = [...container.children].filter((child) => child.nodeType === Node.ELEMENT_NODE && !isSkippableStep(child));
      let stepNumber = 1;
      const containerHasExplicitSteps = children.some(hasExplicitStep);

      children.forEach((child) => {
        const text = (child.textContent || '').trim();
        if (!text) return;
        if (containerHasExplicitSteps) {
          if (hasExplicitStep(child)) child.classList.add('kaizen-step-explicit');
          return;
        }
        if (hasExplicitStep(child)) {
          child.classList.add('kaizen-step-explicit');
          return;
        }

        const body = document.createElement('span');
        body.className = 'kaizen-step-body';
        while (child.firstChild) body.appendChild(child.firstChild);

        const label = document.createElement('span');
        label.className = 'kaizen-step-index';
        label.textContent = 'Step ' + stepNumber;

        child.classList.add('kaizen-worked-step');
        if (isMathLike(text, child)) child.classList.add('kaizen-math-step');
        child.append(label, body);
        stepNumber += 1;
      });

      container.dataset.kaizenStepStructured = 'true';
    }

    function enhance(root = document) {
      if (root.nodeType === Node.ELEMENT_NODE && root.matches?.('.solution-steps')) enhanceContainer(root);
      root.querySelectorAll?.('.solution-steps').forEach(enhanceContainer);
    }

    enhance();
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => enhance(node));
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function getToolTitle() {
    return (
      document.querySelector('.header h1')?.textContent?.trim() ||
      document.querySelector('h1')?.textContent?.trim() ||
      document.title ||
      'Worksheet'
    );
  }

  function getState() {
    const level = readBinding('currentLevel', null);
    const type = readBinding('currentType', null);
    const levelConfigs = readBinding('levelConfigs', {});
    const typeDisplayNames = readBinding('typeDisplayNames', {});
    const typeMeta = readBinding('typeMeta', {});
    const levelConfig = levelConfigs && level != null ? levelConfigs[level] : null;
    const levels = Object.entries(levelConfigs || {}).map(([id, config]) => ({
      id: Number.isNaN(Number(id)) ? id : Number(id),
      title: config?.title || `Level ${id}`,
      description: config?.description || '',
      types: normalizeTypes(config, typeDisplayNames, typeMeta)
    }));

    return {
      toolTitle: getToolTitle(),
      level,
      type,
      levelTitle: levelConfig?.title || document.getElementById('level-title')?.textContent?.trim() || '',
      levelDescription: levelConfig?.description || document.getElementById('level-description')?.textContent?.trim() || '',
      availableTypes: normalizeTypes(levelConfig, typeDisplayNames, typeMeta).map((typeItem) => typeItem.id),
      levels
    };
  }

  function prettifyType(typeId) {
    return String(typeId || '')
      .replace(/([a-z])(\d)/gi, '$1 $2')
      .replace(/(\d)([a-z])/gi, '$1 $2')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function cleanTypeLabel(label, typeId) {
    let text = String(label || prettifyType(typeId) || '').trim();
    const idLikeLabel = /^[A-Za-z0-9_]+$/.test(text);
    if (idLikeLabel) text = text.replace(/_/g, ' ');

    text = text
      .replace(/^Type\s*[A-Z]?\d+\s*:\s*/i, '')
      .replace(/^Type\s*[A-Z]?\d+\s+/i, '')
      .replace(/^Type\s*[A-Z]?\d+/i, '')
      .replace(/^Type([A-Z]?\d+)\s+/i, '')
      .replace(/^Type([A-Z]?\d+)/i, '')
      .replace(/\s+/g, ' ')
      .trim();

    const replacements = [
      [/\bNeg\b/gi, 'Negative'],
      [/\bCoeff\b/gi, 'Coefficient'],
      [/\bFrac\b/gi, 'Fraction'],
      [/\bDec\b/gi, 'Decimal'],
      [/\bRem\b/gi, 'Remainder'],
      [/\bSimul\b/gi, 'Simultaneous'],
      [/\bSyn\b/gi, 'Synthetic'],
      [/\bQuad\b/gi, 'Quadratic'],
      [/\bInv\b/gi, 'Inverse'],
      [/\bTrig\b/gi, 'Trigonometric'],
      [/\bGeom\b/gi, 'Geometric'],
      [/\bArith\b/gi, 'Arithmetic'],
      [/\bPoly\b/gi, 'Polynomial'],
      [/\bTemp\b/gi, 'Temperature'],
      [/\bConv\b/gi, 'Conversion'],
      [/\bDeg\b/gi, 'Degrees'],
      [/\bRad\b/gi, 'Radians'],
      [/\bExpr\b/gi, 'Expression'],
      [/\bEqn\b/gi, 'Equation'],
      [/\bDiff\b/gi, 'Differentiation'],
      [/\bInt\b/gi, 'Integer'],
      [/\bTrap\b/gi, 'Trapezium'],
      [/\bGCF\b/g, 'common factor']
    ];

    replacements.forEach(([pattern, replacement]) => {
      text = text.replace(pattern, replacement);
    });

    text = text.replace(/\s+/g, ' ').trim();
    if (idLikeLabel) {
      text = text.replace(/\b\w/g, (letter) => letter.toUpperCase());
    }

    return text;
  }

  function displayNameForType(typeId, explicitLabel, typeDisplayNames, typeMeta) {
    return explicitLabel || typeDisplayNames?.[typeId] || typeMeta?.[typeId]?.title || prettifyType(typeId);
  }

  function normalizeTypes(config, typeDisplayNames, typeMeta) {
    if (Array.isArray(config?.types)) {
      return config.types.map((typeId) => ({
        id: typeId,
        label: cleanTypeLabel(displayNameForType(typeId, '', typeDisplayNames, typeMeta), typeId)
      }));
    }

    if (Array.isArray(config?.options)) {
      return config.options
        .map((option) => {
          if (Array.isArray(option)) {
            const [id, label] = option;
            return { id, label: cleanTypeLabel(displayNameForType(id, label, typeDisplayNames, typeMeta), id) };
          }

          if (option && typeof option === 'object') {
            const id = option.value ?? option.id ?? option.type;
            const label = option.label ?? option.text ?? option.name;
            return { id, label: cleanTypeLabel(displayNameForType(id, label, typeDisplayNames, typeMeta), id) };
          }

          return { id: option, label: cleanTypeLabel(displayNameForType(option, '', typeDisplayNames, typeMeta), option) };
        })
        .filter((typeItem) => typeItem.id != null && typeItem.id !== '' && typeItem.id !== 'select');
    }

    return [];
  }

  function normalizeProblem(problem, overrides = {}) {
    const state = getState();
    const raw = problem || {};
    const systemQuestion = Array.isArray(raw.equationsLatex) && raw.equationsLatex.length
      ? `Solve the system:<br>${raw.equationsLatex.map((equation) => `$${equation}$`).join('<br>')}`
      : '';
    const question = raw.question ?? raw.text ?? raw.equation ?? raw.sequence ?? raw.wordProblem ?? raw.equationTeX ?? raw.calculation ?? raw.eq ?? raw.prompt ?? raw.expression ?? raw.original ?? systemQuestion ?? '';
    const answer = raw.answer ?? raw.answerTeX ?? raw.answerLatex ?? raw.finalAnswer ?? raw.solution ?? raw.derivative ?? '';
    const steps = raw.steps ?? raw.stepsTeX;
    const rawInstruction = raw.instruction ?? raw.setInstruction ?? raw.command ?? '';

    return {
      toolTitle: overrides.toolTitle ?? state.toolTitle,
      level: overrides.level ?? state.level,
      type: overrides.type ?? state.type,
      question,
      questionText: textFromHtml(question),
      instruction: rawInstruction,
      instructionText: textFromHtml(rawInstruction),
      answer,
      answerText: textFromHtml(answer),
      steps: normalizeSteps(steps),
      stepText: normalizeSteps(steps).map(textFromHtml),
      badge: raw.badge ?? raw.category ?? '',
      source: raw
    };
  }

  function getGenerator() {
    const generator = readBinding('generateProblem', null);
    return typeof generator === 'function' ? generator : null;
  }

  function canGenerate() {
    return Boolean(getGenerator());
  }

  function generate(options = {}) {
    const count = Number.isFinite(options.count) ? options.count : 5;
    const oldLevel = readBinding('currentLevel', null);
    const oldType = readBinding('currentType', null);
    const requestedLevel = options.level ?? oldLevel;
    const requestedType = options.type ?? oldType;

    const generator = getGenerator();
    if (!generator) {
      return {
        ok: false,
        reason: 'This tool does not expose generateProblem().',
        ...getState(),
        problems: []
      };
    }

    if (options.level !== undefined) writeBinding('currentLevel', options.level);
    if (options.type !== undefined) writeBinding('currentType', options.type);

    const problems = [];
    for (let i = 0; i < count; i += 1) {
      problems.push(normalizeProblem(generator(), {
        level: requestedLevel,
        type: requestedType
      }));
    }

    const explicitInstruction = problems
      .map((problem) => problem.instructionText || problem.instruction)
      .filter(Boolean);
    let sharedInstruction = explicitInstruction.length === problems.length && new Set(explicitInstruction).size === 1
      ? explicitInstruction[0]
      : '';

    if (!sharedInstruction && problems.length > 1) {
      const split = problems.map((problem) => splitQuestionInstruction(problem.question));
      if (split.every(Boolean)) {
        const uniqueInstructions = new Set(split.map((item) => item.instruction));
        if (uniqueInstructions.size === 1) {
          sharedInstruction = split[0].instruction;
          problems.forEach((problem, index) => {
            problem.question = split[index].question;
            problem.questionText = textFromHtml(problem.question);
            problem.instruction = sharedInstruction;
            problem.instructionText = sharedInstruction;
          });
        }
      }
    }

    if (options.level !== undefined && oldLevel !== null) writeBinding('currentLevel', oldLevel);
    if (options.type !== undefined && oldType !== null) writeBinding('currentType', oldType);

    return {
      ok: true,
      version: VERSION,
      ...getState(),
      level: requestedLevel,
      type: requestedType,
      instruction: sharedInstruction,
      count: problems.length,
      problems
    };
  }

  function installSharedInstructionLift() {
    if (document.documentElement.dataset.kaizenSharedInstructionLift === 'true') return;
    document.documentElement.dataset.kaizenSharedInstructionLift = 'true';

    const style = document.createElement('style');
    style.textContent = `
      .kaizen-shared-instruction{margin:0 0 14px;padding:11px 15px;border-radius:8px;background:#eefbfb;border:1px solid #bceeed;border-left:4px solid #17b8b3;color:#1a365d;font-weight:800;text-align:center}
    `;
    document.head.appendChild(style);

    function lift(root = document) {
      const list = root.querySelector?.('#problem-list') || document.getElementById('problem-list');
      if (!list || list.dataset.kaizenInstructionLifted === 'true') return;
      const equations = [...list.querySelectorAll('.equation')];
      if (equations.length < 2) return;

      const split = equations.map((equation) => splitQuestionInstruction(equation.innerHTML));
      const createdInstruction = list.parentElement?.querySelector('.kaizen-shared-instruction[data-kaizen-created="true"]');
      if (!split.every(Boolean)) {
        createdInstruction?.remove();
        return;
      }
      const uniqueInstructions = new Set(split.map((item) => item.instruction));
      if (uniqueInstructions.size !== 1) {
        createdInstruction?.remove();
        return;
      }

      const instruction = split[0].instruction;
      let instructionEl = document.getElementById('set-instruction') || list.parentElement?.querySelector('.kaizen-shared-instruction');
      if (!instructionEl) {
        instructionEl = document.createElement('div');
        instructionEl.className = 'kaizen-shared-instruction';
        instructionEl.dataset.kaizenCreated = 'true';
        list.parentElement?.insertBefore(instructionEl, list);
      }
      instructionEl.textContent = instruction;
      instructionEl.classList.add('visible');

      equations.forEach((equation, index) => {
        equation.innerHTML = split[index].question;
      });
      list.dataset.kaizenInstructionLifted = 'true';
    }

    const observer = new MutationObserver(() => {
      const list = document.getElementById('problem-list');
      if (list) {
        delete list.dataset.kaizenInstructionLifted;
        lift(document);
      }
    });
    if (document.body) observer.observe(document.body, { childList: true, subtree: true });
    lift(document);
  }

  window.KaizenWorksheet = {
    version: VERSION,
    canGenerate,
    generate,
    getState,
    normalizeProblem
  };

  installWorkedStepStructure();
  installSharedInstructionLift();

  function installTeacherExampleMode() {
    if (document.documentElement.dataset.teacherExampleReady === 'true') return;
    if (!document.querySelector('.action-buttons')) return;
    if (typeof readBinding('generateProblem', null) !== 'function') return;
    if (typeof readBinding('renderProblems', null) !== 'function') return;

    const originalGenerateNewSet = readBinding('generateNewSet', null);
    const originalShowBlankPage = readBinding('showBlankPage', null);
    if (typeof originalGenerateNewSet !== 'function') return;

    let exampleMode = false;

    const style = document.createElement('style');
    style.textContent = `
      .teacher-mode-switch{display:inline-flex;align-items:center;gap:3px;padding:3px;border:1px solid #cbd5e0;border-radius:7px;background:#fff;box-shadow:0 1px 3px rgba(26,54,93,.08)}
      .teacher-mode-switch .btn{min-width:auto;padding:7px 11px;border-radius:5px;font-size:.86em;color:#1a365d;background:#edf2f7}
      .teacher-mode-switch .btn.active{background:#17b8b3;color:#fff;box-shadow:0 0 0 2px rgba(23,184,179,.18)}
      .teacher-mode-switch .btn:not(.active):hover{background:#e2e8f0}
      html.teacher-example-mode .problem-list{display:grid;grid-template-columns:minmax(320px,760px) minmax(120px,1fr);gap:12px;align-items:start}
      html.teacher-example-mode .problem-item{grid-column:1;min-height:260px}
      html.teacher-example-mode .shape-row{grid-template-columns:minmax(240px,320px) minmax(140px,1fr)}
      html.teacher-example-mode .shape-diagram{width:min(320px,100%);height:auto;min-height:190px}
      html.teacher-example-mode .equation{font-size:1.15em}
      html.teacher-example-mode .problem-number{min-width:34px;height:34px;font-size:1.08em}
      html.teacher-example-mode .set-instruction::after{content:" Teacher Example mode: one question is shown for modelling.";display:block;font-weight:700;color:#6f4cc3;margin-top:3px}
      @media (max-width:760px){html.teacher-example-mode .problem-list{grid-template-columns:1fr}html.teacher-example-mode .problem-item{grid-column:auto}}
    `;
    document.head.appendChild(style);

    const switchControl = document.createElement('div');
    switchControl.className = 'teacher-mode-switch';
    switchControl.setAttribute('role', 'group');
    switchControl.setAttribute('aria-label', 'Question display mode');

    const practiceButton = document.createElement('button');
    practiceButton.type = 'button';
    practiceButton.className = 'btn';
    practiceButton.textContent = 'Practice Set';
    practiceButton.title = 'Show the normal full practice set';

    const exampleButton = document.createElement('button');
    exampleButton.type = 'button';
    exampleButton.className = 'btn';
    exampleButton.textContent = 'One Example';
    exampleButton.title = 'Show one teacher example question';

    switchControl.append(practiceButton, exampleButton);

    function setButtonState() {
      practiceButton.classList.toggle('active', !exampleMode);
      exampleButton.classList.toggle('active', exampleMode);
      practiceButton.setAttribute('aria-pressed', String(!exampleMode));
      exampleButton.setAttribute('aria-pressed', String(exampleMode));
      document.documentElement.classList.toggle('teacher-example-mode', exampleMode);
    }

    function generateExample() {
      const currentType = readBinding('currentType', 'select');
      if (currentType === 'select') {
        if (typeof originalShowBlankPage === 'function') originalShowBlankPage();
        return;
      }

      writeBinding('problems', []);
      writeBinding('answersVisible', false);
      writeBinding('stepsVisible', false);

      try {
        window.eval('problems.push(generateProblem()); renderProblems();');
      } catch (_) {
        originalGenerateNewSet();
      }
      if (typeof window.kaizenRenderMath === 'function') {
        setTimeout(() => window.kaizenRenderMath(), 0);
      }
      window.KaizenQuestionPersistence?.saveSoon?.();
      document.documentElement.classList.add('teacher-example-mode');
    }

    window.KaizenTeacherExample = {
      isActive: () => exampleMode,
      generate: () => (exampleMode ? generateExample() : originalGenerateNewSet()),
      setActive(value, options = {}) {
        exampleMode = Boolean(value);
        setButtonState();
        if (options.regenerate === false) return;
        if (exampleMode) generateExample();
        else originalGenerateNewSet();
      }
    };

    try {
      window.eval('generateNewSet = function(){ return window.KaizenTeacherExample.generate(); }');
    } catch (_) {
      return;
    }

    practiceButton.addEventListener('click', () => window.KaizenTeacherExample.setActive(false));
    exampleButton.addEventListener('click', () => window.KaizenTeacherExample.setActive(true));

    const actionGroups = Array.from(document.querySelectorAll('.action-buttons'));
    const targetGroup = actionGroups.find((group) => group.querySelector('[onclick*="generateNewSet"]')) || actionGroups[actionGroups.length - 1];
    targetGroup?.appendChild(switchControl);

    setButtonState();
    document.documentElement.dataset.teacherExampleReady = 'true';
  }

  function toolStateKey() {
    const cleanPath = location.pathname.replace(/\/index\.html$/i, '').replace(/\/$/, '') || location.pathname;
    return `kaizen:tool-board:${cleanPath}`;
  }

  function readStoredBoard() {
    try {
      return JSON.parse(localStorage.getItem(toolStateKey()) || 'null');
    } catch (_) {
      return null;
    }
  }

  function serialiseProblems(problems) {
    try {
      return JSON.parse(JSON.stringify(problems || []));
    } catch (_) {
      return [];
    }
  }

  function visibleState() {
    const answerCount = document.querySelectorAll('.problem-answer.visible, .answer-section.visible').length;
    const stepCount = document.querySelectorAll('.steps-section.visible, .solution-section.visible').length;
    return {
      answersVisible: Boolean(answerCount || readBinding('answersVisible', false)),
      stepsVisible: Boolean(stepCount || readBinding('stepsVisible', false))
    };
  }

  function currentBoardSnapshot() {
    const problems = serialiseProblems(readBinding('problems', []));
    const currentType = readBinding('currentType', 'select');
    if (!Array.isArray(problems) || !problems.length || !currentType || currentType === 'select') return null;
    const visibility = visibleState();
    return {
      version: VERSION,
      savedAt: new Date().toISOString(),
      path: location.pathname,
      title: getToolTitle(),
      level: readBinding('currentLevel', null),
      type: currentType,
      problems,
      answersVisible: visibility.answersVisible,
      stepsVisible: visibility.stepsVisible,
      teacherExampleMode: Boolean(window.KaizenTeacherExample?.isActive?.())
    };
  }

  function installQuestionPersistence() {
    if (document.documentElement.dataset.kaizenQuestionPersistence === 'true') return;
    if (typeof readBinding('renderProblems', null) !== 'function') return;
    document.documentElement.dataset.kaizenQuestionPersistence = 'true';

    let saveTimer = null;

    function saveNow() {
      const snapshot = currentBoardSnapshot();
      if (!snapshot) return false;
      try {
        localStorage.setItem(toolStateKey(), JSON.stringify(snapshot));
        sessionStorage.setItem(toolStateKey(), JSON.stringify(snapshot));
        return true;
      } catch (_) {
        return false;
      }
    }

    function saveSoon() {
      window.clearTimeout(saveTimer);
      saveTimer = window.setTimeout(saveNow, 80);
    }

    function restoreBoard() {
      const saved = readStoredBoard();
      if (!saved || !Array.isArray(saved.problems) || !saved.problems.length || !saved.type || saved.type === 'select') return false;
      const renderProblems = readBinding('renderProblems', null);
      if (typeof renderProblems !== 'function') return false;

      const switchLevel = readBinding('switchLevel', null);
      if (saved.level !== null && saved.level !== undefined && typeof switchLevel === 'function') {
        try {
          switchLevel(saved.level);
        } catch (_) {
          writeBinding('currentLevel', saved.level);
        }
      } else if (saved.level !== null && saved.level !== undefined) {
        writeBinding('currentLevel', saved.level);
      }

      writeBinding('currentType', saved.type);
      const dropdown = document.getElementById('type-dropdown');
      if (dropdown) dropdown.value = saved.type;
      writeBinding('problems', saved.problems);
      writeBinding('answersVisible', false);
      writeBinding('stepsVisible', false);

      try {
        renderProblems();
      } catch (_) {
        return false;
      }

      if (saved.teacherExampleMode && window.KaizenTeacherExample) {
        window.KaizenTeacherExample.setActive(true, { regenerate: false });
      }

      const showAnswers = readBinding('showAnswers', null);
      const showSteps = readBinding('showSteps', null);
      if (saved.answersVisible && typeof showAnswers === 'function') {
        try { showAnswers(); } catch (_) {}
      }
      if (saved.stepsVisible && typeof showSteps === 'function') {
        try { showSteps(); } catch (_) {}
      }

      const instruction = document.getElementById('set-instruction');
      if (instruction && !instruction.dataset.kaizenRestoredNote) {
        instruction.dataset.kaizenRestoredNote = 'true';
        instruction.title = 'This exact question set has been restored. Press New to replace it.';
      }
      saveSoon();
      return true;
    }

    const originalRenderProblems = readBinding('renderProblems', null);
    window.KaizenQuestionPersistence = {
      originalRenderProblems,
      saveNow,
      saveSoon,
      restoreBoard,
      key: toolStateKey()
    };

    try {
      window.eval(`
        renderProblems = function(){
          const result = window.KaizenQuestionPersistence.originalRenderProblems.apply(this, arguments);
          window.KaizenQuestionPersistence.saveSoon();
          return result;
        }
      `);
    } catch (_) {
      // The page still gets passive save/restore from the event listeners below.
    }

    document.addEventListener('click', (event) => {
      const target = event.target;
      if (target?.closest?.('button, .tab, .calculate-cell, .card, .color-choice')) saveSoon();
    }, true);
    document.addEventListener('change', saveSoon, true);
    window.addEventListener('beforeunload', saveNow);

    window.setTimeout(restoreBoard, 120);
  }

  function safeFileName(value) {
    return String(value || 'kaizen-board')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'kaizen-board';
  }

  function collectPageCss() {
    return Array.from(document.styleSheets).map((sheet) => {
      try {
        return Array.from(sheet.cssRules || []).map((rule) => rule.cssText).join('\n');
      } catch (_) {
        return '';
      }
    }).join('\n');
  }

  function openPrintableSnapshot(target, css) {
    const snapshot = window.open('', '_blank');
    if (!snapshot) {
      window.alert('The browser blocked the snapshot window. Allow pop-ups for this site or use your browser screenshot tool.');
      return;
    }
    const clone = target.cloneNode(true);
    snapshot.document.write(`<!doctype html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${textFromHtml(getToolTitle())} snapshot</title>
        <style>${css}</style>
        <style>
          body{margin:0;background:#fff;padding:18px}
          .teacher-tab,.sidebar,.sidebar-overlay,.timer-modal{display:none!important}
          .container{max-width:none!important;box-shadow:none!important}
          .problem-answer,.steps-section{break-inside:avoid}
        </style>
      </head>
      <body>${clone.outerHTML}</body>
      </html>`);
    snapshot.document.close();
    snapshot.focus();
  }

  async function downloadBoardImage() {
    window.KaizenQuestionPersistence?.saveNow?.();
    const target = document.querySelector('.container') || document.querySelector('.problems-section') || document.body;
    const css = collectPageCss() + `
      body{margin:0;background:#fff}
      .teacher-tab,.sidebar,.sidebar-overlay,.timer-modal{display:none!important}
      .container{box-shadow:none!important}
    `;

    const width = Math.ceil(Math.max(target.scrollWidth, target.getBoundingClientRect().width, 900));
    const height = Math.ceil(Math.max(target.scrollHeight, target.getBoundingClientRect().height, 500));
    const clone = target.cloneNode(true);
    const xhtml = `<div xmlns="http://www.w3.org/1999/xhtml" style="width:${width}px;background:#fff">${clone.outerHTML}</div>`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <foreignObject width="100%" height="100%">
        <html xmlns="http://www.w3.org/1999/xhtml">
          <head><style>${css}</style></head>
          <body>${xhtml}</body>
        </html>
      </foreignObject>
    </svg>`;

    try {
      const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      const image = new Image();
      image.decoding = 'sync';
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
        image.src = url;
      });
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, width, height);
      context.drawImage(image, 0, 0);
      URL.revokeObjectURL(url);
      const pngBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png', 0.95));
      if (!pngBlob) throw new Error('Could not create image.');
      const downloadUrl = URL.createObjectURL(pngBlob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${safeFileName(getToolTitle())}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
    } catch (_) {
      openPrintableSnapshot(target, css);
    }
  }

  function installBoardCapture() {
    if (document.documentElement.dataset.kaizenBoardCapture === 'true') return;
    const actionGroups = Array.from(document.querySelectorAll('.action-buttons'));
    const targetGroup = actionGroups.find((group) => group.querySelector('[onclick*="generateNewSet"]')) || actionGroups[actionGroups.length - 1];
    if (!targetGroup) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-primary kaizen-capture-board';
    button.textContent = 'Capture';
    button.title = 'Download this exact board as an image. If image capture is blocked, a printable snapshot opens instead.';
    button.addEventListener('click', downloadBoardImage);
    targetGroup.appendChild(button);
    document.documentElement.dataset.kaizenBoardCapture = 'true';
  }

  function installToolEnhancements() {
    installTeacherExampleMode();
    installQuestionPersistence();
    installBoardCapture();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installToolEnhancements);
  } else {
    installToolEnhancements();
  }

  document.documentElement.dataset.worksheetStandard = 'ready';
  document.documentElement.dataset.worksheetCanGenerate = String(canGenerate());
  document.dispatchEvent(new CustomEvent('kaizen:worksheet-standard-ready', {
    detail: { version: VERSION }
  }));
})();
