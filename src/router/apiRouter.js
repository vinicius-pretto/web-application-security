const express = require("express");
const HttpStatus = require("http-status");
const config = require("../../config");

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email !== config.loginEmail || password !== config.loginPassword) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      message: "Email or password is invalid",
    });
  }
  res.status(HttpStatus.OK).json({
    message: "Authenticated",
  });
});

module.exports = router;
