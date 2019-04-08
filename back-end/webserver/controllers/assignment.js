'use strict'

const Assignment = require('../../models/assignment');

function getAssignment(req, res, next) {
  const assignmentId = req.params.id;
  Assignment.findById(assignmentId, (err, assignment) => {
    if (err) res.status(500).send({ messaje: `Error en el servidor ${err}` });
    if (!assignment) res.status(404).send({ messaje: `El employee no existe` });
    res.status(200).send({ assignment });
  })
}

function getAssignments(req, res, next) {
  Assignment.find((err, assignments) => {
    if (err) res.status(500).send(`Error en el servidor ${err}`);
    if (!assignments) res.status(404).send(`No existen employees`);
    res.status(200).send({ assignments });

  })
}



function updateAssignment(req, res, next) {
  let assignmentId = req.params.id;
  let update = req.body;
  Assignment.findByIdAndUpdate({ _id: assignmentId }, update, (err, assignment) => {
    if (err) res.status(500).send(`Error en el servidor ${err}`);
    if (!assignment) res.status(404).send(`Assignment no encontrado`);
    res.status(200).send({ assignment });
  })
}

function deleteAssignment(req, res, next) {
  let assignmentId = req.params.id;
  Assignment.deleteOne({ _id: assignmentId }, (err) => {
    if (err) res.status(500).send(`Error en el servidor ${err}`);
    res.status(200).send(`Este assignment ha sido borrado`);
  })
}

module.exports = {
  getAssignment,
  getAssignments,
  updateAssignment,
  deleteAssignment
}