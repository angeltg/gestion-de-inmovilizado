'use strict'

const express = require('express');

const employeeCtrl = require('../controllers/employee');
const employeeSave = require('../controllers/employee/create-employee');
const employeeLogin = require('../controllers/employee/login');
const checkJwtToken = require('../controllers/session/check-jwt-token');

const api = express.Router();

api.get('/employee', checkJwtToken, employeeCtrl.getEmployees);
api.get('/employee/:id', checkJwtToken, employeeCtrl.getEmployee);
api.post('/employee', checkJwtToken, employeeSave.saveEmployee);
api.put('/employee/:id', checkJwtToken, employeeCtrl.updateEmployee);
api.delete('/employee/:id', checkJwtToken, employeeCtrl.deleteEmployee);
api.post('/employee/login', employeeLogin.login);

module.exports = api;