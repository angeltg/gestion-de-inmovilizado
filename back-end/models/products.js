'use strict'

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = Schema({
  name: String,
  serialNumber: String,
  model: String,
  description: String,
  revision: [String], // uuid de la colletion revision. Para guardar un histórico de revision
  category: [String], // Las categorías están en la colletion category
  price: Number,
  amortization: Number, // La amortización pendiente se calcula en función de la fecha de amortización
  assignment: [], // Array con el uuid de las asignaciones del producto
  createdAt: { type: Date, default: Date.now },
  buyAt: { type: Date },
  amortizationAd: { type: Date },
  authoritation: String, // uuid de la collection authoritation para ver quién aprobó la compra
  efficiency: [Number], //Valoración de los employe que han tenido asignado el product
  company: String
});

module.exports = mongoose.model('Product', ProductSchema);