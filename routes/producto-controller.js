const express = require('express');

const { Producto, Categoria, Imagen } = require('../models/index');
const router = express.Router();



//es product/:id ya que en index controller se definio api/product para este controller
router.get('/:id', (req, res, next) => {
    let idProducto = req.params.id;
    Producto.findOne({ where: { id_producto: idProducto },  include: [Imagen]  })
        .then(item => res.json({ ok: true, data: item }))
        .catch(err => res.json({ ok: false, error: err }));
  });


  //esto selecciona todas los productos 
router.get('/', (req, res, next) => {

    Producto.findAll({include: [Categoria], include: [Imagen] })
        .then(items => res.json({ ok: true, data: items }))
        .catch(err => res.json({ ok: false, error: err }));
  });


  router.get('/Imagens/:img/:id', (req, res, next) => {
let foto_3d = req.params.img
let id_img = req.params.id
    Producto.findOne({where: { id_producto: id_img, img3d: foto_3d } })
        .then(items => res.json({ ok: true, data: items }))
        .catch(err => res.json({ ok: false, error: err }));
  });


  //selecciona los productos de una categoria en concreto (todas las camas..)
//   router.get('/category/:id_categoria', (req, res, next) => {
//     let idCategoria = req.params.id_categoria;
//     Producto.findAll({ where: { id_categoria: idCategoria } })
//         .then(items => res.json({ ok: true, data: items }))
//         .catch(err => res.json({ ok: false, error: err }));
//   });


  module.exports = router;