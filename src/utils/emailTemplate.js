/**
 * Generates an email body using custom templates.
 * @param {string} templateName - Name of the template.
 * @param {Object} variables - Key-value pairs to replace in the template.
 * @returns {string} - Compiled template string.
 */
function compileTemplate(templateName, variables = {}) {
  // Simple replacement templating
  let template = '';
  
  if (templateName === 'outreach') {
    template = `
      Hi {{name}},
      
      I noticed you are working at {{company}}. I would love to connect and discuss how we can help you optimize your outreach pipeline.
      
      Best regards,
      The Team
    `;
  } else {
    template = `Hello {{name}}, welcome!`;
  }

  let compiled = template;
  for (const [key, value] of Object.entries(variables)) {
    const placeholder = new RegExp(`{{${key}}}`, 'g');
    compiled = compiled.replace(placeholder, value || '');
  }

  return compiled.trim();
}

module.exports = {
  compileTemplate
};
