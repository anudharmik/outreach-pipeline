import axios from "axios";
import { env } from "../config/env.js";

const oceanClient = axios.create({
  baseURL: "https://api.ocean.io/v2",
  headers: {
    "X-Api-Token": env.oceanApiKey,
  },
});

export async function getCreditsBalance() {
  const response = await oceanClient.get("/credits/balance");
  return response.data;
}