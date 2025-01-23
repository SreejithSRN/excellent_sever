import { config } from "dotenv";
config();

export const env_variables = {
  PORT: process.env.PORT,
  // FRONTEND_URL:process.env.FRONTEND_URL,
  MONGODB_URL: process.env.MONGODB_URL,
  
};