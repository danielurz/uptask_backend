import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "f633e59dba7a94",
    pass: "7ff8ab35e86c20"
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