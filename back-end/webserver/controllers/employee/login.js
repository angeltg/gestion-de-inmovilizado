'use strict'

const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config();

const EmployeeModel = require('../../../models/employees');

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
      email
    }
    const employeeProfile = await EmployeeModel.findOne(query);
    console.log(employeeProfile);
    if (!employeeProfile) {
      res.status(401).send('Datos incorrectos');
    }
    //Comprobamos la clave
    const laPasswordEstaOk = await bcrypt.compare(accountData.password, employeeProfile.password);
    if (laPasswordEstaOk === false) { // !laPasswordEstaOk
      return res.status(401).send();
    }

    //Creamos el jwtoken para enviar al cliente
    const payloadJwt = {
      uuid: employeeProfile._id,
      company: employeeProfile.company,
      roll: employeeProfile.roll,
    };

    const jwtTokenExpiration = parseInt(process.env.AUTH_ACCESS_TOKEN_TTL, 10);
    const token = jwt.sign(payloadJwt, process.env.AUTH_JWT_SECRET, { expiresIn: jwtTokenExpiration });
    const response = {
      accessToken: token,
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