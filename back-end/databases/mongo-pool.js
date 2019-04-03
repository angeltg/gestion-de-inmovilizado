'use strict'

// module.exports = {
//   db: process.env.MONGODB || 'mongodb://localhost:27017/inmovilizado'
// }

const mongoose = require('mongoose');

mongoose.Promise = Promise;

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/inmovilizado';

async function openConnection() {
  const conn = await mongoose.connect(mongoUri, { useNewUrlParser: true });

  return conn;
}

async function disconnect() {
  mongoose.connection.close();
}

module.exports = {
  connect: openConnection,
  disconnect,
};
