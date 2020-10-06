const dotenv = require("dotenv");
dotenv.config();
const { Client } = require("pg");
const config = require("../config");

const CREATE_USERS_TABLE =
  "CREATE TABLE IF NOT EXISTS users (email VARCHAR(128), password TEXT);";

const INSERT_USERS = `INSERT INTO users (email, password) VALUES ('${config.loginEmail}', MD5('${config.loginPassword}'));`;

async function migrate() {
  const client = new Client({
    connectionString: config.postgres.connectionUri,
  });
  await client.connect();

  client
    .query(CREATE_USERS_TABLE)
    .then(client.query(INSERT_USERS))
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
}

migrate();
