import jwt from "jsonwebtoken"
import Usuario from "../models/usuario.models.js"

export const authUser = async (req,res,next) => {
    try {
        const {authorization} = req.headers
        if (authorization.startsWith("Bearer") && authorization) {
            const token = authorization.split(" ")[1]
            const {id} = jwt.verify(token, "SECRET_KEY")
            
            const existUser = await Usuario.findById(id).select(
                "-password -confirmado -token -createdAt -updatedAt"
            )
            if (!existUser) return res.status(404).json({error: "Token invalido"})

            req.user = existUser
            next()
        } else {
            res.status(404).json({error: "Token invalido o inexistente"})
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({serverError: error.message})
    }
}


