import * as dotenv from "dotenv";

dotenv.config();

export const environment = {
  PORT: Number(process.env.PORT),
  DB_URL: process.env.DB_URL,
  DB_PORT: Number(process.env.DB_PORT),
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DATABASE: process.env.DATABASE,
};
