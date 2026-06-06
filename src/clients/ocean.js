import axios from "axios";
import { env } from "../config/env.js";


const oceanClient = axios.create({
  baseURL: "https://api.ocean.io",
  headers: {
    "X-Api-Token": env.oceanApiKey,
    "Content-Type": "application/json",
  },
});

// export async function findLookalikeCompanies(domain) {
//   const response = await oceanClient.post(
//     "/v3/search/companies",
//     {
//       size: 20,
//       companiesFilters: {
//         lookalikeDomains: [domain],
//         excludeDomains: [domain],
//       },
//     }
//   );

//   return response.data;
// }

export async function findLookalikeCompanies(domain) {
  const response = await oceanClient.post(
    "/v3/search/companies",
    {
      size: 5,
      companiesFilters: {
        lookalikeDomains: [domain],
        excludeDomains: [domain],
      },
    }
  );

  return response.data.companies;
}
