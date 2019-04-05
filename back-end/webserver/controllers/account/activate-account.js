'use strict'

const User = require('../../../models/users');

async function activate(req, res, next) {

  const { verification_code: verificationCode } = req.query;

  if (!verificationCode) {
    return res.status(400).json({
      message: 'invalid verification code',
      target: 'verification_code',
    });
  }


  try {
    const query = { verificationCode: verificationCode };
    const today = new Date();
    const userActivate = await User.findOneAndUpdate(query, { confirmAt: today });
    res.status(200).send(`Cuenta activada ${userActivate}`);
  } catch (e) {
    res.status(500).send(`Error, en la base de datos. ${e}`);
  }

}

module.exports = {
  activate
}