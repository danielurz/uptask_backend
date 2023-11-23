import { Router } from "express";
import { registerUser } from "../controllers/usuario.controllers.js";
import { loginUser } from "../controllers/usuario.controllers.js";
import { confirmarCuenta } from "../controllers/usuario.controllers.js";
import { resetPassword } from "../controllers/usuario.controllers.js";
import { nuevoPassword } from "../controllers/usuario.controllers.js";
import { emailRegistro } from "../config/nodemailer.js";

import { authUser } from "../middlewares/authUser.js";
import { autenticarUsuario } from "../controllers/usuario.controllers.js";

const router = Router()

// Area Publica
router.get("/confirmar/:token", confirmarCuenta)
router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/reset-password", resetPassword)
router.post("/nuevo-password/:token", nuevoPassword)
router.post("/envio-mail-portfolio", emailRegistro)

// https://zany-ruby-worm-wear.cyclic.app/api/user/envio-mail-portfolio


// Area Privada
router.get("/autentication", authUser, autenticarUsuario)

export default router