const getUserInformation = (req, res, next) => {
  res.locals.isAdmin = 
    req.body.username === "admin" &&
    req.body.password === "admin"

  next();
};

const manageCookies = (req, res, next) => {
  const userInformation = {
    isAdmin: res.locals.isAdmin
  };

  res.cookie('user', JSON.stringify(userInformation), { 
    expires: new Date(Date.now() + 7 * 24 * 3600 * 1000),
    httpOnly: true
  });

  next();
};

module.exports = {
  getUserInformation,
  manageCookies
}