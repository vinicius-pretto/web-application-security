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

module.exports = router;
