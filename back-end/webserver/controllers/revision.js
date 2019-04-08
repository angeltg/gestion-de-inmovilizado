'use strict'

const Revision = require('../../models/revisions');

function getRevision(req, res) {
  const revisionId = req.params.id;
  Revision.findById(revisionId, (err, revision) => {
    if (err) res.status(500).send({ messaje: `Error en el servidor ${err}` });
    if (!revision) res.status(404).send({ messaje: `La revision no existe` });
    res.status(200).send({ revision });
  })
}

function getRevisions(req, res) {
  Revision.find((err, revisions) => {
    if (err) res.status(500).send(`Error en el servidor ${err}`);
    if (!revisions) res.status(404).send(`No existen productos`);
    res.status(200).send({ revisions });

  })
}

function saveRevision(req, res) {
  console.log(req.body);
  let revision = new Revision();
  revision.idProduct = req.body.idProduct;
  revision.finalAd = req.body.finalAd;
  revision.description = req.body.description;
  revision.cost = req.body.cost;
  revision.uuidEmployee = req.body.uuidEmployee;

  revision.save((err, revisionStored) => {
    if (err) res.status(500).send({ messaje: `Error en el servidor ${err}` });
    res.status(200).send({ revision: revisionStored });
  })
}

function updateRevision(req, res) {
  let revisionId = req.params.id;
  let update = req.body;
  Revision.findByIdAndUpdate({ _id: revisionId }, update, (err, revision) => {
    if (err) res.status(500).send(`Error en el servidor ${err}`);
    if (!revision) res.status(404).send(`Producto no encontrado`);
    res.status(200).send({ revision });
  })
}

function deleteRevision(id) {
  let revisionId = req.params.id;
  Revision.deleteOne({ _id: revisionId }, (err) => {
    if (err) res.status(500).send(`Error en el servidor ${err}`);
    res.status(200).send(`Este producto ha sido borrado`);
  })
}

module.exports = {
  getRevision,
  getRevisions,
  saveRevision,
  updateRevision,
  deleteRevision
}