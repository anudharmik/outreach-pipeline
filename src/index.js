import readlineSync from "readline-sync";
import { validateDomain } from "./utils/validateDomain.js";
import { getCreditsBalance } from "./clients/ocean.js";

const balance = await getCreditsBalance();


const domain = readlineSync.question("Enter company domain: ");


if (!validateDomain(domain)) {
  console.log("Invalid domain");
  process.exit(1);
}

console.log("Valid domain:", domain);
console.log(balance);