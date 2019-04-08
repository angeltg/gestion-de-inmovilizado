'use strict'

const express = require('express');

const assigmentCtrl = require('../controllers/assignment');
const createAssignment = require('../controllers/assignment/createAssignment');
const checkJwtToken = require('../controllers/session/check-jwt-token');

const api = express.Router();

api.get('/assignment', checkJwtToken, assigmentCtrl.getAssignments);
api.get('/assignment/:id', checkJwtToken, assigmentCtrl.getAssignment);
api.post('/assignment/create', checkJwtToken, createAssignment);
api.put('/assignment/:id', checkJwtToken, assigmentCtrl.updateAssignment);
api.delete('/assignment/:id', checkJwtToken, assigmentCtrl.deleteAssignment);

module.exports = api;