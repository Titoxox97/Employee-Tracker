const { getEmployees } = require("./functions");
const table = require("console.table");
const { listenerCount } = require("events");
const inquirer = require("inquirer");
const inquire = require("inquirer");
const connection = require("./db/connection");

function mainMenu() {
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
            name: "Add Employee",
            value: "add_employee",
          },
          {
            name: "Update Employee Role",
            value: "update_employee_role",
          },
          {
            name: "Update Employee Manager",
            value: "update_employee_manager",
          },
          {
            name: "View All Roles",
            value: "view_roles",
          },
          {
            name: "Add Role",
            value: "add_role",
          },
          {
            name: "View All Departments",
            value: "view_departments",
          },
          {
            name: "Add Department",
            value: "add_department",
          },
          //   {
          //     name: "Remove Department",
          //     value: "remove_department",
          //   },
          //   {
          //     name: "Remove Role",
          //     value: "remove_role",
          //   },
          //   {
          //     name: "Remove Employee",
          //     value: "remove_employee",
          //   },
          //   {
          //     name: "View Total Utilized Budget By Department",
          //     value: "view_budget_by_department",
          //   },
          //   {
          //     name: "View All Employees By Department",
          //     value: "viewEmployees_by_department",
          //   },
          //   {
          //     name: "View All Employees By Manager",
          //     value: "viewEmployees_by_manager",
          //   },
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

      //   add new employees
      if (answer === "add_employee") {
        async function test() {
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
              {
                name: "role_id",
                message: "What is the employee's role?",
              },
              {
                type: "list",
                choices: await getEmployees(connection),
                name: "manager_id",
                message: "Who is the employee's manager?",
              },
            ])

            .then((res) => {
              connection.query(
                "SELECT role.id FROM role WHERE title = ?",
                res.role_id,
                (err, data) => {
                  if (err) console.log(err);

                  connection.query(
                    "SELECT employees.id FROM employees WHERE first_name = ?",
                    res.manager_id,
                    function (err, managerData) {
                      if (err) console.log(err);
                      managerData;
                      connection.query(
                        "INSERT INTO employees SET ?",
                        {
                          first_name: `${res.first_name}`,
                          last_name: `${res.last_name}`,
                          role_id: `${data[0].id}`,
                          manager_id: `${managerData[0].id}`,
                        },
                        (err, res) => {
                          if (err) console.log(err);
                          console.log("success");
                          mainMenu();
                        }
                      );
                    }
                  );
                }
              );
            });
        }
        test();
      }

      // Update role
      if (answer === "update_employee_role") {
        inquire
          .prompt([
            {
              type: "input",
              name: "employee",
              message: "Enter the employee's ID",
            },
            {
              type: "input",
              name: "role",
              message: "Enter the ID of the role",
            },
          ])
          .then((res) => {
            connection.query(
              `UPDATE employees SET role_id = ${res.role} WHERE id = ${res.employee}`,
              (err, res) => {
                if (err) console.log(err);
                console.table(res);
              }
            );
          });
      }

      //   update the manager of the employee
      if (answer === "update_employee_manager") {
        inquire
          .prompt([
            {
              type: "input",
              name: "employee",
              message: "Which employee needs their manager changed?",
            },
            {
              type: "input",
              name: "employee manager",
              message: "Who is the manager of the employee?",
            },
            {
              type: "input",
              name: "manager id",
              message: "What is the manager's id?",
            },
          ])
          .then((res) => {
            connection.query(
              `UPDATE employees SET manager_id = ${res.manager} WHERE id = ${res.employee}`,
              (err, res) => {
                if (err) console.log(err);
                console.table(res);
              }
            );
          });
      }

      //   View all roles
      if (answer === "view_roles") {
        console.log("hi");
        connection.query(
          "SELECT role.title AS role_title, role.id AS role_id, role.salary AS salary, department.name AS department_name FROM role JOIN department ON role.department_id = department.id;",
          function (err, res) {
            if (err) console.log(err);
            console.table(res);
          }
        );
      }

      //   add new roles for employees
      if (answer === "add_role") {
        connection.query("SELECT * FROM role", function (err, res) {
          if (err) console.log(err);
          console.table(res);
          var choices = res.map((choice) => {
            return {
              name: choice.title,
              value: choice.department_id,
            };
          });
          inquire
            .prompt([
              {
                type: "input",
                name: "title",
                message: "Enter title of role:",
              },
              {
                type: "input",
                name: "salary",
                message: "Enter salary of role",
              },
              {
                type: "list",
                name: "department_id",
                message: "Choose the department you'd like to view",
                choices,
              },
            ])
            .then((res) => {
              connection.query(
                "INSERT INTO role SET ?",
                {
                  title: `${res.title}`,
                  salary: `${res.salary}`,
                  department_id: `${res.department_id}`,
                },
                (err, res) => {
                  if (err) console.log(err);
                  console.log("success");
                  mainMenu();
                }
              );
            });
        });
      }

      //   View all departments
      if (answer === "view_departments") {
        connection.query("SELECT * FROM department", function (err, res) {
          if (err) console.log(err);
          console.table(res);
        });
      }

      // add a department
      if (answer === "add_department") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "department",
              message: "What is the name of the department?",
            },
          ])
          .then((answer) => {
            console.log(`Adding ${answer.department} to the database`);
            connection.query(
              "INSERT INTO department SET ?",
              {
                name: `${answer.department}`,
              },
              (err, res) => {
                if (err) console.log(err);
                console.table(res);
              }
            );
          });
      }

      //   // remove unwanted departments
      //   if (answer === "remove_department") {
      //     connection.query("SELECT * FROM department", function (err, res) {
      //       if (err) console.log(err);
      //       console.table(res);
      //     });
      //   }

      //   //   remove employee roles
      //   if (answer === "remove_role") {
      //     connection.query("SELECT * FROM role", function (err, res) {
      //       if (err) console.log(err);
      //       console.table(res);
      //     });
      //   }

      //   //   remove any employees who left or were terminated
      //   if (answer === "remove_employee") {
      //     connection.query("SELECT * FROM employees", function (err, res) {
      //       if (err) console.log(err);
      //       console.table(res);
      //     });
      //   }

      //   //   View employees based on who their manager is
      //   if (answer === "viewEmployees_by_manager") {
      //     connection.query("SELECT * FROM employees", function (err, res) {
      //       if (err) console.log(err);
      //       console.table(res);
      //     });
      //   }

      //   //   view employees by what department they're in
      //   if (answer === "viewEmployees_by_department") {
      //     connection.query("SELECT * FROM employees", function (err, res) {
      //       if (err) console.log(err);
      //       console.table(res);
      //     });
      //   }

      //   //   View budget, by specific department
      //   if (answer === "view_budget_by_department") {
      //     connection.query("SELECT * FROM department", function (err, res) {
      //       if (err) console.log(err);
      //       console.table(res);
      //     });
      //   }
    });
}
mainMenu();
