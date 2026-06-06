import fs from "fs";
// import { findLookalikeCompanies } from "../clients/ocean.js";
import {searchPeopleByCompany } from "../clients/prospeo.js";

function displayProspects(prospects) {
  console.log(`\nFound ${prospects.length} decision makers\n`);

  prospects.forEach((person, index) => {
    console.log(`${index + 1}. ${person.fullName}`);
    console.log(`   Title: ${person.title}`);
    console.log(`   Company: ${person.companyName}`);
    console.log(`   LinkedIn: ${person.linkedinUrl}`);
    console.log();
  });
}

export async function runPipeline(domain) {
  //const companies = await findLookalikeCompanies(domain); until the final

  //const prospects = await searchPeopleByCompany("razorpay.com"); until the final, have to apply loop to loop through all 5 companies

  const companies = JSON.parse(
  fs.readFileSync("./data/companies.json")
  );

  const prospects = JSON.parse(
  fs.readFileSync("./data/prospects.json")
  );


  console.log(`Found ${companies.length} similar companies`);

  companies.forEach((item, index) => {
    console.log(
      `${index + 1}. ${item.company.name} (${item.company.domain})`
    );
  });

  console.log(`\nFound ${prospects.length} decision makers\n`);
  displayProspects(prospects);

  return companies;
}