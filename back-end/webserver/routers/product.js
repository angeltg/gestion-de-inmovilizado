'use strict'

const express = require('express');

const productCtrl = require('../../controllers/product');

const api = express.Router();

api.get('/product', productCtrl.getProducts);
api.get('/product/:id', productCtrl.getProduct);
api.post('/product', productCtrl.saveProduct);
api.put('/product/:id', productCtrl.updateProduct);
api.delete('/product/:id', productCtrl.deleteProduct);

module.exports = api;