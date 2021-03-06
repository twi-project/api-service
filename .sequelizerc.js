const {join} = require("path")

module.exports = {
  config: join(__dirname, "setup", "db", "config.js"),
  "models-path": join(__dirname, "model"),
  "seeders-path": join(__dirname, "setup", "db", "seed"),
  "migrations-path": join(__dirname, "setup", "db", "migration")
}
