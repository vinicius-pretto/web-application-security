const express = require("express");
const config = require("../config");
const apiRouter = require("./router/apiRouter");
const clientRouter = require("./router/clientRouter");

const app = express();

app.use(express.json());
app.use(express.static(config.staticFolder, config.staticOptions));
app.use(config.apiPrefix, apiRouter);
app.use(clientRouter);

module.exports = app;
