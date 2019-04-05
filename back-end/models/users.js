'use stric'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({

  fullName: String,
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  company: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  confirmAt: { type: Date, default: null },
  verificationCode: String

});

module.exports = mongoose.model('User', UserSchema);