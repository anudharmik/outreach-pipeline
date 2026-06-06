const axios = require('axios');
const config = require('../config/env');
const logger = require('../utils/logger');

class BrevoClient {
  constructor() {
    this.apiKey = config.brevo.apiKey;
    this.baseUrl = 'https://api.brevo.com/v3';
  }

  async sendEmail({ to, subject, htmlContent }) {
    if (!this.apiKey) {
      logger.warn('Brevo API Key is missing. Skipping sending email.');
      return null;
    }

    logger.info(`Sending email to ${to} via Brevo`);
    try {
      const response = await axios.post(`${this.baseUrl}/smtp/email`, {
        sender: { name: config.brevo.senderName, email: config.brevo.senderEmail },
        to: [{ email: to }],
        subject,
        htmlContent
      }, {
        headers: {
          'api-key': this.apiKey,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      logger.error(`Brevo API error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new BrevoClient();
