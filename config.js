const path = require("path");

const config = {};

// Application port
config.port = process.env.PORT || 3000;

// API routes prefix
config.apiPrefix = "/api";

// Login credentials
config.loginEmail = process.env.LOGIN_EMAIL;
config.loginUsername = process.env.LOGIN_USERNAME;
config.loginPassword = process.env.LOGIN_PASSWORD;

// Static middleware
config.staticFolder = path.resolve("public");
config.staticOptions = {
  index: false,
};

// PostgreSQL
config.postgres = {
  connectionUri:
    "postgresql://postgres:postgres@localhost:5432/web_application_security",
};

// MongoDB
config.mongoDB = {
  connectionUri: "mongodb://localhost:27017",
};

module.exports = config;
