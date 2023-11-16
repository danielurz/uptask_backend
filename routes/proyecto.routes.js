import { Router } from "express";
import { creandoProyecto } from "../controllers/proyecto.controllers.js";
import { obtenerProyectos } from "../controllers/proyecto.controllers.js";
import { actualizarProyecto } from "../controllers/proyecto.controllers.js";
import { eliminarProyecto } from "../controllers/proyecto.controllers.js";
import { getColab } from "../controllers/proyecto.controllers.js";
import { getAllColabs } from "../controllers/proyecto.controllers.js";
import { addColaborador } from "../controllers/proyecto.controllers.js";
import { deleteColab } from "../controllers/proyecto.controllers.js";

const router = Router()

router.post("/crear", creandoProyecto)
router.get("/obtener/:userId", obtenerProyectos)

router.get("/colaborador/:email/:userId", getColab)
router.get("/colaboradores/:projectId", getAllColabs)
router.post("/colaborador/:projectId/:userId", addColaborador)
router.delete("/colaborador/:colId/:projectId", deleteColab)


router.route("/mutar/:projectId/:userId")
    .put(actualizarProyecto)
    .delete(eliminarProyecto)

export default router