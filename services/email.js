const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
require('dotenv').config();

const createTemplateVerifyEmail = (verifyToken, emailUser) => {
    const mailGenerator = new Mailgen({
        theme: 'salted',
        product: {
            name: 'Contacts book',
            link: `http://localhost:${process.env.PORT}`,
        },
    });
    const email = {
        body: {
            name: emailUser,
            intro:
                "Please continue the registration procedure",
            action: {
                instructions: 'Please click the link to confirm your email:',
                button: {
                    color: '#22BC66',
                    text: 'Confirm your account',
                    link: `http://localhost:${process.env.PORT}/api/users/verify/${verifyToken}`,
                },
            },
        },
    };
    const emailBody = mailGenerator.generate(email);
    return emailBody;
}


const sendEmail = (verifyToken, email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.SENDER,
            pass: process.env.PASS
        }
    });
    const mailOptions = {
        from: process.env.SENDER,
        to: email,
        subject: 'Welcome! Please continue the registration procedure',
        html: createTemplateVerifyEmail(verifyToken, email)
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });

}

module.exports = {
    sendEmail
}