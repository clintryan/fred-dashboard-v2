const PERSONA_TO_TAG = {
  FluentRx: 'fluentrx',
  CoderClint: 'coder',
  ClintTeacher: 'teacher',
  Trader: 'trader',
}

export function filterByPersona(items, persona, key = 'persona') {
  if (!Array.isArray(items)) return items
  if (persona === 'All') return items
  const tag = PERSONA_TO_TAG[persona] || persona
  return items.filter((item) => item?.[key] === tag)
}
