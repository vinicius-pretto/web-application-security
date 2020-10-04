const path = require("path");

const config = {};

// Application port
config.port = process.env.PORT || 3000;

// Static middleware
config.staticFolder = path.resolve("public");
config.staticOptions = {
  index: false,
};

module.exports = config;
