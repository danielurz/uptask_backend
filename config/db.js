import mongoose from "mongoose";

export const connectionDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log(`MongoDB conectado en el puerto ${db.connection.port}`)
    } catch (error) {
        console.log(error.message)
    }
}