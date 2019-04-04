'use stric'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RevisionSchema = Schema({
  uuidProduct: String,
  createdAt: Date,
  finalAt: Date,
  description: String,
  cost: Number,
  uuidEmployee: String
});

module.exports = mongoose.model('Revision', RevisionSchema);