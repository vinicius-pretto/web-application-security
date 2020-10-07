const express = require("express");
const HttpStatus = require("http-status");
const config = require("../../config");
const UsersRepository = require("../users/usersRepository");

const router = express.Router();
const usersRepository = new UsersRepository();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await usersRepository.findUserByEmailAndPassword(
      email,
      password
    );

    if (!user) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: "Email or password is invalid",
      });
    }

    res.status(HttpStatus.OK).json({
      message: "Authenticated",
    });
  } catch (error) {
    console.log("Login failed", error.stack);

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
