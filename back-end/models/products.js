'use strict'

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = Schema({
  name: String,
  serialNumber: String,
  model: String,
  description: String,
  revision: [String], // uuid de la colletion revision. Para guardar un histórico de revision
  category: String,
  price: Number,
  amortization: { type: Number, default: 0 }, // La amortización pendiente se calcula en función de la fecha de amortización
  createdAt: { type: Date, default: Date.now },
  buyAt: { type: Date },
  amortizationAt: { type: Date },
  authoritation: String, // uuid de la collection authoritation para ver quién aprobó la compra
  efficiency: [Number], //Valoración de los employe que han tenido asignado el product
  company: String,
  idemployee: { type: String, default: null }
});

module.exports = mongoose.model('Product', ProductSchema);