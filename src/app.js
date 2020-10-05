const express = require("express");
const path = require("path");
const config = require("../config");

const app = express();

app.use(express.static(config.staticFolder, config.staticOptions));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

app.get("/injection", (req, res) => {
  res.sendFile(path.resolve("public/injection/index.html"));
});

module.exports = app;
