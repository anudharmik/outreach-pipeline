const logger = require('../utils/logger');
const oceanClient = require('../clients/ocean');
const prospeoClient = require('../clients/prospeo');
const eazyreachClient = require('../clients/eazyreach');
const brevoClient = require('../clients/brevo');
const retry = require('../utils/retry');
const dedupe = require('../utils/dedupe');
const validateDomain = require('../utils/validateDomain');
const { compileTemplate } = require('../utils/emailTemplate');

class OutreachPipeline {
  constructor() {
    logger.info('Outreach Pipeline initialized.');
  }

  async run(domains = []) {
    logger.info(`Running pipeline for ${domains.length} domains.`);
    
    // 1. Validate domains
    const validDomains = domains.filter(validateDomain);
    logger.info(`Valid domains list: ${JSON.stringify(validDomains)}`);

    for (const domain of validDomains) {
      try {
        logger.info(`Processing domain: ${domain}`);
        
        // 2. Query Ocean for company details
        const companyInfo = await retry(() => oceanClient.searchCompanies(domain));
        
        // 3. Query Prospeo for emails
        const emailInfo = await retry(() => prospeoClient.findEmail(domain));
        
        // Let's assume we got an email to outreach
        const targetEmail = emailInfo?.email || `info@${domain}`;
        const targetName = emailInfo?.name || 'Partner';

        // 4. Enrich contact using Eazyreach
        const enrichedInfo = await retry(() => eazyreachClient.enrichContact(targetEmail));

        // 5. Build and send email template
        const emailBody = compileTemplate('outreach', {
          name: targetName,
          company: companyInfo?.name || domain
        });

        await retry(() => brevoClient.sendEmail({
          to: targetEmail,
          subject: `Partnership Inquiry for ${companyInfo?.name || domain}`,
          htmlContent: emailBody
        }));

        logger.info(`Successfully processed outreach for ${domain}`);
      } catch (error) {
        logger.error(`Failed to process outreach for ${domain}: ${error.message}`);
      }
    }
  }
}

module.exports = OutreachPipeline;
