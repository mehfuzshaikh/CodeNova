import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport'; // add for solve error on host

// This is for mailtrap(Use in development)
// export const sendEmail = async( to: string,subject: string,text:string ):Promise<void>=>{
//     const transporter = nodemailer.createTransport({
//         host:process.env.EMAIL_HOST,
//         port:process.env.EMAIL_PORT,
//         auth:{
//             user:process.env.EMAIL_USERNAME,
//             pass:process.env.EMAIL_PASSWORD,
//         }
//     }as SMTPTransport.Options); // add for solve error on host

//     const mailOptions = {
//         from:'Code Challenge App <no-reply@codechallenge.com>',
//         to,
//         subject,
//         text
//     }

//     await transporter.sendMail(mailOptions);
// }

// This is for real gmail(Use in production)
export const sendEmail = async( to: string,subject: string,html:string ):Promise<void>=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:process.env.GMAIL_USER,
            pass:process.env.GMAIL_PASS,
        }
    }as SMTPTransport.Options); // add for solve error on host

    const mailOptions = {
        from:'CodeNova <no-reply@codenova.com>',
        to,
        subject,
        html
    }
    await transporter.sendMail(mailOptions);
}