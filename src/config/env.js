import dotenv from "dotenv";

dotenv.config();

export const env = {
  oceanApiKey: process.env.OCEAN_API_KEY,
  prospeoApiKey: process.env.PROSPEO_API_KEY,
  brevoApiKey: process.env.BREVO_API_KEY,
  senderEmail: process.env.SENDER_EMAIL
};

if (!process.env.PROSPEO_API_KEY) {
  throw new Error(
    "Missing PROSPEO_API_KEY"
  );
}

if (!process.env.BREVO_API_KEY) {
  throw new Error(
    "Missing BREVO_API_KEY"
  );
}