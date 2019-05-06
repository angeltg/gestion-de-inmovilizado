'use strict'



const Employee = require('../../models/employees');



function getEmployee(req, res, next) {
  const { claims } = req;
  const { company, roll } = claims;
  //Solo el manager tiene permisos para ver al employee
  if (roll != 'Manager') {
    res.status(401).send({ messaje: 'Acceso no autorizado' });
  }
  //Solo mostramos el empleado si pertenece a la compañía del user logeado 
  const employeeId = req.params.id;
  Employee.findById({ _id: employeeId, company }, (err, employee) => {
    if (err) res.status(500).send({ messaje: `Error en el servidor ${err}` });
    if (!employee) res.status(404).send({ messaje: `El employee no existe` });
    res.status(200).send({ employee });
  })
}

function getEmployees(req, res, next) {
  const { claims } = req;
  const { company, roll } = claims;
  //Solo el manager tiene permisos para listar a los employees
  if (roll != 'Manager') {
    res.status(401).send({ messaje: 'Acceso no autorizado' });
  }

  //Solo mostramos los empleados si pertenecen a la compañía del user logeado 
  Employee.find({ company }, (err, employees) => {
    if (err) res.status(500).send(`Error en el servidor ${err}`);
    if (!employees) res.status(404).send(`No existen employees`);
    res.status(200).send({ employees });

  })
}

//Array de empleados por roll
function countRollEmployees(employees) {
  //['Employee', 'Technical','Accountant', 'Purchasing', 'Manager']
  let arrRollEmployees = [0, 0, 0, 0, 0];

  employees.forEach(item => {
    switch (item.roll) {
      case 'Employee':
        arrRollEmployees[0]++;
        break;
      case 'Technical':
        arrRollEmployees[1]++;
        break;
      case 'Accountant':
        arrRollEmployees[2]++;
        break;
      case 'Purchasing':
        arrRollEmployees[3]++;
        break;
      case 'Manager':
        arrRollEmployees[4]++;
        break;

      default:
        break;
    }
  });

  return arrRollEmployees;
}

//Recuperamos el número de empleados por roll
function getRollEmployees(req, res, next) {
  const { claims } = req;
  const { company, roll } = claims;
  //Solo el manager tiene permisos para listar a los employees
  if (roll != 'Manager') {
    res.status(401).send({ messaje: 'Acceso no autorizado' });
  }

  //Solo mostramos los empleados si pertenecen a la compañía del user logeado 
  Employee.find({ company }, (err, employees) => {
    if (err) res.status(500).send(`Error en el servidor ${err}`);
    if (!employees) res.status(404).send(`No existen employees`);
    const arrRollEmployees = countRollEmployees(employees);
    res.status(200).send({ arrRollEmployees });

  })
}

function updateEmployee(req, res, next) {

  const { claims } = req;
  const { company, roll } = claims;


  //Solo el manager y el propio employee tiene permisos para modificar employee
  if (roll != 'Manager' && id != req.params.id) {
    res.status(401).send({ messaje: 'Acceso no autorizado' });
  }

  let employeeId = req.params.id;
  let update = req.body;
  Employee.findByIdAndUpdate({ _id: employeeId }, update, (err, employee) => {
    if (err) res.status(500).send(`Error en el servidor ${err}`);
    if (!employee) res.status(404).send(`Employee no encontrado`);
    res.status(200).send({ employee });
  })
}

function deleteEmployee(req, res, next) {


  const { claims } = req;
  const { company, roll } = claims;

  //Solo el manager tiene permisos para borrar employees
  if (roll != 'Manager') {
    res.status(401).send({ messaje: 'Acceso no autorizado' });
  }

  let employeeId = req.params.id;
  Employee.deleteOne({ _id: employeeId, company }, (err) => {

    if (err) res.status(500).send(`Error en el servidor ${err}`);
    res.status(200).send(`Este employee ha sido borrado`);
  })
}

module.exports = {
  getEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  getRollEmployees
}