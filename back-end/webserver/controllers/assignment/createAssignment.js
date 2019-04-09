'use strict'

const Assignment = require('../../../models/assignment');
const Product = require('../../../models/products');



async function updateProductoAssignment(idProduct, idEmployee) {

  try {
    await Product.findByIdAndUpdate({ _id: idProduct }, { idemployee: idEmployee });
  } catch (e) {
    return res.status(500).send(`Error en el servidor ${err}`);
  }
}

async function createAssignment(req, res, next) {

  const { claims } = req;

  const assignmentData = { ...req.body };
  let assignment = new Assignment();


  if (claims.roll != "Manager") {
    return res.status(401).send({ messaje: `No tienes permisos para hacer asignaciones` });
  }

  try {

    //Comprueba que el producto no esté asignado
    await Product.findOne({ _id: assignmentData.idProduct, idemployee: null }, (error, product) => {
      if (error) {
        return res.status(500).send({ messaje: `Error en el servidor ${error}` });
      }
      if (product === null) {
        return res.status(203).send({ messaje: `El producto ya está asignado` });
      }
    });

    assignment.idProduct = assignmentData.idProduct;
    assignment.idEmployee = assignmentData.idEmployee;
    assignment.description = assignmentData.description;
    try {
      const assignmentStored = await assignment.save();
      await updateProductoAssignment(assignmentData.idProduct, assignmentData.idEmployee);
      res.status(200).send({ assignment: assignmentStored });
    } catch (e) {
      res.status(500).send({ messaje: `Error en el servidor ${e}` });
    }
  } catch (e) {
    return res.status(500).send({ messaje: `Error en el servidor` });
  }

}

module.exports = createAssignment;