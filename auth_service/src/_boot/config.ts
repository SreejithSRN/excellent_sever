import { config } from "dotenv";
config();

export const env_variables = {
  PORT: process.env.PORT,
  // FRONTEND_URL:process.env.FRONTEND_URL,
  MONGODB_URL: process.env.MONGODB_URL,
  ACCESS_TOKEN_SECRET: String(process.env.ACCESS_TOKEN_SECRET),
  REFRESH_TOKEN_SECRET: String(process.env.REFRESH_TOKEN_SECRET),
  USERMAIL:String(process.env.USERMAIL),
  USERSECRET:String(process.env.USERSECRET)
};
