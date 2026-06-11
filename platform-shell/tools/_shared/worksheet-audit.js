function getWorksheetCompatibility(api = window.KaizenWorksheet) {
  if (!api) {
    return {
      status: 'missing-adapter',
      canGenerate: false,
      hasStandardProblem: false,
      reason: 'KaizenWorksheet adapter was not loaded.'
    };
  }

  if (!api.canGenerate()) {
    return {
      status: 'needs-generator',
      canGenerate: false,
      hasStandardProblem: false,
      reason: 'Tool does not expose generateProblem().'
    };
  }

  try {
    const sample = api.generate({ count: 1 });
    const problem = sample.problems?.[0];
    const hasStandardProblem = Boolean(
      problem &&
      'level' in problem &&
      'type' in problem &&
      'question' in problem &&
      'answer' in problem &&
      Array.isArray(problem.steps)
    );

    return {
      status: hasStandardProblem ? 'worksheet-ready' : 'needs-adapter-work',
      canGenerate: true,
      hasStandardProblem,
      sample
    };
  } catch (error) {
    return {
      status: 'generator-error',
      canGenerate: true,
      hasStandardProblem: false,
      reason: error.message
    };
  }
}

window.getWorksheetCompatibility = getWorksheetCompatibility;
