import axios from "axios";
import { env } from "../config/env.js";

const brevoClient = axios.create({
  baseURL: "https://api.brevo.com/v3",
  timeout:10000,
  headers: {
    "api-key": env.brevoApiKey,
    "Content-Type": "application/json",
  },
});

export async function sendEmail({
  to,
  subject,
  htmlContent,
}) {
  console.log(`Sending to ${to}`);
  const response = await brevoClient.post(
    "/smtp/email",
    {
      sender: {
        name: "Anurag",
        email: env.senderEmail,
      },
      to: [{ email: to }],
      subject,
      htmlContent,
    }
  );

  return {
    success: true,
    messageId: response.data.messageId,
  };
}