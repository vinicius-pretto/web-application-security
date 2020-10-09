const { Client } = require("pg");
const config = require("../../config");

class AdminsRepository {
  constructor() {
    this.client = new Client({
      connectionString: config.postgres.connectionUri,
    });
    this.client.connect();
  }

  async findAdminByUserId(id) {
    const query = {
      text: `SELECT id FROM admins WHERE user_id = ($1);`,
      values: [id]
    };

    const response = await this.client.query(query);
    return response.rows[0];
  }
}

module.exports = AdminsRepository;
