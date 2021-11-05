async function getEmployees(connection) {
  let data = await connection
    .promise()
    .query("SELECT employees.first_name FROM employees");
  return data[0].map((obj) => obj.first_name);
}

module.exports = { getEmployees };
