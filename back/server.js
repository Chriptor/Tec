const express = require("express");
const dotenv = require('dotenv');
const db = require('./db/db');
const midd = require('./middlewares/midd');
const cors = require('cors');


const app = express();

dotenv.config();


//Middlelware
app.use(express.json());
app.use(cors());
app.use(midd.log);
app.use(midd.limitador);


app.listen(process.env.PORT, function () {
    console.log(`Servidor iniciado en http://${process.env.HOST}:${process.env.PORT}`)
});

app.get('/', function (req, res) {
    db.respuesta.mensaje = "Inicio";
    res.send(db.respuesta);
})

//Endpoint para obtener paises de la DB
app.get('/Producto',cors(midd.corsOption),function (req, res) {
    res.send(db.buscaProducto)
})

app.post('/Producto',midd.Autenticar, function (req, res) {
    if (!req.body.nombre || !req.body.precio) {
        db.respuesta = {
            codigo: 502,
            error: true,
            mensaje: 'Es indispensable enviar nombre y código del país'
        }
    } else {
        if (db.buscaPais(req.body.nombre)) {
            db.respuesta = {
                codigo: 503,
                error: true,
                mensaje: 'producto ya registrado'
                
            }
        } else {
            db.nuevoPais(req.body.nombre, req.body.precio)

            db.respuesta = {
                codigo: 200,
                error: false,
                mensaje: 'producto creado'
            }
        }
    }
    res.send(db.respuesta)
})

app.delete('/Eliminar/:id', function (req, res) {

    if (!db.buscaPais(req.params.pais)) {
        db.respuesta = {
            codigo: 500,
            error: true,
            mensaje: req.params.pais
        }
    } else {
        db.borraPais(req.params.pais)
        db.respuesta = {
            codigo: 200,
            error: false,
            mensaje: 'producto eliminado'
        }
    }
    res.send(db.respuesta);
})

app.get('/Producto.html', function (req, res) {
    res.send('Hello World')

    console.log("hola")
})