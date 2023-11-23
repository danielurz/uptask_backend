import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "enviodeprospect0@gmail.com",
    pass: "baonufyqvheqxytr"
  }
});


export const emailRegistro = async ({token,nombre,email}) => {
    await transport.sendMail({
        from: "UpTask - Administrador de proyectos",
        to: email,
        subject: "UpTask - Comprueba tu cuenta",
        html: `
            <p>Hola ${nombre}, Comprueba tu cuenta ingresando al siguiente enlace:</p>
            <a href="http://127.0.0.1:5173/confirmar-cuenta/${token}">Comprueba tu cuenta</a>
        `
    })
}


export const emailOlvidePassword = async ({token,nombre,email}) => {
    await transport.sendMail({
        from: "UpTask - Administrador de proyectos",
        to: email,
        subject: "UpTask - Comprueba tu cuenta",
        html: `
            <p>Hola ${nombre}, has solicitado reestablecer tu password, sigue el siguiente enlace para poder hacerlo:</p>
            <a href="http://127.0.0.1:5173/nuevo-password/${token}">Reestablecer password</a>
        `
    })
}


export const envioMailPortfolio = async (req,res) => {
    try {
        const {name,email,subject,tel} = req.body
        await transport.sendMail({
            from: "danielurzola.com",
            to: "daniel.urzola96@gmail.com",
            subject: "new message from your webpage",
            html: `
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Tel: ${tel}</p>
            <p>Subject: ${subject}</p>
            `
        })

        res.json({success: "Message sent successfully"})
        
    } catch (error) {
        res.status(500).json({ServerError: error.message})
    }
}