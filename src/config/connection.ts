import { Pool } from "pg";
import { environment } from "./environment";

const { DB_URL, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DATABASE } =
  environment;

const pool = new Pool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DATABASE,
  // connectionString: DB_URL,

  // ssl: {
  //   rejectUnauthorized: false,
  // },
});

export default pool;
