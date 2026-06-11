(() => {
  const VERSION = '0.1.0';

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
    if (!/[<&]/.test(text)) return text;
    const template = document.createElement('template');
    template.innerHTML = text;
    return template.content.textContent.replace(/\s+/g, ' ').trim();
  }

  function normalizeStep(step) {
    if (step == null) return '';
    if (typeof step === 'string' || typeof step === 'number') return String(step);
    if (typeof step.text === 'string') return step.text;
    if (typeof step.latex === 'string') return step.latex;
    if (typeof step.html === 'string') return step.html;
    if (typeof step.equation === 'string') return step.equation;
    return String(step);
  }

  function normalizeSteps(steps) {
    if (!steps) return [];
    if (!Array.isArray(steps)) return [normalizeStep(steps)].filter(Boolean);
    return steps.map(normalizeStep).filter(Boolean);
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

    return {
      toolTitle: overrides.toolTitle ?? state.toolTitle,
      level: overrides.level ?? state.level,
      type: overrides.type ?? state.type,
      question,
      questionText: textFromHtml(question),
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

    if (options.level !== undefined && oldLevel !== null) writeBinding('currentLevel', oldLevel);
    if (options.type !== undefined && oldType !== null) writeBinding('currentType', oldType);

    return {
      ok: true,
      version: VERSION,
      ...getState(),
      level: requestedLevel,
      type: requestedType,
      count: problems.length,
      problems
    };
  }

  window.KaizenWorksheet = {
    version: VERSION,
    canGenerate,
    generate,
    getState,
    normalizeProblem
  };

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
      document.documentElement.classList.add('teacher-example-mode');
    }

    window.KaizenTeacherExample = {
      isActive: () => exampleMode,
      generate: () => (exampleMode ? generateExample() : originalGenerateNewSet()),
      setActive(value) {
        exampleMode = Boolean(value);
        setButtonState();
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installTeacherExampleMode);
  } else {
    installTeacherExampleMode();
  }

  document.documentElement.dataset.worksheetStandard = 'ready';
  document.documentElement.dataset.worksheetCanGenerate = String(canGenerate());
  document.dispatchEvent(new CustomEvent('kaizen:worksheet-standard-ready', {
    detail: { version: VERSION }
  }));
})();
