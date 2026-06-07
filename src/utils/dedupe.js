export function dedupeProspects(prospects) {
  const seen = new Set();

  return prospects.filter((prospect) => {
    const key = prospect.linkedinUrl;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}