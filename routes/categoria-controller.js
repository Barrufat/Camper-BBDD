const express = require('express');

const { Categoria, Producto, Imagen } = require('../models/index');
const router = express.Router();



//es category/:id ya que en index controller se definio api/category para este controller
router.get('/:id', (req, res, next) => {
    let idCategoria = req.params.id;
    Categoria.findOne({ where: { id_categoria: idCategoria }, include: [{model:Producto, include:[Imagen]}] })
        .then(item => res.json({ ok: true, data: item }))
        .catch(err => res.json({ ok: false, error: err }));
  });


  //esto selecciona todas las categorias (cocina, baños,..)
router.get('/', (req, res, next) => {

    Categoria.findAll({include: [Producto]})
        .then(items => res.json({ ok: true, data: items }))
        .catch(err => res.json({ ok: false, error: err }));
  });




  module.exports = router;