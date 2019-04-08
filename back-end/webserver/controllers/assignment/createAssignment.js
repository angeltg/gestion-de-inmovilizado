'use strict'

const Assignment = require('../../../models/assignment');
const Product = require('../../../models/products');

//Comprueba que el producto no esté asignado
function productAssignmented(idProduct) {

  const product = Product.find({ _id: idProduct, assignment: false });
  if (!product) {
    return true;
  }
  return false;
}

async function updateProductoAssignment(idProduct) {


  try {
    await Product.findByIdAndUpdate({ _id: idProduct }, { assignment: true });
  } catch (e) {
    res.status(500).send(`Error en el servidor ${err}`);
  }
}

async function createAssignment(req, res, next) {

  const { claims } = req;

  const assignmentData = { ...req.body };
  let assignment = new Assignment();


  if (claims.roll === "Manager") {

    const productAssignFalse = productAssignmented(assignmentData.idProduct);
    if (!productAssignFalse) {
      return res.status(202).send({ messaje: `El producto ya está asignado` });
    }
    assignment.idProduct = assignmentData.idProduct;
    assignment.idEmployee = assignmentData.idEmployee;
    assignment.description = assignmentData.description;
    try {
      const assignmentStored = await assignment.save();
      await updateProductoAssignment(assignmentData.idProduct);
      res.status(200).send({ assignment: assignmentStored });
    } catch (e) {
      res.status(500).send({ messaje: `Error en el servidor ${e}` });
    }
  }
  res.status(401).send({ messaje: `No tienes permisos para hacer asignaciones` });
}

module.exports = createAssignment;