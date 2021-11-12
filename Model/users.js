const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
   
    nombre: {
        type: String,
        required: true,
        min: 3,
        max: 150
    },
    apellido_p: {
        type: String,
        required: true,
        min: 3,
        max: 150
    },
    
    correo: {
        type: String,
        required: true,
        
        min: 5,
        max: 1024
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    date: {
        type: Date,
        default: Date.now
    },
    carrito: [{ id: String, nombre: String, descripcion: String, cantidad: Number, precio: Number }],
    compra:[{de: String, texto: String}]
})

module.exports = mongoose.model('User', userSchema);