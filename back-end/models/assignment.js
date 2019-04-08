'use stric'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssignmentSchema = Schema({

  idProduct: String,
  createdAt: { type: Date, default: Date.now },
  idEmployee: String,
  finalAt: Date,
  description: String

});

module.exports = mongoose.model('Assignment', AssignmentSchema);