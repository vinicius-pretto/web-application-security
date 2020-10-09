const fs = require("fs");

function buildUsers() {
  const userData = 
    fs.readFileSync(__dirname + "/users.txt", "utf-8").toString()
    .split("\n")
    .map(data => data
      .split(",")
      .map(d => d.replace(/'/g,"")));

  return userData;
};

module.exports = buildUsers();