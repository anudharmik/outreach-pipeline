/**
 * Deduplicates an array of objects based on a specific key.
 * @param {Array<Object>} list - The list to deduplicate.
 * @param {string} key - The unique property/key to filter by.
 * @returns {Array<Object>}
 */
function dedupe(list, key) {
  if (!Array.isArray(list)) return [];
  const seen = new Set();
  return list.filter(item => {
    const val = item && item[key];
    if (val === undefined || val === null) return false;
    const normalized = typeof val === 'string' ? val.trim().toLowerCase() : val;
    if (seen.has(normalized)) {
      return false;
    }
    seen.add(normalized);
    return true;
  });
}

module.exports = dedupe;
