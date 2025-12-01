const { execSync } = require("child_process");
const path = require("path");

const port = process.env.PORT || 3000;
const nextPath = path.resolve(__dirname, "node_modules/next/dist/bin/next");

execSync(`node ${nextPath} start -p ${port}`, {
  stdio: "inherit",
});
