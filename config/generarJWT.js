import jwt from "jsonwebtoken"

export const generarJWT = id => {
    return jwt.sign({id},"SECRET_KEY", {
        expiresIn: "7d"
    })
}