const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyparser = require('body-parser'); 
const rutasUsuario = require('./views/Usuario')
const login = require('./views/login')
const { verificaToken } = require('./Controller/validaciones');
const cookieParser = require('cookie-parser');
const lista=require('./Controller/users')
const lisPr=require('./Controller/producto')
// const api=require('./Model/product')

const app = express();

app.use(cookieParser())
app.use(express.json({limit: '50mb'}))
app.use(cors());


app.set('view engine','ejs');
app.set('views', __dirname + '/view');
app.use(express.static(__dirname + "/public"));
app.use(bodyparser.urlencoded({limit: '50mb'}));
app.use(bodyparser.json());

const uriMongo = `mongodb+srv://${process.env.DB_USR}:${process.env.DB_PASS}@cluster0.q8rfj.mongodb.net/${process.env.DB_DB}?retryWrites=true&w=majority`

async function serverStart() {
    mongoose.connect(uriMongo,
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true
            
        }).then(r => {
        app.listen(process.env.PORT, () => {
            console.log("Servidor Iniciado en el puerto " + process.env.PORT)
            console.log("conctado a db "+ uriMongo)
        })
    }).catch(error => {
        console.log(error)
        console.log("No pude conectar a la base de datos")
    })
}



app.use('/', login )
app.use('/', rutasUsuario )
app.get('/salir', async (req, res) => {
    
    res
        .status(201)
        .cookie('access_token' , {
          expires: new Date(Date.now() + 8 * 3600000) 
        })
        .redirect(301, '/')
    })
   


    

    serverStart();


app.get('/', (req, res) => {
lisPr.guardarProductos()
    res.render("index")
})
app.get('/Ofertas', (req, res) => {
    res.render("Ofertas"
    // ,{arrayProduct: api.getData()}
    )
})
app.get('/LogIn', (req, res) => {
    res.render("LogIn",{msg:"Bienvenido"})
})
app.get('/LogIn1', (req, res) => {
    res.render("LogIn",{msg:"registrado con exito"})
})
app.get('/Bienvenida', verificaToken, (req, res) => {
    res.render("./Admin/Bienvenida")
})
app.get('/Registro', (req, res) => {
    res.render("Registro")
})
app.post('/registrar', async (req, res) => {
    await lista.newUser(req,res);
})
app.use((req, res, next) => {
    res.status(404).render("404")
})
//Iniciamos vistas


 