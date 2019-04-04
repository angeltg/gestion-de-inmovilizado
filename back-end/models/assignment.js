'use stric'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssignmentSchema = Schema({

  uuidProduct: String,
  createdAt: { type: Date, default: Date.now },
  uuidEmployee: String,
  finalAt: Date,
  description: String

});

module.exports = mongoose.model('Assignment', AssignmentSchema);