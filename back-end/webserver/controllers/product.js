'use strict'

const Product = require('../../models/products');


function getProduct(req, res, next) {
  //Lo necesitamos libre de permisos para soliditar los productos de un employee
  const productId = req.params.id;
  Product.findById(productId, (err, product) => {
    if (err) res.status(500).send({ messaje: `Error en el servidor ${err}` });
    if (!product) res.status(404).send({ messaje: `El producto no existe` });
    res.status(200).send({ product });
  })
}

function getProducts(req, res, next) {

  const { claims } = req;
  const { company, roll } = claims;
  console.log(`Company ${company}`);
  //Si no tiene permisos no puede ver el producto
  if (roll === 'Employee') {
    res.status(401).send({ messaje: 'Acceso no autorizado' });
  }
  //Solo mostramos los productos de la compañía del user logeado
  Product.find({ company }, (err, products) => {
    if (err) res.status(500).send(`Error en el servidor ${err}`);
    if (!products) res.status(404).send(`No existen productos`);
    res.status(200).send({ products });

  })
}

function saveProduct(req, res, next) {

  const { claims } = req;
  const { company, roll } = claims;

  console.log(req, roll, company);

  //Si no tiene permisos no pueden crear productos
  if ((roll === 'Employee') || (roll === 'Accountant')) {
    res.status(401).send({ messaje: 'Acceso no autorizado' });
  }
  if (!isFinite(req.body.price)) {
    res.status(400).send({ messaje: 'El precio debe ser un número' });
  }

  let product = new Product();
  product.name = req.body.name;
  product.serialNumber = req.body.serialNumber;
  product.category = req.body.category;
  product.price = req.body.price;
  product.company = company;

  product.save((err, productStored) => {
    if (err) res.status(500).send({ messaje: `Error en el servidor ${err}` });
    res.status(200).send({ product: productStored });
  })
}

function updateProduct(req, res, next) {

  const { claims } = req;
  const { company, roll } = claims;
  console.log(`Company ${company}`);

  //Si no tiene permisos no puede modificar el producto
  if (roll === 'Employee') {
    res.status(401).send({ messaje: 'Acceso no autorizado' });
  }

  let productId = req.params.id;
  let update = req.body;
  //Nos aseguramos de que el producto que quier modificar está en su compañía y no en otra
  Product.findByIdAndUpdate({ _id: productId, company }, update, (err, product) => {
    if (err) res.status(500).send(`Error en el servidor ${err}`);
    if (!product) res.status(404).send(`Producto no encontrado`);
    res.status(200).send({ product });
  })
}

function deleteProduct(req, res, next) {
  const { claims } = req;
  const { company, roll } = claims;

  //Si no tiene permisos no puede modificar el producto
  if (roll === 'Employee') {
    res.status(401).send({ messaje: 'Acceso no autorizado' });
  }

  let productId = req.params.id;
  // Nos aseguramos de que el producto que borra esté en su compañía y no en otra
  Product.deleteOne({ _id: productId, company }, (err) => {
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