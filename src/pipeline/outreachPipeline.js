import fs from "fs";
import { findLookalikeCompanies } from "../clients/ocean.js";
// import {searchPeopleByCompany } from "../clients/prospeo.js"; // until the final
import { dedupeProspects } from "../utils/dedupe.js";
import { generateEmail } from "../utils/emailTemplate.js";
// import { enrichPerson } from "../clients/prospeo.js"; //until final
import readlineSync from "readline-sync";
import { sendEmail } from "../clients/brevo.js";

function displayProspects(prospects) {
  console.log(`\nFound ${prospects.length} unique decision makers\n`);
  prospects.forEach((person, index) => {
    console.log(`${index + 1}. ${person.fullName}`);
    console.log(`   Title: ${person.title}`);
    console.log(`   Company: ${person.companyName}`);
    console.log(`   LinkedIn: ${person.linkedinUrl}`);
    console.log();
  });
}


export async function runPipeline(domain) {
  const companies = await findLookalikeCompanies(domain);   

  fs.writeFileSync(
  "./data/companies.json",
  JSON.stringify(companies, null, 2)
  );  

  // const companies = JSON.parse(
  // fs.readFileSync("./data/companies.json")
  // );

  console.log(`Found ${companies.length} similar companies`);

  companies.forEach((item, index) => {
    console.log(
      `${index + 1}. ${item.company.name} (${item.company.domain})`
    );
  });


  let prospects = [];

  for (const company of companies) {
    const companyProspects =
    await searchPeopleByCompany(company.company.domain);
    prospects.push(...companyProspects);
  }    

  fs.writeFileSync(
  "./data/prospects.json",
  JSON.stringify(prospects, null, 2)
  );

// const prospects = JSON.parse(
//   fs.readFileSync("./data/prospects.json")
// );

const uniqueProspects = dedupeProspects(prospects);

displayProspects(uniqueProspects);


// const enriched=JSON.parse(
//   fs.readFileSync("./data/enrichedProspects.json")
// );

const enriched = [];
for (const prospect of uniqueProspects) {
  try {
    const result = await enrichPerson(
      prospect.personId
    );

    if (result.email) {
      enriched.push(result);
    }
  } catch (error) {
    console.log(
      `Skipping ${prospect.fullName}`
    );
  }
}

fs.writeFileSync(
  "./data/enrichedProspects.json",
  JSON.stringify(enriched, null, 2)
);

const outreachQueue = enriched.filter((prospect) => prospect.email).map((prospect) => {
    const emailContent = generateEmail(prospect);

    return {
      ...prospect,
      subject: emailContent.subject,
      body: emailContent.body,
    };
  });

  if (outreachQueue.length === 0) {
    console.log(
      "\nNo prospects with verified emails found."
    );
    return;
  }

  console.log(outreachQueue);

  console.log(`\nReady to send ${outreachQueue.length} personalized emails\n`);

  outreachQueue.forEach((prospect, index) => {
  console.log(
    `${index + 1}. ${prospect.fullname} - ${prospect.email}`
  );
  });



  const preview = outreachQueue[0];

  console.log("\nEmail Preview\n");
  console.log(`To: ${preview.email}`);
  console.log(`Subject: ${preview.subject}`);
  console.log(preview.body);

  const answer = readlineSync.question(
    `\nProceed with sending ${outreachQueue.length} emails? (y/n): `
  ).toLowerCase();
  
    if (answer !== "y") {
     console.log("\nEmail sending cancelled.");
     return;
    }
  
  console.log("\nSending emails...\n");
  let successCount = 0;
  let failureCount = 0;

  const companyStats = {};
  for (const prospect of outreachQueue) {
    try {

      const result= await sendEmail({
        to: "anuragdharmik07@gmail.com",
        subject: prospect.subject,
        htmlContent: prospect.body.replace(/\n/g, "<br>"),
      });

      console.log(`✓ Accepeted by Brevo: ${prospect.email}`);
      console.log(`   Message ID: ${result.messageId}`);
      successCount++;

      if (!companyStats[prospect.companyName]) {
         companyStats[prospect.companyName] = [];
      }

      companyStats[prospect.companyName].push(
          prospect.fullName
      );

    } catch (error) {
    console.log(`✗ Failed: ${prospect.email}`);
    console.log(`   Reason: ${error.message}`);
    failureCount++;
  }
  }

  console.log("\n========== SUMMARY ==========\n");

  console.log(`Companies Processed: ${companies.length}`);
  console.log(`Decision Makers Found: ${uniqueProspects.length}`);
  console.log(`Verified Emails: ${outreachQueue.length}`);
  console.log(`Successfully Sent: ${successCount}`);
  console.log(`Failed: ${failureCount}`);

  console.log("\nRecipients by Company:\n");

  Object.entries(companyStats).forEach(
  ([company, recipients]) => {
    console.log(`${company}: ${recipients.length} recipient(s)`);

    recipients.forEach((name) => {
      console.log(`   - ${name}`);
    });

    console.log();
  }
  );

  // fs.writeFileSync(
  // "./data/enrichedProspects.json",
  // JSON.stringify(enriched, null, 2)
  // );

  return;


  // return {
  //   companies,
  //   prospects: uniqueProspects,
  // };
}