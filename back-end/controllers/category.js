'use strict'

const Category = require('../models/categories');

function getCategory(req, res) {
  const productId = req.params.id;
  Category.findById(productId, (err, product) => {
    if (err) res.status(500).send({ messaje: `Error en el servidor ${err}` });
    if (!product) res.status(404).send({ messaje: `El producto no existe` });
    res.status(200).send({ product });
  })
}

function getCategories(req, res) {
  Category.find((err, categories) => {
    if (err) res.status(500).send(`Error en el servidor ${err}`);
    if (!categories) res.status(404).send(`No existen categories`);
    res.status(200).send({ categories });

  })
}

function saveCategory(req, res) {
  console.log(req.body);
  let category = new Category();
  category.name = req.body.name;
  category.serialNumber = req.body.serialNumber;
  category.category = req.body.category;
  category.price = req.body.price;

  category.save((err, categoryStored) => {
    if (err) res.status(500).send({ messaje: `Error en el servidor ${err}` });
    res.status(200).send({ category: categoryStored });
  })
}

function updateCategory(req, res) {
  let categoryId = req.params.id;
  let update = req.body;
  Category.findByIdAndUpdate({ _id: categoryId }, update, (err, category) => {
    if (err) res.status(500).send(`Error en el servidor ${err}`);
    if (!category) res.status(404).send(`Category no encontrada`);
    res.status(200).send({ category });
  })
}

function deleteCategory(id) {
  let categoryId = req.params.id;
  Category.deleteOne({ _id: categoryId }, (err) => {
    if (err) res.status(500).send(`Error en el servidor ${err}`);
    res.status(200).send(`Esta category ha sido borrada`);
  })
}

module.exports = {
  getCategories,
  getCategories,
  saveCategory,
  updateCategory,
  deleteCategory
}