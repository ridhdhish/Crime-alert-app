const { execSync } = require("child_process");
const message = process.argv.slice(2).join().split(",")[0];
const pushToHeroku = process.argv.slice(2).join().split(",")[1];

execSync("git add .", { cwd: process.cwd() });
execSync("git commit -m " + message, { cwd: process.cwd() });
execSync("git push origin main", { cwd: process.cwd() });
if (pushToHeroku) {
  execSync("git push heroku main", { cwd: process.cwd() });
}
