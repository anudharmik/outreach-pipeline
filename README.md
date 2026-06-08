# Automated Outreach Pipeline

## Overview

This project is a command-line outreach automation system built using Node.js and JavaScript.

Given a company domain, the pipeline:

1. Finds similar companies using Ocean.io
2. Identifies C-suite decision makers using Prospeo
3. Resolves verified work emails using Prospeo Enrich
4. Generates personalized outreach emails
5. Displays a safety confirmation prompt before sending
6. Sends emails through Brevo
7. Produces a delivery summary report

The project was designed with modular architecture, API abstraction, caching, deduplication, retry handling, and graceful failure recovery.

---

## Architecture

Input Domain
↓
Ocean.io
↓
Similar Companies
↓
Prospeo Search Person
↓
Decision Makers
↓
Prospect Deduplication
(LinkedIn URL Based)
↓
Prospeo Enrich Person
↓
Verified Emails
↓
Email Deduplication
(Email Address Based)
↓
Personalized Email Generation
↓
Safety Confirmation
↓
Brevo Email Delivery
↓
Summary Report
---

## Features

* Domain validation
* Ocean.io company discovery
* Prospeo people search
* Prospeo email enrichment
* Personalized email generation
* Duplicate prospect removal
* Duplicate email removal
* API retry handling
* Rate-limit protection
* Request timeouts
* Safety confirmation before sending
* Company-wise delivery reporting
* Local caching to reduce API credit consumption

---

## Tech Stack

* Node.js
* JavaScript (ES Modules)
* Axios
* Ocean.io API
* Prospeo API
* Brevo API
* Readline Sync

---

## Environment Variables

Create a `.env` file:

```env
OCEAN_API_KEY=
PROSPEO_API_KEY=
BREVO_API_KEY=
SENDER_EMAIL=
```

---

## Installation

```bash
npm install
```

Run:

```bash
npm start
```

---

## Example Flow

```bash
Enter company domain: stripe.com
```

Output:

```bash
Found 2 similar companies
Found 6 decision makers
Found 6 verified emails

Proceed with sending 6 emails? (y/n)
```

---

## Error Handling

The pipeline handles:

* Invalid domains
* Missing API keys
* API failures
* Rate limits
* Request timeouts
* Duplicate prospects
* Duplicate email addresses
* Empty result sets
* Partial enrichment failures

---

## Design Decisions

### Local Caching for Development

During development, API responses were stored locally in JSON files (companies.json, prospects.json, enrichedProspects.json) to reduce API credit consumption, speed up testing, and avoid repeated calls to third-party services. The final pipeline executes against live APIs.

### Sequential Processing

API calls are executed sequentially with delays to avoid third-party rate limits.

### Safety Confirmation

Emails are never sent automatically without explicit user confirmation.

---

## Future Improvements

* Persistent database storage
* Advanced retry queues
* Bounce tracking
* HTML email templates
* CRM integration
* Parallelized processing

