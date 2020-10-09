const dotenv = require("dotenv");
dotenv.config();
const { Client } = require("pg");
const config = require("../config");

const CREATE_USERS_TABLE = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY, 
    email VARCHAR(128) NOT NULL, 
    username VARCHAR(128) NOT NULL,
    password TEXT NOT NULL
  );
`;

const CREATE_ADMIN_TABLE = `
  CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id)
  );
`;

async function migrate() {
  const client = new Client({
    connectionString: config.postgres.connectionUri,
  });
  await client.connect();

  client
    .query(CREATE_USERS_TABLE)
    .then(client.query(CREATE_ADMIN_TABLE))
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
}

migrate();
