'use strict'

const Product = require('../../models/products');

function getProduct(req, res) {
  const productId = req.params.id;
  Product.findById(productId, (err, product) => {
    if (err) res.status(500).send({ messaje: `Error en el servidor ${err}` });
    if (!product) res.status(404).send({ messaje: `El producto no existe` });
    res.status(200).send({ product });
  })
}

function getProducts(req, res) {
  Product.find((err, products) => {
    if (err) res.status(500).send(`Error en el servidor ${err}`);
    if (!products) res.status(404).send(`No existen productos`);
    res.status(200).send({ products });

  })
}

function saveProduct(req, res) {
  console.log(req.body);
  let product = new Product();
  product.name = req.body.name;
  product.serialNumber = req.body.serialNumber;
  product.category = req.body.category;
  product.price = req.body.price;

  product.save((err, productStored) => {
    if (err) res.status(500).send({ messaje: `Error en el servidor ${err}` });
    res.status(200).send({ product: productStored });
  })
}

function updateProduct(req, res) {
  let productId = req.params.id;
  let update = req.body;
  Product.findByIdAndUpdate({ _id: productId }, update, (err, product) => {
    if (err) res.status(500).send(`Error en el servidor ${err}`);
    if (!product) res.status(404).send(`Producto no encontrado`);
    res.status(200).send({ product });
  })
}

function deleteProduct(id) {
  let productId = req.params.id;
  Product.deleteOne({ _id: productId }, (err) => {
    if (err) res.status(500).send(`Error en el servidor ${err}`);
    res.status(200).send(`Este producto ha sido borrado`);
  })
}

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct
}