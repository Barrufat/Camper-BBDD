const express = require('express');

const { Producto, Imagen } = require('../models/index');
const router = express.Router();



//es category/:id ya que en index controller se definio api/category para este controller
router.get('/:archivo', (req, res, next) => {
    let archivoImagen = req.params.archivo;
    Imagen.findOne({ where: { archivo: archivoImagen }, include: [{model:Producto}] })
        .then(item => res.json({ ok: true, data: item }))
        .catch(err => res.json({ ok: false, error: err }));
  });



  //esto selecciona todas las Imagens (cocina, baños,..)
router.get('/', (req, res, next) => {

    Imagen.findAll({include: [Producto]})
        .then(items => res.json({ ok: true, data: items }))
        .catch(err => res.json({ ok: false, error: err }));
  });




  module.exports = router;