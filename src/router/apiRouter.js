const express = require("express");
const HttpStatus = require("http-status");
const UsersRepository = require("../users/usersRepository");
const AdminsRepository = require("../users/adminsRepository");

const router = express.Router();
const usersRepository = new UsersRepository();
const adminsRepository = new AdminsRepository();

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

router.post("/authentication/login", async (req, res) => {
  const { username, password } = req.body;

  const setCookie = (userInformation) => {
    res.cookie('user', JSON.stringify(userInformation), { 
      expires: new Date(Date.now() + 7 * 24 * 3600 * 1000),
      httpOnly: true
    });
  };

  usersRepository.findUserByUsernameAndPassword(username, password)
    .then((user) => {
      if (user) {
        setCookie({isAdmin: false});
        return adminsRepository.findAdminByUserId(user.id);
      }
      delete res.cookie.user;
      return null;
    })
    .then((admin) => {
      if (admin && admin.id) {
        setCookie({isAdmin: true});
      }
      return null;
    })
    .catch(error => console.log("Login failed", error.stack))
    .finally(() => res.redirect("/my-account"));
});

module.exports = router;
