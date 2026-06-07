import axios from "axios";
import { env } from "../config/env.js";


const oceanClient = axios.create({
  baseURL: "https://api.ocean.io",
  timeout:30000,
  headers: {
    "X-Api-Token": env.oceanApiKey,
    "Content-Type": "application/json",
  },
});


export async function findLookalikeCompanies(domain) {
  console.log(`Calling Ocean for ${domain}`);
  const response = await oceanClient.post(
    "/v3/search/companies",
    {
      size: 2,
      companiesFilters: {
        lookalikeDomains: [domain],
        excludeDomains: [domain],
      },
    }
  );

  return response.data.companies;
}
