import mongoose from "mongoose";

const tareaSchema = mongoose.Schema({
    tarea: {
        type: String,
        trim: true,
        required: true
    },
    descripcion: {
        type: String,
        trim: true,
        required: true
    },
    estado: {
        type: Boolean,
        default: false
    },
    fecha: {
        type: Date,
        default: Date.now()
    },
    prioridad: {
        type: String,
        required: true,
        enum: ["Baja","Media","Alta"]
    },
    projectId: {
        type: mongoose.Schema.ObjectId,
        ref: "Proyecto"
    }
},{
    versionKey: false,
    timestamps: true
})

export default mongoose.model("Tarea", tareaSchema)