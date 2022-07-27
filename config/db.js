let mysql = require("mysql2");
// connection to mysql database

var dbCon = mysql.createConnection({
  host: "203.159.92.65",
  user: "nbadigit",
  password: "*NBADigital9111*",
  database: "nbadigit_data2",
});
dbCon.connect();
module.exports = dbCon;
