'use stric'

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EmployeeSchema = Schema({
  firstName: String,
  secondName: String,
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  roll: { type: String, enum: ['Manager', 'Purchasing', 'Accountant', 'Technical', 'Employee'], default: 'Employee' },
  phone: String,
  avatar: String,
  createdAt: { type: Date, default: Date.now },
  company: String
});

module.exports = mongoose.model('Employee', EmployeeSchema);