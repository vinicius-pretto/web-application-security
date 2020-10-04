const figlet = require("figlet");
const chalk = require("chalk");
const app = require("./src/app");
const config = require("./config");

app.listen(config.port, () => {
  figlet("OWASP Top Ten", (err, data) => {
    if (err) {
      console.log("Failed to generate tokens ", err);
      return;
    }
    console.log(data);
    console.log(chalk.magenta(`Ready on http://localhost:${config.port}`));
  });
});
