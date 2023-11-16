import Usuario from "../models/usuario.models.js"
import {randomUUID} from "crypto"
import { generarJWT } from "../config/generarJWT.js"
import { emailRegistro } from "../config/nodemailer.js"
import { emailOlvidePassword } from "../config/nodemailer.js"


export const registerUser = async (req,res) => {
    try {
        const {email,password,nombre} = req.body
        const existUser = await Usuario.findOne({email})
        if (existUser) return res.status(400).json({error: "Este email ya se encuentra registrado"})
        
        const hashPassword = await Usuario.hashPassword(password)
        const newUser = new Usuario({...req.body,password:hashPassword})
        
        newUser.token = randomUUID()
        await newUser.save()

        emailRegistro({token:newUser.token,nombre,email})
        res.json({success: "Usuario registrado, revisa tu email para confirmar tu cuenta"})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({serverError: error.message})
    }
}


export const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body
        
        const existUser = await Usuario.findOne({email})
        if (!existUser) return res.status(400).json({error: "Este email no se encuentra registrado"})

        const matchPassword = await Usuario.comparePassword(password,existUser.password)
        if (!matchPassword) return res.status(400).json({error:"password incorrecto"})

        if (!existUser.confirmado) return res.status(400).json({error:"Cuenta no confirmada, revisa tu email"})

        res.json({token:generarJWT(existUser._id)})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({serverError: error.message})
    }
}


export const confirmarCuenta = async (req,res) => {
    try {
        const existUser = await Usuario.findOne({token:req.params.token})
        if (!existUser || existUser.confirmado) return res.status(404).json({error: "Token invalido o cuenta ya confirmada"})

        existUser.token = null
        existUser.confirmado = true
        await existUser.save()

        res.json({success:"Cuenta confirmada exitosamente"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({serverError: error.message})
    }
}


export const resetPassword = async (req,res) => {
    try {
        const existUser = await Usuario.findOne({email:req.body.email})

        if (!existUser) return res.status(404).json({error: "Email no registrado"})
        if (!existUser.confirmado) return res.status(404).json({error: "Esta cuenta no ha sido confirmada"})
        
        existUser.token = randomUUID()
        await existUser.save()

        emailOlvidePassword({
            nombre: existUser.nombre,
            email: existUser.email,
            token: existUser.token,
        })

        res.json({success: "Se ha enviado a su email las instrucciones para resetar el password"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({serverError: error.message})
    }
}


export const nuevoPassword = async (req,res) => {
    try {
        const existUser = await Usuario.findOne({token:req.params.token})
        
        if (!existUser) return res.status(404).json({error: "Token Invalido"})
        
        existUser.password = await Usuario.hashPassword(req.body.password)
        existUser.token = null
        await existUser.save()
        
        res.json({success: "Password Actualizado"})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({serverError: error.message})
    }
}


export const autenticarUsuario = async (req,res) => {
    try {
        res.json(req.user)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({serverError: error.message})
    }
}


