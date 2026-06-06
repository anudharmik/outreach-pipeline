const axios = require('axios');
const config = require('../config/env');
const logger = require('../utils/logger');

class EazyreachClient {
  constructor() {
    this.apiKey = config.eazyreach.apiKey;
    this.baseUrl = 'https://api.eazyreach.com/v1'; // Example base URL
  }

  // Example API call to find LinkedIn profiles or enrich emails
  async enrichContact(email) {
    if (!this.apiKey) {
      logger.warn('Eazyreach API Key is missing. Skipping enrichment.');
      return null;
    }

    logger.info(`Enriching contact via Eazyreach for email: ${email}`);
    try {
      const response = await axios.get(`${this.baseUrl}/enrich`, {
        params: { email },
        headers: { Authorization: `Bearer ${this.apiKey}` }
      });
      return response.data;
    } catch (error) {
      logger.error(`Eazyreach API error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new EazyreachClient();
