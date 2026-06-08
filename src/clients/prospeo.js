import axios from "axios";
import { env } from "../config/env.js";

const prospeoClient = axios.create({
  baseURL: "https://api.prospeo.io",
  timeout:30000,
  headers: {
    "X-KEY": env.prospeoApiKey,
    "Content-Type": "application/json",
  },
});

export async function searchPeopleByCompany(domain,retries=2) {
  try{
    console.log(`Searching prospects for ${domain}`);
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

  }catch(error){
    if (error.response?.status === 429 && retries>0 ){
    console.log(
      "Prospeo rate limit reached. Waiting 10 seconds..."
    );

    await new Promise(resolve =>
      setTimeout(resolve, 10000)
    );

    return searchPeopleByCompany(domain,retries-1);
  }

  throw error;
  }
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
  if (!data.person?.email?.email) {
  return null;
  }

  return{
    fullName:data.person.full_name,
    title:data.person.current_job_title,
    linkedinUrl:data.person.linkedin_url,
    companyName:data.company?.name,
    email:data.person.email?.email,
  };

}