// lib/mockApi.ts
export const suggestFollowUp = async (transcript: string, resume?: string, jd?: string) => {
  // Simulate network latency and return a deterministic-ish suggestion.
  await new Promise((res) => setTimeout(res, 800 + Math.random() * 700));
  const lastLine = transcript.split('.').slice(-2).join('.').trim();
  return {
    suggestion: lastLine
      ? `Follow-up: Could you expand on "${lastLine.replace(/\[interim:.*\]/, '').trim()}"? Maybe share an example or the specific outcome.`
      : 'Follow-up: Can you elaborate on your most recent project and the concrete metrics you influenced?',
  };
};

export const summarizeAnswer = async (transcript: string) => {
  await new Promise((res) => setTimeout(res, 600 + Math.random() * 600));
  const sentences = transcript.replace(/\[interim:.*\]/, '').split(/[.!?]\s/).filter(Boolean);
  const summary = sentences.slice(-3).join('. ');
  return {
    summary: summary ? `Short summary: ${summary.replace(/\s+/g, ' ').trim()}.` : 'Short summary: No audible answer detected yet.',
  };
};
