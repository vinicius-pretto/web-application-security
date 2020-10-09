const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("../config");
const apiRouter = require("./router/apiRouter");
const clientRouter = require("./router/clientRouter");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(config.staticFolder, config.staticOptions));
app.use(config.apiPrefix, apiRouter);
app.use(clientRouter);

module.exports = app;
