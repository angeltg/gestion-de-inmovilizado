'use strict'


const bcrypt = require('bcrypt');
const Joi = require('joi');
const uuidV4 = require('uuid/v4');
const dotenv = require('dotenv');

const User = require('../../../models/users');

dotenv.config();
const rute = process.env.HTTP_SERVER_DOMAIN;
const mailKey = process.env.SENDGRID_API_KEY;

async function validateSchema(payload) {

  /**
   *  email: Valid email
   *  password: Letters (upper and lower case) and number
   *    Minimun 3 and max 30 characters, using next regular expression: /^[a-zA-Z0-9]{3,30}$/
   */
  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    fullName: Joi.string(),
    company: Joi.string()
  };

  return Joi.validate(payload, schema);
}

function htmlEmailDesign(userData) {
  let emailHtml = `
   <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//ES" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
   <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>GdI</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body style="margin: 0; padding: 0;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
        <td align="center" color="#004085" bgcolor="#b8daff" style="padding: 40px 0 30px 0; color: #004085">
          <h1>GdI</h1>  
          <h3>Gestión de Inmovilizado</h3>
        </td>
        </tr>
        <tr>
        <td align="center" style="padding: 40px 0 30px 0;">
          <h2>¡Bienvenido!</h2>  
          <p>Ya estás registrado en GdI, ahora solo te queda: <a href="${rute}/api/account/activate?verification_code=${userData.verificationCode}">Activar cuenta</a></p>
          <p>Y podrás gestionar los bienes de tu empresa de la manera más rápida y eficaz.</p>
        </td>
        </tr>
        <tr>
        <td align="center" style="padding: 40px 0 30px 0;">
          <p>GdI by Ángel Téllez</p>  
        </td>
        </tr>
      </table>
    </body>
   </html>
   `;
  return emailHtml;
}

async function sedActivationEmail(userData) {
  // using SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs
  //console.log(`${rute}/api/account/activate?verification_code=${userData.verificationCode}`);
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(mailKey);
  const msg = {
    to: userData.email,
    from: {
      email: 'gdi@yopmail.com',
      name: 'Gestion de inmovilizado'
    },
    subject: 'Es hora de activar tu cuenta',
    text: `Ya estás registrado en nuestra web, ahora solo te queda:${rute}/api/account/activate?verification_code=${userData.verificationCode}`,
    html: htmlEmailDesign(userData)
    //   html: `Ya estás registrado en nuestra web, ahora solo te queda: <a href="${rute}/api/account/activate?verification_code=${userData.verificationCode}">Activar cuenta</a>`
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
    res.status(400).send([e]);
  }


  //console.log(req.body);

}

module.exports = {
  createUser
}
