const mysql2 = require("mysql2");
const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "Glevy9897Ahrens",
  database: "employee_manager",
});
connection.connect();
module.exports = connection;
