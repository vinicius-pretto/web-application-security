const path = require("path");

const config = {};

// Application port
config.port = process.env.PORT || 3000;

// API routes prefix
config.apiPrefix = "/api";

// Login credentials
config.loginEmail = process.env.LOGIN_EMAIL;
config.loginPassword = process.env.LOGIN_PASSWORD;

// Static middleware
config.staticFolder = path.resolve("public");
config.staticOptions = {
  index: false,
};

module.exports = config;
