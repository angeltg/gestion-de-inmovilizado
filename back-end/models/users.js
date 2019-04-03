'use stric'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({

  fullName: String,
  email: String,
  password: String,
  company: String,
  createdAd: { type: Date, default: Date.now },
  confirmAd: Date

});

module.exports = mongoose.model('User', UserSchema);