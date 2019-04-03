'use stric'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RevisionSchema = Schema({
  uuidProduct: String,
  createdAd: Date,
  finalAd: Date,
  description: String,
  cost: Number,
  uuidEmployee: String
});

module.exports = mongoose.model('Revision', RevisionSchema);