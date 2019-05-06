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

//Array de empleados por roll
function countCategoryProducts(products) {
  //['Car', 'PC','Phone', 'Laptop', 'Visa', 'Other'];
  let arrCategoryProducts = [0, 0, 0, 0, 0];

  products.forEach(item => {
    switch (item.category) {
      case 'Car':
        arrCategoryProducts[0]++;
        break;
      case 'PC':
        arrCategoryProducts[1]++;
        break;
      case 'Phone':
        arrCategoryProducts[2]++;
        break;
      case 'Laptop':
        arrCategoryProducts[3]++;
        break;
      case 'Visa':
        arrCategoryProducts[4]++;
        break;
      case 'Other':
        arrCategoryProducts[5]++;
        break;

      default:
        break;
    }
  });

  return arrCategoryProducts;
}

//Recuperamos el número de productos por categoría
function getCategoryProduct(req, res, next) {
  const { claims } = req;
  const { company, roll } = claims;
  //Solo el manager tiene permisos para listar a los products
  if (roll != 'Manager') {
    res.status(401).send({ messaje: 'Acceso no autorizado' });
  }

  //Solo mostramos los products si pertenecen a la compañía del user logeado 
  Product.find({ company }, (err, products) => {
    if (err) res.status(500).send(`Error en el servidor ${err}`);
    if (!products) res.status(404).send(`No existen bienes`);
    const arrCategoryProducts = countCategoryProducts(products);
    res.status(200).send({ arrCategoryProducts });
  })
}

function saveProduct(req, res, next) {

  const { claims } = req;
  const { company, roll } = claims;


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
  product.description = req.body.description;
  product.amortizationAt = req.body.amortizationAt;


  product.save((err, productStored) => {
    if (err) res.status(500).send({ messaje: `Error en el servidor ${err}` });
    res.status(200).send({ product: productStored });
  })
}

function updateProduct(req, res, next) {

  const { claims } = req;
  const { company, roll } = claims;

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

  //Si no tiene permisos no puede borrar el producto
  if (roll != 'Manager') {
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
  saveProduct,
  updateProduct,
  deleteProduct,
  getCategoryProduct
}