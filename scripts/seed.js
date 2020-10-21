const dotenv = require("dotenv");
const _ = require("lodash");
dotenv.config();
const { Client } = require("pg");
const config = require("../config");
const data = require("./users");

const userDataVariables = (data) =>
  data
    .map(
      (_, index) => `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3})`
    )
    .join(", ");

const adminDataVariables = (ids) =>
  ids.map((_, index) => `($${index + 1})`).join(", ");

const INSERT_USERS = (data) => {
  return {
    text: `INSERT into users (email, username, password) VALUES ${userDataVariables(
      data
    )} RETURNING id;`,
    values: _.flatten(data),
  };
};

const LINK_ADMINS = (ids) => ({
  text: `INSERT into admins (user_id) VALUES ${adminDataVariables(ids)};`,
  values: ids,
});

async function seed() {
  const client = new Client({
    connectionString: config.postgres.connectionUri,
  });
  await client.connect();

  client
    .query(INSERT_USERS(data))
    .then((res) => {
      const adminIds = res.rows
        .filter(({ id }) => id % 5 === 0)
        .map(({ id }) => id);
      return client.query(LINK_ADMINS(adminIds));
    })
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
}

seed();
