'use strict'

const User = require('../../models/users');

function getUser(req, res) {
  const userId = req.params.id;
  User.findById(userId, (err, user) => {
    if (err) res.status(500).send({ messaje: `Error en el servidor ${err}` });
    if (!user) res.status(404).send({ messaje: `El user no existe` });
    res.status(200).send({ user });
  })
}

function getUsers(req, res) {
  User.find((err, users) => {
    if (err) res.status(500).send(`Error en el servidor ${err}`);
    if (!users) res.status(404).send(`No existen users`);
    res.status(200).send({ users });

  })
}

function saveUser(req, res) {
  console.log(req.body);
  let user = new User();
  user.fullName = req.body.fullName;
  user.email = req.body.email;
  user.password = req.body.password;
  user.company = req.body.company;

  user.save((err, userStored) => {
    if (err) res.status(500).send({ messaje: `Error en el servidor ${err}` });
    res.status(200).send({ revision: userStored });
  })
}

function updateUser(req, res) {
  let userId = req.params.id;
  let update = req.body;
  User.findByIdAndUpdate({ _id: userId }, update, (err, user) => {
    if (err) res.status(500).send(`Error en el servidor ${err}`);
    if (!user) res.status(404).send(`User no encontrado`);
    res.status(200).send({ user });
  })
}

function deleteUser(id) {
  let userId = req.params.id;
  User.deleteOne({ _id: userId }, (err) => {
    if (err) res.status(500).send(`Error en el servidor ${err}`);
    res.status(200).send(`Este user ha sido borrado`);
  })
}

module.exports = {
  getUser,
  getUsers,
  saveUser,
  updateUser,
  deleteUser
}