'use stric'

const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const EmployeeSchema = Schema ({
  fullName: String,
  email: String,
  password: String,
  roll: { type:String, enum: ['Manager','Purchasing','Accountant','Technical']},
  phone: String,
  avatar: String
});

module.exports= mongoose.model('Employee', EmployeeSchema);