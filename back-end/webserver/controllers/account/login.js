'use strict'

const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config();

const UserModel = require('../../../models/users');

async function validateData(payload) {
  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  };

  return Joi.validate(payload, schema);
}

async function login(req, res, next) {

  const accountData = { ...req.body };

  try {
    await validateData(accountData);
  } catch (e) {
    return res.status(400).send(e);
  }

  try {
    const { email } = accountData;
    const query = {
      email,
      confirmAt: { $ne: null }
    }
    const userProfile = await UserModel.findOne(query);
    console.log(userProfile);
    if (!userProfile) {
      res.status(401).send('Datos incorrectos');
    }
    //Comprobamos la clave
    const laPasswordEstaOk = await bcrypt.compare(accountData.password, userProfile.password);
    if (laPasswordEstaOk === false) { // !laPasswordEstaOk
      return res.status(401).send();
    }

    //Creamos el jwtoken para enviar al cliente
    const payloadJwt = {
      uuid: userProfile._id,
      company: userProfile.company,
      roll: userProfile.roll,
    };

    const jwtTokenExpiration = parseInt(process.env.AUTH_ACCESS_TOKEN_TTL, 10);
    const token = jwt.sign(payloadJwt, process.env.AUTH_JWT_SECRET, { expiresIn: jwtTokenExpiration });
    const response = {
      accessToken: token,
      company: userProfile.company,
      expiresIn: jwtTokenExpiration,
    };
    res.status(200).json(response);

  } catch (e) {
    return res.status(400).send(`Datos incorrectos ${e}`);
  }

}

module.exports = {
  login
}