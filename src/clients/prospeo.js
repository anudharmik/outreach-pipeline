const axios = require('axios');
const config = require('../config/env');
const logger = require('../utils/logger');

class ProspeoClient {
  constructor() {
    this.apiKey = config.prospeo.apiKey;
    this.baseUrl = 'https://api.prospeo.io/v1'; // Example base URL
  }

  // Example API call to find emails
  async findEmail(domain) {
    if (!this.apiKey) {
      logger.warn('Prospeo API Key is missing. Skipping email search.');
      return null;
    }

    logger.info(`Finding emails via Prospeo for domain: ${domain}`);
    try {
      const response = await axios.post(`${this.baseUrl}/email-finder`, {
        domain
      }, {
        headers: { 'Content-Type': 'application/json', 'X-KEY': this.apiKey }
      });
      return response.data;
    } catch (error) {
      logger.error(`Prospeo API error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new ProspeoClient();
