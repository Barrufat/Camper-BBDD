//importamos/requerimos express
const express = require('express');
const cors = require('cors');

//importamos los controladores que contienen las definiciones de las rutas
const categoriaController = require('./routes/categoria-controller');
const productoController = require('./routes/producto-controller');
const usuarioController = require('./routes/usuario-controller');
const imagenController = require('./routes/imagen-controller');


//creamos una nueva aplicación express
const app = express();


app.use(express.json()); //necesario para poder recibir datos en json
app.use(cors()); //evita problemas al conectar desde otro servidorx

//ruta estática para imágenes
app.use("/img", express.static('uploads'));



//las ruta "/" se gestiona en indexController
app.use('/api/category', categoriaController);
app.use('/api/product', productoController);
app.use('/api/user', usuarioController);
app.use('/api/imagen', imagenController)


//arranque del servidor
const port = 3001
app.listen(port, () => console.log(`Express en puerto ${port}!`))
