import readlineSync from "readline-sync";
import { validateDomain } from "./utils/validateDomain.js";
import { runPipeline } from "./pipeline/outreachPipeline.js";

const domain =
  readlineSync.question("Enter company domain: ");

if (!validateDomain(domain)) {
  console.log("Invalid domain");
  process.exit(1);
}

await runPipeline(domain);