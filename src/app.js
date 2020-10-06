const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("../config");
const { getUserInformation, manageCookies } = require("./middleware");
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

app.get("/authentication", (req, res) => {
  req.cookies.user === undefined
    ? res.sendFile(path.resolve("public/authentication/index.html"))
    : res.redirect("/my-account");
});

app.post("/login", getUserInformation, manageCookies, (req, res) => {
  res.redirect("/my-account");
});

app.get("/my-account", (req, res) => {
  if (req.cookies.user === undefined) {
    res.redirect("/authentication");
  }
  else JSON.parse(req.cookies.user).isAdmin
    ? res.sendFile(path.resolve("public/authentication/admin.html"))
    : res.sendFile(path.resolve("public/authentication/user.html"));
});

module.exports = app;
