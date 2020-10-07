const { Client } = require("pg");
const config = require("../../config");

class UsersRepository {
  constructor() {
    this.client = new Client({
      connectionString: config.postgres.connectionUri,
    });
    this.client.connect();
  }

  async findUserByEmailAndPassword(email, password) {
    const response = await this.client.query(
      `SELECT id FROM users 
        WHERE email='${email}'
        AND password='${password}'
        LIMIT 1
      `
    );
    return response.rows[0];
  }
}

module.exports = UsersRepository;
