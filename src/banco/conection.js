import pg from "pg";

const { Pool } = pg;

const user = "postgres";
const password = "106652";
const host = "localhost";
const port = 5432;
const database = "banco_shortly";

const connection = new Pool({
  user,
  password,
  host,
  port,
  database,
});

export default connection;
