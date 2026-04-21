export function filterByPersona(items, persona, key = 'persona') {
  if (!Array.isArray(items)) return items
  if (persona === 'All') return items
  return items.filter((item) => item?.[key] === persona)
}
