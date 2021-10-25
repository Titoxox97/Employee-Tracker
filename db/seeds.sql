USE employee_manager;
INSERT INTO department (name) VALUES ('research/development');
INSERT INTO role (title, salary, department_id) VALUES ('engineer', 80000.00, 1);
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUES ('Matias', 'Ahrensdorf', 13, 1);