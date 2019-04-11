'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routers');

const app = express();
let server = null;

app.use(bodyParser.json());

/**
 * Enable CORS with a origin whitelist of valid domains
 * Step 1: Add CORS
 */
app.use((req, res, next) => {
  const accessControlAllowMethods = [
    'GET,PUT,POST,DELETE'
  ];

  const accessControlAllowHeaders = [
    'Content-Type'
  ];

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  // Access-Control-Allow-Methods: put accessControlAllowHeaders separated by comma
  res.header('Access-Control-Allow-Methods', accessControlAllowMethods.join(','));
  // put accessControlAllowHeaders separated by comma
  res.header('Access-Control-Allow-Headers', accessControlAllowHeaders.join(','));
  next();
});

/**
 * Add all routes
 */

app.use('/api', routes.productRouter);
app.use('/api', routes.createUser);
app.use('/api', routes.employeeRouter);
app.use('/api', routes.assignment);

app.get('');

app.use('*', (req, res, next) => {
  return res.status(404).send({
    message: 'Ruta no encontrada',
  });
});

/**
 * Special route middleware to catch all next(err) generated by controllers
 */
app.use((err, req, res, next) => {
  console.error('Error 500', err);
  return res.status(500).json({
    message: err.message,
  });
});

/**
 * Start listening requests at a given port
 * @param {Number} port
 */
async function listen(port) {
  if (server === null) {
    server = await app.listen(port);
  } else {
    console.error("Can't listen, server already initialized");
  }
}

/**
 * Stop listening requests
 */
async function close() {
  if (server) {
    await server.close();
    server = null;
  } else {
    console.error("Can't close a non started server");
  }
}

module.exports = {
  listen,
  close,
};
