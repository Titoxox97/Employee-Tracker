const inquirer = require("inquirer");
const mysql = require("mysql2");

// initialize the project
function initialize() {
  runPromptInq();
}
initialize();

// Prompt functions

function runPromptInq() {
  inquirer.prompt().then((response) => getQueries(response));
}

function getQueries(response) {
  switch (true) {
    case response.navigation === "view all branches":
      db.query("SELECT * FROM departments", function (err, results) {
        console.table(results);
        runPromptInq();
      });
      break;
    case response.navigation === "view all positions":
      db.query();
  }
}
