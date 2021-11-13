const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
   
    id: {
        type: String,
        required: true
        
    },
    nombre: {
        type: String,
        required: true
        
    },
    
    precio: {
        type: Number,
        required: true
        
       
    },
    imagen: {
        type: String
        
        
    }
})
