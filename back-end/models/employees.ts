'use stric'

const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const EmployeeSchema = Schema ({
  fullName: String,
  email: {type: String, unique:true, lowercase: true },
  password: {type: String, select: false},
  roll: { type:String, enum: ['Manager','Purchasing','Accountant','Technical']},
  phone: String,
  avatar: String,
  createdAt: { type: Date, default: Date.now}
});

module.exports= mongoose.model('Employee', EmployeeSchema);