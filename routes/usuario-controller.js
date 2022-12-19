const express = require('express');
const {autentica, autError} = require('./middleware.js');

//bcrypt es un modulo que nos permite encriptar en una dirección
const bcrypt = require('bcrypt');

const model = require('../models/index');

//es el modelo de usuario
const Usuario = model.Usuario;

//biblot. para JWT
const jsonwebtoken = require('jsonwebtoken');

//en config tenemos la key para encriptar y cuando expirara el token
const Config = require('./config');
const { secretKey, expiredAfter } = Config;

//para hacer los endpoints
const router = express.Router();


  //postman: en el body un objeto con nombre y pass, si ya esta registrado te devolvera un token en response
router.post('/login', (req, res) => {
	const response = {}; //este objeto es el que incluirá el token si todo ok
  const { email, pass } = req.body;

//confirma si dentro del objeto que enviamos por postman alguno de los dos no se ha escrito
  if (!email || !pass) {
    return res.status(400).json({ ok: false, msg: "email o password no rebuts" });
  }

//busca si ya existe un usuario con email
  Usuario.findOne({ where: { email } })
    .then((usuario) => {
        //comprueba si usuario contraseña escrita (encriptada) es la misma que la de la bbdd, si es asi retorna la info del usuario, sino throw error
      if (usuario && bcrypt.compareSync(pass, usuario.pass)) {
        return usuario;
      } else {
        throw "usuari/password invalids";
      }
    })


    .then(usuario => {
        //jsonwebtoken.sing crea token y lo guarda en el objeto response con el nombre token
        response.token = jsonwebtoken.sign(
          {
              //que lleva token y solicitar info en base a usuario sino.
            expiredAt: new Date().getTime() + expiredAfter,
            email,
            // dirección: usuario.direccion,
            // telefono: usuario.telefono,
            // codigo_postal: usuario.codigo_postal,
            nombre:usuario.nom,
            id: usuario.id_usuario, // id_usuario o id????

          },
          secretKey
        );
        response.ok=true;
    res.json(response);
	})
  .catch(err => res.status(400).json({ ok: false, msg: err }))
	
});




/* POST registro de usuario */
router.post('/registre', function (req, res, next) {
  const hash = bcrypt.hashSync(req.body.pass, 10);
  req.body.pass = hash;
  Usuario.create(req.body)
    .then(item => res.json({ ok: true, data: item }))
    .catch((error) => res.json({ ok: false, error }))
});



// comprueba token al principio
router.get('/checktoken', [autentica, autError], (req, res) => {
  res.status(200).json({
    ok: true,
    token: req.token});
});

router.get('/open', (req, res) => {
  res.status(200).json({
    ok: true,
    data: "TOTHOM POT VEURE AIXÒ"});
});


router.get('/secret', [autentica, autError], (req, res) => {
  res.status(200).json({
    ok: true,
    data: "EL NÚMERO SECRET ÉS 42"});
});




module.exports = router;