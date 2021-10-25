const inquirer = require("inquirer");
const mysql = require("mysql2");

// connect the file to the database
const connection = mysql2.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Glevy9897Ahrens",
    database: "employee_manager",
  },
  console.log("Database is connected")
);

const controlCenter = [
  {
    type: "list",
    message: "Where do you want to go?",
    name: "Control Center",
    choices: [
      "view all branches",
      "view all positions",
      "view all associates",
      "add a branch",
      "add an associate",
      "update an associates position",
    ],
  },
];
