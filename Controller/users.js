const validacion = require('../controller/validaciones')
const User = require('../model/Users')
const bcrypt = require('bcrypt')

module.exports.newUser = async(req,res)=>{
    const { error } = validacion.schemaRegister.validate(req.body)
    
     if (error) {
         return res.status(400).json(
             {error: error.details[0].message}
         )
     }
     
     const emailEx = await User.findOne({ correo: req.body.correo });
     if (emailEx) {
         return res.status(400).json({error: 'Email ya registrado'})
    }
    
    const ronda = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, ronda)
    



    const user = new User({
        
        nombre: req.body.nombre,
        apellido_p: req.body.apellido_p,
        correo: req.body.correo,
        password: password
    })
try {
    const userDB = await user.save();
    
    res.json({
        error: null,
        // data: userDB
    })
} catch (error) {
    res.status(400).json(error )    
}
}

module.exports.listarUsuario=async()=>{

try {
    const Usuarios = await User.find();
    return Usuarios
} catch (error) {
    console.log(error)
}
}

module.exports.buscar1Usuario=async(id)=>{

    try {
        const Usuario = await User.findById(id, 'nombre apellido_p apellido_m pais ciudad fecha_nac estudios certificaciones idiomas linkedin Hobbies' );
        return Usuario
    } catch (error) {
        console.log(error)
    }
    }
    module.exports.listarSolicitudes=async(id)=>{

        try {
            const Usuario = await User.findById(id, 'nombre apellido_p apellido_m pais ciudad  estudios  idiomas linkedin ' );
            return Usuario
        } catch (error) {
            console.log(error)
        }
        }
    module.exports.buscarSolicitudes=async(id)=>{

        try {
            const Usuario = await User.findById(id, 'amigos' );
            const resul= Usuario.amigos[0].solicitudes
            
            return resul
        } catch (error) {
            console.log(error)
        }
        }
        
module.exports.buscarImagenUsuario=async(id)=>{

    try {
        const Usuario = await User.findById(id, 'foto_perfil' );
        
        return Usuario
    } catch (error) {
        console.log(error)
    }
    }

    module.exports.enviarSolicitud=async(id,miId)=>{

        try {
            const Usuario = await User.findByIdAndUpdate(id, {amigos: [{ solicitudes: miId }] });
            console.log("solicitud enviada");
            return Usuario
        } catch (error) {
            console.log(error)
        }
        }
