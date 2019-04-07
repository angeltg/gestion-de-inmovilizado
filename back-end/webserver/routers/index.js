'use strict'

const productRouter = require('./product');
const createUser = require('./account');
const employeeRouter = require('./employee');


module.exports = {
  productRouter,
  createUser,
  employeeRouter
}