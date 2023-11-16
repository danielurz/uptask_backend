import mongoose from "mongoose";

const proyectoSchema = mongoose.Schema({
    proyecto: {
        type: String,
        trim: true,
        required: true
    },
    descripcion: {
        type: String,
        trim: true,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now()
    },
    cliente: {
        type: String,
        trim: true,
        required: true
    },
    creadorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario" 
    },
    colaboradores: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario"
        }
    ]
},{
    versionKey: false,
    timestamps: true
})

export default mongoose.model("Proyecto", proyectoSchema)