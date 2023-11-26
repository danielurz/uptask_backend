import nodemailer from "nodemailer"
import fetch from "node-fetch"

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});

// const transport = nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//         user: "19062441f2772e",
//         pass: "77382a51dc2386"
//     }
// });


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
        const {name,email,subject} = req.body
        const recaptchaResponse = req.body['g-recaptcha-response'];

        const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${recaptchaResponse}`

        const captachaResult = await fetch(recaptchaUrl,{
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
            },
        }).then(res => res.json())

        if (!captachaResult.success) return res.status(400).json({error: 'reCAPTCHA check failed.' });

        const tel = req.body.tel || "No ingresó teléfono"

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
        res.status(500).json({error: error.message})
    }
}