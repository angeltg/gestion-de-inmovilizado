'use strict'

const Employee = require('../../models/employees');

function getEmployee(req, res) {
  const employeeId = req.params.id;
  Employee.findById(employeeId, (err, employee) => {
    if (err) res.status(500).send({ messaje: `Error en el servidor ${err}` });
    if (!employee) res.status(404).send({ messaje: `El employee no existe` });
    res.status(200).send({ employee });
  })
}

function getEmployees(req, res) {
  Employee.find((err, employees) => {
    if (err) res.status(500).send(`Error en el servidor ${err}`);
    if (!employees) res.status(404).send(`No existen employees`);
    res.status(200).send({ employees });

  })
}

function saveEmployee(req, res) {
  console.log(req.body);
  let employee = new Employee();
  employee.fullName = req.body.fullName;
  employee.email = req.body.email;
  employee.password = req.body.password;
  employee.roll = req.body.roll;
  employee.phone = req.body.phone;
  employee.avatar = req.body.avatar;

  employee.save((err, employeeStored) => {
    if (err) res.status(500).send({ messaje: `Error en el servidor ${err}` });
    res.status(200).send({ employee: employeeStored });
  })
}

function updateEmployee(req, res) {
  let employeeId = req.params.id;
  let update = req.body;
  Employee.findByIdAndUpdate({ _id: employeeId }, update, (err, employee) => {
    if (err) res.status(500).send(`Error en el servidor ${err}`);
    if (!employee) res.status(404).send(`Employee no encontrado`);
    res.status(200).send({ employee });
  })
}

function deleteEmployee(id) {
  let employeeId = req.params.id;
  Employee.deleteOne({ _id: employeeId }, (err) => {
    if (err) res.status(500).send(`Error en el servidor ${err}`);
    res.status(200).send(`Este employee ha sido borrado`);
  })
}

module.exports = {
  getEmployee,
  getEmployees,
  saveEmployee,
  updateEmployee,
  deleteEmployee
}