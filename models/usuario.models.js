import mongoose from "mongoose";
import bcrypt from "bcrypt"

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    token: {
        type: String
    },
    confirmado: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false,
    timestamps: true
})

usuarioSchema.statics.hashPassword = async password => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt)
}

usuarioSchema.statics.comparePassword = async (password,hashedPassword) => {
    return await bcrypt.compare(password,hashedPassword)
}

export default mongoose.model("Usuario", usuarioSchema)