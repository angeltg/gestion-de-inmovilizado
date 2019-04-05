'use strict'


const express = require('express');

const createUser = require('../controllers/account/create-account');
const activateUser = require('../controllers/account/activate-account');
const login = require('../controllers/account/login');
const getUser = require('../controllers/user');
const api = express.Router();


api.post('/account/create', createUser.createUser);
api.get('/account/activate', activateUser.activate);
api.get('/users', getUser.getUsers);
api.delete('/users/delete', getUser.deleteUsers);
api.post('/account/login', login.login);

module.exports = api;
