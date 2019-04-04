'use strict'


const bcrypt = require('bcrypt');
const Joi = require('joi');
const uuidV4 = require('uuid/v4');
const User = require('../../../models/users');


async function validateSchema(payload) {
  const sendgridMail = require('@sendgrid/mail');

  /**
   * TODO: Fill email, password and full name rules to be (all fields are mandatory):
   *  email: Valid email
   *  password: Letters (upper and lower case) and number
   *    Minimun 3 and max 30 characters, using next regular expression: /^[a-zA-Z0-9]{3,30}$/
   * fullName: String with 3 minimun characters and max 128
   */
  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    fullName: Joi.string(),
    company: Joi.string()
  };

  return Joi.validate(payload, schema);
}

async function sedActivationEmail(userData) {
  // using SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: userData.email,
    from: {
      email: 'gdi@yopmail.com',
      name: 'Gestion de inmovilizado'
    },
    subject: 'Es hora de activar tu cuenta',
    text: 'Ya estás registrado en nuestra web, ahora solo te queda:',
    html: `<a href="${process.env.HTTP_SERVER_DOMAIN}/api/account/activate?verification_code=${userData.verificationCode}">Activar cuenta</a>`
  };
  sgMail.send(msg);
}

async function createUser(req, res, next) {
  const accountData = { ...req.body };

  /**
   * Validate if user data is valid to create an account
   * in other case, generate a 400 Bad Reqeust error
   */
  try {
    await validateSchema(accountData);
  } catch (e) {
    // Create validation error
    return res.status(400).send(e);
  }
  const data = {
    fullName: accountData.fullName,
    email: accountData.email,
    password: await bcrypt.hash(accountData.password, 10),
    company: accountData.company,
    verificationCode: uuidV4()

  }
  try {
    const userInsert = await User.create(data);

    sedActivationEmail(userInsert);
    res.status(200).send({ user: userInsert });
  } catch (e) {
    res.status(500).send({ messaje: `Error en el servidor ${e}` });

  }


  //console.log(req.body);

}

module.exports = {
  createUser
}
