const express = require('express')
const app = express()
require('dotenv').config() //paquete para variables de entorno
const bodyParser = require('body-parser'); //paquete para recibir los valores del formulario

app.use(express.json());
app.use(express.static('public')); //importamos ficheros estáticos

app.set('view engine', 'pug'); //plantillas pug
app.set('views','./views');
app.use(bodyParser.urlencoded({ extended: true })); //descifra lo que vienen del formulario

// Arichivo rutas
const filmRoutes = require("./routes/films.routes")

// Habilitar rutas
app.use('/', filmRoutes);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
