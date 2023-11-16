import { Router } from "express";
import { crearTarea } from "../controllers/tarea.controllers.js";
import { obtenerTareas } from "../controllers/tarea.controllers.js";
import { actualizarTarea } from "../controllers/tarea.controllers.js";
import { eliminarTarea } from "../controllers/tarea.controllers.js";
import { actualizarEstado } from "../controllers/tarea.controllers.js";

const router = Router()

router.post("/crear/:userId", crearTarea)
router.get("/obtener/:projectId/", obtenerTareas)

router.put("/mutar/:taskId/:projectId", actualizarTarea)
router.patch("/mutar/:taskId/:projectId", actualizarEstado)
router.delete("/mutar/:taskId/:projectId/:userId", eliminarTarea)

export default router