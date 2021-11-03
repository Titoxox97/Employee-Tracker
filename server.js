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
            name: "View All Employees By Department",
            value: "viewEmployees_by_department",
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
            value: "view_departments",
          },
          {
            name: "Add Department",
            value: "add_department",
          },
          {
            name: "Remove Department",
            value: "remove_department",
          },
          {
            name: "View Total Utilized Budget By Department",
            value: "view_budget_by_department",
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

    //   view employees by what department they're in
      if (answer === "viewEmployees_by_department") {
        connection.query("SELECT * FROM employees", function (err, res) {
          if (err) console.log(err);
          console.table(res);
        });
      }

    //   View employees based on who their manager is
      if (answer === "viewEmployees_by_manager") {
        connection.query("SELECT * FROM employees", function (err, res) {
          if (err) console.log(err);
          console.table(res);
        });
      }

    //   add new employees
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
            {
              name: "role_id",
              message: "What is the employee's role?",
            },
            {
              name: "manager_id",
              message: "Who is the employee's manager?",
            },
          ])
          .then((res) => {
            console.log(`Adding ${res.first_name} to the database`);
            connection.query(
              "INSERT INTO employees SET ?",
              {
                first_name: `${res.first_name}`,
                last_name: `${res.last_name}`,
                role_id: `${res.role_id}`,
                manager_id: `${res.manager_id}`,
              },
              (err, res) => {
                if (err) console.log(err);
                console.table(res);
                mainMenu();
              }
            );
          });
        // .then((res) => {
        //   const first_name = res.first_name;
        //   const last_name = res.last_name;
        //   console.log(first_name);
        //   console.log(last_name);
        //   connection.query("SELECT * FROM role", function (err, res) {
        //     console.log(res);
        //     const choices = res.map((role) => {
        //       return {
        //         name: role.title,
        //         value: role.department_id,
        //       };
        //     });
        //     inquire
        //       .prompt({
        //         type: "list",
        //         message: "What is the employee's role?",
        //         name: "role_id",
        //         choices,
        //       })
        //       .then((res) => {
        //         console.log(res);

        //         connection.query(
        //           "SELECT * FROM employees",
        //           function (err, res) {
        //             if (err) console.log(err);
        //             const choices = res.map((employee) => {
        //               return {
        //                 name: `${employee.first_name} ${employee.last_name}`,
        //                 value: employee.id,
        //               };
        //             });
        //             console.log(res);
        //           }
        //           //   another inquire for manager_id
        //         );
        //       });
        //     inquire.prompt({
        //       type: "list",
        //       name: "manager_id",
        //       message: "Who is the employees manager?",
        //     });
      }
    });
  //   connection.query(
  //     "INSERT INTO employees SET ?",
  //     employee,
  //     function (err, res) {
  //       if (err) console.log(err);
  //       console.table(res);
  //     }
  //   );

//   remove any employees who left or were terminated
  if (answer === "remove_employee") {
    connection.query("SELECT * FROM employees", function (err, res) {
      if (err) console.log(err);
      console.table(res);
    });
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
          "UPDATE employees SET role_id = ? WHERE id = ?",
          [`${res.role}, ${res.employee}`],
          (err, res) => {
            if (err) console.log(err);
            console.table(res);
          }
        );
      });
  }


//   update the manager of the employee
  if (answer === "update_employee_manager") {
      inquirer
      .prompt([
          {
              type: "input",
              name: "employee manager",
              message: "Who is the manager of the employee?"
          }
          {
              type: "input",
              name: "manager id",
              message: "What is the manager's id?"
          },
      ])
      .then((res) => {
          connection.query(
              "UPDATE employees SER manager_id = ? WHERE id = ?",
              (err, res) => {
                  if (err) console.log(err);
                  console.table(res);
              }
          )
      })
  }

//   View all roles
  if (answer === "view_roles") {
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
    });
  }

//   remove employee roles
  if (answer === "remove_role") {
    connection.query("SELECT * FROM role", function (err, res) {
      if (err) console.log(err);
      console.table(res);
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

    // remove unwanted departments
  if (answer === "remove_department") {
    connection.query("SELECT * FROM department", function (err, res) {
      if (err) console.log(err);
      console.table(res);
    });
  }

//   View budget, by specific department
  if (answer === "view_budget_by_department") {
    connection.query("SELECT * FROM department", function (err, res) {
      if (err) console.log(err);
      console.table(res);
    });
  }
}
