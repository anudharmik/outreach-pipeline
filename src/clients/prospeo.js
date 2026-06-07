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

  return response.data.results.slice(0,3).map(item => ({
  personId: item.person.person_id,
  fullName: item.person.full_name,
  title: item.person.current_job_title,
  linkedinUrl: item.person.linkedin_url,
  companyName: item.company.name,
  }));
}


export async function enrichPerson(personId) {
  const response = await prospeoClient.post(
    "/enrich-person",
    {
      only_verified_email: true,
      data: {
        person_id: personId,
      },
    }
  );

  const data = response.data;
  return{
    fullName:data.person.full_name,
    title:data.person.current_job_title,
    linkedinUrl:data.person.linkedin_url,
    companyName:data.company?.name,
    email:data.person.email?.email,
  };

}