# Automated Outreach Pipeline

An automated outreach pipeline designed to streamline lead generation, domain validation, email finding, contact enrichment, and automated email outreach using Ocean, Prospeo, Eazyreach, and Brevo APIs.

## Project Structure

```
outreach/
├── src/
│   ├── clients/
│   │   ├── ocean.js
│   │   ├── prospeo.js
│   │   ├── eazyreach.js
│   │   └── brevo.js
│   ├── pipeline/
│   │   └── outreachPipeline.js
│   ├── utils/
│   │   ├── logger.js
│   │   ├── retry.js
│   │   ├── dedupe.js
│   │   ├── emailTemplate.js
│   │   └── validateDomain.js
│   ├── config/
│   │   └── env.js
│   └── index.js
├── logs/
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   Copy `.env.example` to `.env` and fill in your API credentials:
   ```bash
   cp .env.example .env
   ```

3. Run the application:
   ```bash
   npm start
   ```

   For development with hot reloading:
   ```bash
   npm run dev
   ```
