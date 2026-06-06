export function validateDomain(domain) {
  const regex =
    /^[a-zA-Z0-9][-a-zA-Z0-9]*\.[a-zA-Z]{2,}$/;

  return regex.test(domain);
}