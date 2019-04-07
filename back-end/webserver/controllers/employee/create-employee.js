'use scrict'

const bcrypt = require('bcrypt');
const Joi = require('joi');
const dotenv = require('dotenv');

const Employee = require('../../../models/employees');

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
    firstName: Joi.string(),
    secondName: Joi.string(),
    phone: Joi.string(),
    roll: Joi.string()
  };

  return Joi.validate(payload, schema);
}

async function sedActivationEmail(employeeData) {
  // using SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(mailKey);
  const msg = {
    to: employeeData.email,
    from: {
      email: 'gdi@yopmail.com',
      name: 'Gestion de inmovilizado'
    },
    subject: 'Se ha creado tu cuenta de empleado',
    text: `Ya estás en GDI, el manager te hará llegar la contraseña. Accede desde:${rute}/api/employee/login`,
    html: `Ya formas parte de nuestra empresa! <br/> 
    Accede a tu cuenta de GDI desde: <a href="${rute}/api/employee/login">Tu cuenta en GDI</a> <br/>
    El Manager te indicará tu clave de acceso.`
  };
  sgMail.send(msg);
}


async function saveEmployee(req, res, next) {

  const { claims } = req;
  const { company, roll } = claims;

  const employeeData = { ...req.body };

  //Solo el manager tiene permisos para crear employees
  if (roll != 'Manager') {
    res.status(401).send({ messaje: 'Acceso no autorizado' });
  }


  /**
   * Validate if user data is valid to create an account
   * in other case, generate a 400 Bad Reqeust error
   */
  try {

    await validateSchema(employeeData);
  } catch (e) {
    // Create validation error
    return res.status(400).send(e);
  }


  let employee = new Employee();
  employee.firstName = employeeData.firstName;
  employee.secondName = employeeData.secondName;
  employee.email = employeeData.email;
  employee.password = await bcrypt.hash(employeeData.password, 10);
  employee.roll = employeeData.roll;
  employee.phone = employeeData.phone;
  employee.avatar = employeeData.avatar;
  employee.company = company;

  try {
    const employeeStored = await employee.save();
    sedActivationEmail(employeeData);
    res.status(200).send({ employee: employeeStored });
  } catch (e) {
    res.status(500).send({ messaje: `Error_ ${e}` });
  }

}


module.exports = { saveEmployee }