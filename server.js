const table = require("console.table");
const { listenerCount } = require("events");
const inquirer = require("inquirer");
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
      connection.query(
        "SELECT employees.id AS employee_id, CONCAT(employees.first_name,employees.last_name) AS employeeName, role.title AS role_title, role.salary AS role_salary, department.name AS department_name FROM employees left JOIN role ON employees.role_id = role.id left JOIN department ON role.department_id = department.id ",
        function (err, res) {
          if (err) console.log(err);
          console.table(res);
        }
      );
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
      inquire
        .prompt([
          {
            name: "first_name",
            message: "What is your first name?",
          },
          {
            name: "last_name",
            message: "What is your last name?",
          },
        ])
        .then((res) => {
          const first_name = res.first_name;
          const last_name = res.last_name;
          console.log(first_name);
          console.log(last_name);
          connection.query("SELECT * FROM role", function (err, res) {
            console.log(res);
            const choices = res.map((role) => {
              return {
                name: role.title,
                value: role.department_id,
              };
            });
            inquire
              .prompt({
                type: "list",
                message: "What is the employee's role?",
                name: "role_id",
                choices,
              })
              .then((res) => {
                console.log(res);

                connection.query(
                  "SELECT * FROM employees",
                  function (err, res) {
                    if (err) console.log(err);
                    const choices = res.map((employee) => {
                      return {
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id,
                      };
                    });
                    console.log(res);
                  }
                  //   another inquire for manager_id
                );
              });
            inquire.prompt({
              type: "list",
              name: "manager_id",
              message: "Who is the employees manager?",
              choices,
            });
          });
        });
      //   connection.query(
      //     "INSERT INTO employees SET ?",
      //     employee,
      //     function (err, res) {
      //       if (err) console.log(err);
      //       console.table(res);
      //     }
      //   );
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
      connection.query(
        "SELECT role.title AS role_title, role.id AS role_id, role.salary AS salary, department.name AS department_name FROM role JOIN department ON role.department_id = department.id;",
        function (err, res) {
          if (err) console.log(err);
          console.table(res);
        }
      );
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
