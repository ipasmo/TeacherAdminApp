const dbConfig = require("../config/db.config.js");
const mysql = require("mysql");

var connection = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
});

module.exports = connection;