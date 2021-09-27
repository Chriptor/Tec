// const rateLimit = require('express-rate-limit');



// const corsOption = {
//     origin : function (origin, callback) {
//         callback(null, true)
        
//         if (process.env.listaBlanca.indexOf(origin) !== -1){
//             callback(null, true)
//         }else {
//             callback(new Error('No autorizado por Cors'))
//         }
//     }
// }

// log = function (req,res,next) {
//     const {method,path,query,body} = req;
//     console.log(`${method} - ${path} - ${JSON.stringify(query)} - ${JSON.stringify(body)}`);
//     next()
// }

// Autenticar = function (req,res,next) {
//     const {nombre,codigo,clave} = req.body;
//     if(clave == "Una clave para protegernos a todos"){
//         return next()
//     }
//     else{
//         return res.status(400).json("No dijiste la palabra mágica")
//     }
// }

// const limitador = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutos
//     max: 100, // Limite de peticiones
//     message: 'Limite de solicitudes exedido'
// })


const jwt = require('jsonwebtoken');

module.exports.middAutentication = function(req,res,next){
    if(req.headers.authorization != undefined){
        try {
            const token = req.headers.authorization.split(' ')[1];
            let result = jwt.verify(token,process.env.SECRETKEY);
            return next();
    
        } catch (error) {
            console.log();
            throw new Error("Token invalido");
        }
        
    }else{
        throw new Error("Token invalido");
    }





    
// if(req.headers.authorization != undefined){
//     const token = req.headers.authorization.split(' ')[1];

//     let result = jwt.verify(token,process.env.SECRETKEY);
//     console.log(result);
//     if(result){
//         return next();
//     }else{
//         return "ERROR :("
//     }
    
// }else{
//     throw new Error("Token invalido");
// }
    
}
