'use strict'


const express = require('express');

const createUser = require('../controllers/account/create-account');

const api = express.Router();


api.post('/account/create', createUser.createUser);

module.exports = api;
