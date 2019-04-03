'use strict'

// const mongoose = require('mongoose');

const config = require('./config/http-server-config');
const configdb = require('./databases/mongo-pool');
const webServer = require('./webserver/index');
const mongoPool = require('./databases/mongo-pool');
console.log(configdb.db);
const port = config.port;



process.on('uncaughtException', (err) => {
  console.error('excepción inesperada', err.message, err);
});

process.on('unhandledRejection', (err) => {
  console.error('Error inesperado', err.message, err);
});

/**
 * Initialize dependencies
 * */
(async function initApp() {
  try {
    await mongoPool.connect();
    await webServer.listen(port);
    console.log(`server running at: ${port}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}());