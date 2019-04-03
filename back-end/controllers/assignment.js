'use strict'

const Assignment = require('../models/assignment');

function getAssignment(req, res) {
  const assignmentId = req.params.id;
  Assignment.findById(assignmentId, (err, assignment) => {
    if (err) res.status(500).send({ messaje: `Error en el servidor ${err}` });
    if (!assignment) res.status(404).send({ messaje: `El employee no existe` });
    res.status(200).send({ assignment });
  })
}

function getAssignments(req, res) {
  Assignment.find((err, assignments) => {
    if (err) res.status(500).send(`Error en el servidor ${err}`);
    if (!assignments) res.status(404).send(`No existen employees`);
    res.status(200).send({ assignments });

  })
}

function saveAssignment(req, res) {
  console.log(req.body);
  let assignment = new Assignment();
  assignment.uuidProduct = req.body.uuidProduct;
  assignment.uuidEmployee = req.body.uuidEmployee;
  assignment.finalAd = req.body.finalAd;
  assignment.description = req.body.description;


  assignment.save((err, assignmentStored) => {
    if (err) res.status(500).send({ messaje: `Error en el servidor ${err}` });
    res.status(200).send({ assignment: assignmentStored });
  })
}

function updateAssignment(req, res) {
  let assignmentId = req.params.id;
  let update = req.body;
  Assignment.findByIdAndUpdate({ _id: assignmentId }, update, (err, assignment) => {
    if (err) res.status(500).send(`Error en el servidor ${err}`);
    if (!assignment) res.status(404).send(`Assignment no encontrado`);
    res.status(200).send({ assignment });
  })
}

function deleteAssignment(id) {
  let assignmentId = req.params.id;
  Assignment.deleteOne({ _id: assignmentId }, (err) => {
    if (err) res.status(500).send(`Error en el servidor ${err}`);
    res.status(200).send(`Este assignment ha sido borrado`);
  })
}

module.exports = {
  getAssignment,
  getAssignment,
  saveAssignment,
  updateAssignment,
  deleteAssignment
}