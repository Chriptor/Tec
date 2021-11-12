const jwt = require('jsonwebtoken')
const Joi = require('@hapi/joi');
var cookieParser = require('cookie-parser')
const express = require('express');
const app=express()
app.use(cookieParser())

const verificaToken = (req, res, next) => {
    const token = req.cookies.access_token
    
    if(!token) {
        return res.render("404", {error: 'Acceso Denegado', TituloW:"Error"})
    }
    try {
        const verified = jwt.verify(token, process.env.SECRET_TOKEN)
        req.user = verified
        next()
    } catch (error) {
        res.render("404", {error: 'Token invalido', TituloW:"Error"})
    }
    
}

const schemaRegister = Joi.object({
    nombre: Joi.string().max(255).required(),
    apellido_p: Joi.string().max(255).required(),
    correo: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(4).max(1024).required(),
    
})

const schemaLogin = Joi.object({
    correo: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().max(1024).required()
})

module.exports = {schemaRegister,schemaLogin, verificaToken}