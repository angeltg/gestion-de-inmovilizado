'use stric'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = Schema({
  category: ['Laptop', 'PC', 'Mobil', 'Ipad', 'Car']

});

module.exports = mongoose.model('Category', CategorySchema);