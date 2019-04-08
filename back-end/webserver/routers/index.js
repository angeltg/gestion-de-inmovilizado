'use strict'

const productRouter = require('./product');
const createUser = require('./account');
const employeeRouter = require('./employee');
const assignment = require('./assignment');

module.exports = {
  productRouter,
  createUser,
  employeeRouter,
  assignment
}