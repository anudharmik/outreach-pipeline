import axios from "axios";
import { env } from "../config/env.js";

const prospeoClient = axios.create({
  baseURL: "https://api.prospeo.io",
  headers: {
    "X-KEY": env.prospeoApiKey,
    "Content-Type": "application/json",
  },
});

export async function searchPeopleByCompany(domain) {
  const response = await prospeoClient.post(
    "/search-person",
    {
      page: 1,
      filters: {
        company: {
          websites: {
            include: [domain],
          },
        },
        person_seniority: {
          include: ["C-Suite"],
        },
      },
    }
  );

  return response.data.results.map(item => ({
  fullName: item.person.full_name,
  title: item.person.current_job_title,
  linkedinUrl: item.person.linkedin_url,
  companyName: item.company.name,
  }));

}