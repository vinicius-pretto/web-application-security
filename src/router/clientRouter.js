const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

router.get("/injection", (req, res) => {
  res.sendFile(path.resolve("public/injection/index.html"));
});

router.get("/injection/welcome", (req, res) => {
  res.sendFile(path.resolve("public/injection/welcome.html"));
});

router.get("/authentication", (req, res) => {
  req.cookies.user === undefined
    ? res.sendFile(path.resolve("public/authentication/index.html"))
    : res.redirect("/my-account");
});

router.get("/my-account", (req, res) => {
  if (req.cookies.user === undefined) {
    res.redirect("/authentication");
  }
  else JSON.parse(req.cookies.user).isAdmin
    ? res.sendFile(path.resolve("public/authentication/admin.html"))
    : res.sendFile(path.resolve("public/authentication/user.html"));
});

module.exports = router;
