const dotenv = require("dotenv");
dotenv.config();
const { Client } = require("pg");
const config = require("../config");
const data = require("./users");

const userDataVariables = (data) => 
  data.map((_, index) => 
    `($${(index * 3) + 1}, $${(index * 3) + 2}, $${(index * 3) + 3})`).join(", ");

const adminDataVariables = (ids) => 
  ids.map((_, index) => `($${index + 1})`).join(", ");

const INSERT_LOCAL_USERS = (config) => ({
  text: `INSERT INTO users (email, username, password) VALUES ($1, $2, $3);`,
  values: [config.loginEmail, config.loginUsername, config.loginPassword]
})

const INSERT_USERS = (data) => ({
  text: `INSERT into users (email, username, password) VALUES ${userDataVariables(data)} RETURNING id;`,
  values: data.flat(2)
});

const LINK_ADMINS = (ids) => ({
  text: `INSERT into admins (user_id) VALUES ${adminDataVariables(ids)};`,
  values: ids
});

async function seed() {
  const client = new Client({
    connectionString: config.postgres.connectionUri,
  });
  await client.connect();

  client
    .query(INSERT_USERS(data))
    .then(client.query(INSERT_LOCAL_USERS(config)))
    .then(res => {
      const adminIds = res.rows.filter(({id}) => (id % 5 === 0)).map(({id}) => id);
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
