import Task from "../models/tarea.models.js";
import Project from "../models/proyecto.models.js";

export const crearTarea = async (req,res) => {
    try {
        const proyecto = await Project.findById(req.body.projectId)

        if (!proyecto) return res.status(404).json({error: "No existe el proyecto"})
        if (String(proyecto.creadorId) !== String(req.params.userId)) return res.status(403).json({error: "No tienes los permisos"})

        const newTask = new Task(req.body)
        await newTask.save()

        res.json({success: "Tarea creada",id:newTask._id})
    } catch (error) {
        res.status(500).json({serverError: error.message})
        console.log(error.message)
    }
}


export const obtenerTareas = async (req,res) => {
    try {
        const tareas = await Task.find().where({
            projectId: req.params.projectId
        })
        res.json(tareas)
    } catch (error) {
        res.status(500).json({serverError: error.message})
        console.log(error.message)
    }
}


export const actualizarTarea = async (req,res) => {
    try {
        const {taskId, projectId} = req.params
        console.log(req.body)
        const tarea = await Task.findByIdAndUpdate(taskId,req.body).where({projectId})
        if (!tarea) return res.status(404).json({error: "Tarea no encontrada"})
    
        res.json({success: "Tarea actualizada"})

    } catch (error) {
        res.status(500).json({serverError: error.message})
        console.log(error.message)
    }
}

export const actualizarEstado = async (req,res) => {
    try {
        const {taskId,projectId} = req.params
        const tarea = await Task.findById(taskId).where({projectId})

        tarea.estado = req.body.boolean
        await tarea.save()

        res.status(200)
    } catch (error) {
        res.status(500).json({serverError: error.message})
        console.log(error.message)
    }
}


export const eliminarTarea = async (req,res) => {
    try {
        const {taskId,projectId,userId} = req.params
    
        const proyecto = await Project.findById(projectId)
        if (String(proyecto.creadorId) !== String(userId)) return res.status(403).json({error: "No tienes los permisos"})
    
        await Task.findByIdAndDelete(taskId).where({projectId})
    
        res.json({success: "Tarea eliminada"})

    } catch (error) {
        res.status(500).json({serverError: error.message})
        console.log(error.message)
    }
}
