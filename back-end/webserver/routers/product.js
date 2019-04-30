'use strict'

const express = require('express');

const productCtrl = require('../controllers/product');
const prodctListProduct = require('../controllers/product/list-product');
const checkJwtToken = require('../controllers/session/check-jwt-token');

const api = express.Router();

api.get('/product', checkJwtToken, prodctListProduct.getProducts);
api.get('/product/:id', checkJwtToken, productCtrl.getProduct);
api.post('/product', checkJwtToken, productCtrl.saveProduct);
api.put('/product/:id', checkJwtToken, productCtrl.updateProduct);
api.delete('/product/:id', checkJwtToken, productCtrl.deleteProduct);


module.exports = api;