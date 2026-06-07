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

export function dedupeEmails(prospects) {
  const seen = new Set();

  return prospects.filter((prospect) => {
    const email = prospect.email?.toLowerCase();

    if (!email) return false;

    if (seen.has(email)) {
      return false;
    }

    seen.add(email);
    return true;
  });
}