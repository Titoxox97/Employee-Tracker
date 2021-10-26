const table = require("console.table");
const inquire = require("inquirer");
const connection = require("./db/connection");
inquire
  .prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "viewEmployees",
        },
        {
          name: "View All Employees By Department",
          value: "viewEmployees_by_branch",
        },
        {
          name: "View All Employees By Manager",
          value: "viewEmployees_by_manager",
        },
        {
          name: "Add Employee",
          value: "add_employee",
        },
        {
          name: "Remove Employee",
          value: "remove_employee",
        },
        {
          name: "Update Employee Role",
          value: "update_employee_position",
        },
        {
          name: "Update Employee Manager",
          value: "update_employee_manager",
        },
        {
          name: "View All Roles",
          value: "view_positions",
        },
        {
          name: "Add Role",
          value: "add_position",
        },
        {
          name: "Remove Role",
          value: "remove_position",
        },
        {
          name: "View All Departments",
          value: "view_branches",
        },
        {
          name: "Add Department",
          value: "add_branch",
        },
        {
          name: "Remove Department",
          value: "remove_branch",
        },
        {
          name: "View Total Utilized Budget By Department",
          value: "view_budget_by_branch",
        },
        {
          name: "Quit",
          value: "quit",
        },
      ],
    },
  ])
  //   use similar function for all prompts
  .then((res) => {
    var answer = res.choice;
    console.log(answer);
    if (answer === "viewEmployees") {
      connection.query("SELECT * FROM employees", function (err, res) {
        if (err) console.log(err);
        console.table(res);
      });
    }
    if (answer === "viewEmployees_by_branch") {
      connection.query("SELECT * FROM employees", function (err, res) {
        if (err) console.log(err);
        console.table(res);
      });
    }
    if (answer === "viewEmployees_by_manager") {
      connection.query("SELECT * FROM employees", function (err, res) {
        if (err) console.log(err);
        console.table(res);
      });
    }
    if (answer === "add_employee") {
      connection.query("SELECT * FROM employees", function (err, res) {
        if (err) console.log(err);
        console.table(res);
      });
    }
    if (answer === "remove_employee") {
      connection.query("SELECT * FROM employees", function (err, res) {
        if (err) console.log(err);
        console.table(res);
      });
    }
    if (answer === "update_employee_position") {
      connection.query("SELECT * FROM role", function (err, res) {
        if (err) console.log(err);
        console.table(res);
      });
    }
    if (answer === "update_employee_manager") {
      connection.query("SELECT * FROM employees", function (err, res) {
        if (err) console.log(err);
        console.table(res);
      });
    }
    if (answer === "view_positions") {
      connection.query("SELECT * FROM role", function (err, res) {
        if (err) console.log(err);
        console.table(res);
      });
    }
    if (answer === "add_position") {
      connection.query("SELECT * FROM role", function (err, res) {
        if (err) console.log(err);
        console.table(res);
      });
    }
    if (answer === "remove_position") {
      connection.query("SELECT * FROM role", function (err, res) {
        if (err) console.log(err);
        console.table(res);
      });
    }
    if (answer === "view_branches") {
      connection.query("SELECT * FROM department", function (err, res) {
        if (err) console.log(err);
        console.table(res);
      });
    }
    if (answer === "add_branch") {
      connection.query("SELECT * FROM department", function (err, res) {
        if (err) console.log(err);
        console.table(res);
      });
    }
    if (answer === "remove_branch") {
      connection.query("SELECT * FROM department", function (err, res) {
        if (err) console.log(err);
        console.table(res);
      });
    }
    if (answer === "view_budget_by_branch") {
      connection.query("SELECT * FROM department", function (err, res) {
        if (err) console.log(err);
        console.table(res);
      });
    }
  });
