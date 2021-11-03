function getEmployees(connection) {
  return connection.query(
    "SELECT employees.first_name FROM employees",
    function (err, res) {
      if (err) console.log(err);
      return res;
    }
  );
}
module.exports = { getEmployees };
