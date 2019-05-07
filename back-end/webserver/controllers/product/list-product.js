'use strict'
const Product = require('../../../models/products');


function updateAmortization(restAmortization, productId) {

  Product.findByIdAndUpdate({ _id: productId }, { amortization: restAmortization }, (err, product) => {
    if (err) res.status(500).send(`Error en el servidor ${err}`);
    if (!product) res.status(404).send(`Producto no encontrado`);
    console.log(`Actualizado ${productId} ${restAmortization}`);
  })
}

async function calcAmortization(createdAt, amortizationAt, price, productId) {

  let milisecondsTotalDays = amortizationAt - createdAt;
  if (isFinite(milisecondsTotalDays)) {
    let today = new Date();
    let milisecondsRestDays = amortizationAt - today;
    let totalDays = Math.floor(milisecondsTotalDays / (1000 * 60 * 60 * 24));
    let restDays = Math.floor((milisecondsRestDays) / (1000 * 60 * 60 * 24));
    let restAmortization = ((restDays * price) / totalDays).toFixed(2);
    console.log(createdAt, amortizationAt, totalDays, restDays, price, productId, restAmortization);
    updateAmortization(restAmortization, productId);
  }
}
async function iterProducts(products) {
  for (let i in products) {
    await calcAmortization(products[i]['createdAt'], products[i]['amortizationAt'], products[i]['price'], products[i]['_id']);
  }
}
async function getProducts(req, res, next) {

  const { claims } = req;
  const { company, roll } = claims;

  //Si no tiene permisos no puede ver el producto
  if (roll === 'Employee') {
    res.status(401).send({ messaje: 'Acceso no autorizado' });
  }

  try {
    //Solo mostramos los productos de la compañía del user logeado
    Product.find({ company }, async (err, products) => {
      if (err) return res.status(500).send(`Error en el servidor ${err}`);
      if (!products) return res.status(404).send(`No existen productos`);
      // console.log(products);
      await iterProducts(products);
      return res.status(200).send({ products });
    })

  } catch (e) {
    return res.status(500).send({ messaje: `Error_ ${e}` });
  }

}

module.exports = { getProducts };