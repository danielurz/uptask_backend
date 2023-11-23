import express from "express";
import dotenv from "dotenv";
import { connectionDB } from "./config/db.js";
import cors from "cors"
import usuarioRouter from "./routes/usuario.routes.js";
import proyectoRoutes from "./routes/proyecto.routes.js";
import tareaRoutes from "./routes/tarea.routes.js";

const app = express()
app.use(express.json())
dotenv.config()
connectionDB()

const whiteList = ["uptask-frontend.pages.dev","danielurzola.com"]

const corsOptions = {
    origin: (origin, callback) => {
        const esValido = whiteList.every(dominio => origin.endsWith(dominio))
        if (esValido) {
            callback(null, true)
        } else {
            callback(new Error("No permitido por CORS"))
        }
    }
}

app.use(cors(corsOptions))
// app.use(cors())

app.use("/api/user", usuarioRouter)
app.use("/api/project", proyectoRoutes)
app.use("/api/task", tareaRoutes)


const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})