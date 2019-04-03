'use stric'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssignmentSchema = Schema({

  uuidProduct: String,
  createdAd: Date,
  uuidEmployee: String,
  finalAd: Date,
  description: String

});

module.exports = mongoose.model('Assignment', AssignmentSchema);