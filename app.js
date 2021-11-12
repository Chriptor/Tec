const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequileze = require('./Model/conexion');
 

const app = express();

app.use(express.json())
app.use(cors());

app.set('view engine','ejs');
app.set('views', __dirname + '/View');
app.use(express.static(__dirname + "/public"));

async function serverStart() {
    try {
        await sequileze.authenticate();
        console.log("Conexión estabilizada correctamente")
        app.listen(process.env.PORT, function () {
            console.log(`Sistema iniciado en http://${process.env.HOST}:${process.env.PORT}`);
        });
    } catch (error) {
        console.error('No se pudo conectar correctamebte con la Base de datos:', error);
    }
}

serverStart();

app.get('/', (req, res) => {
    res.render("index")
})
app.get('/Ofertas', (req, res) => {
    res.render("Ofertas")
})
app.get('/LogIn', (req, res) => {
    res.render("LogIn")
})
app.get('/Registro', (req, res) => {
    res.render("Registro")
})
app.use((req, res, next) => {
    res.status(404).render("404")
})
//Iniciamos vistas