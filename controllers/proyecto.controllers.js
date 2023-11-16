import Project from "../models/proyecto.models.js"
import Usuario from "../models/usuario.models.js"


export const creandoProyecto = async (req,res) => {
    try {
        const newProject = new Project(req.body)
        await newProject.save()

        res.json({success: "Proyecto creado",id: newProject._id})
    } catch (error) {
        res.status(500).json({serverError: error.message})
        console.log(error.message)
    }
}


export const obtenerProyectos = async (req,res) => {
    const {userId} = req.params
    try {
        const projects = await Project.find({
            $or: [
                {creadorId: userId},
                {colaboradores: {$in: userId}}
            ]
        }).select(
            "-createdAt -colaboradores -updatedAt"
        )

        res.json(projects)
    } catch (error) {
        res.status(500).json({serverError: error.message})
        console.log(error.message)
    }
}


export const actualizarProyecto = async (req,res) => {
    try {
        const {projectId,userId} = req.params
        const proyecto = await Project.findByIdAndUpdate(projectId,req.body).where({
            creadorId: userId
        })
        
        if (!proyecto) return res.status(404).json({error: "Proyecto no encontrado"})

        res.json({success: "Proyecto actualizado"})
    } catch (error) {
        res.status(500).json({serverError: error.message})
        console.log(error.message)
    }
}


export const eliminarProyecto = async (req,res) => {
    try {
        const {projectId,userId} = req.params
        const proyecto = await Project.findByIdAndDelete(projectId).where({
            creadorId: userId
        })
        if (!proyecto) return res.status(404).json({error: "Proyecto no encontrado"})

        res.json({success:"Proyecto eliminado"})

    } catch (error) {
        res.status(500).json({serverError: error.message})
        console.log(error.message)
    }
}


export const getColab = async (req,res) => {
    try {
        const {userId, email} = req.params
        const colaborador = await Usuario.findOne({email})

        if (!colaborador) return res.status(404).json({error: "No existe un usuario con este email"})
        if (String(colaborador._id) === String(userId)) return res.status(404).json({
            error: "No te puedes agregar a ti mismo como colaborador"
        })

        res.json({
            email:colaborador.email,
            id:colaborador._id,
            nombre: colaborador.nombre
        })
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({serverError: error.message})
    }
}


export const getAllColabs = async (req,res) => {
    try {
        let colArr = [] 
        const project = await Project.findById(req.params.projectId)
        
        await Promise.all(project.colaboradores.map(async colId => {
            const colaborador = await Usuario.findById(colId)
            colArr.push({
                id: colaborador._id,
                nombre: colaborador.nombre,
                email: colaborador.email,
            })
        }))

        res.json(colArr)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({serverError: error.message})
    }
}


export const addColaborador = async (req,res) => {
    try {
        const {userId, projectId} = req.params
        const {colId} = req.body
    
        const project = await Project.findById(projectId)
    
        if (String(project.creadorId) !== String(userId)) return res.status(403).json({
            error: "No tienes los permisos para realizar esta accion"
        })

        const user = await Usuario.findById(colId)
        if (!user.confirmado) return res.status(403).json({
            error: "Este usuario no ha confirmado su cuenta"
        })
    
        const existeCol = project.colaboradores.includes(colId)
        if (existeCol) return res.status(404).json({error:"Ya fue agregado este colaborador"})

        project.colaboradores.push(colId)
        await project.save()

        res.json({success:"Colaborador agregado"})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({serverError: error.message})
    }
}


export const deleteColab = async (req,res) => {
    try {
        const {projectId,colId} = req.params

        const project = await Project.findById(projectId)
        const index = project.colaboradores.findIndex(id => String(id) === colId)

        project.colaboradores.splice(index,1)
        await project.save()

        res.json({success: "Colaborador eliminado"})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({serverError: error.message})
    }
}