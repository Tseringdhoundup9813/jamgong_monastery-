const nodemailer = require("nodemailer")


const sendEmail = async (option)=>{
    // CREATE A TRANSPORTER
    const transporter =nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASSWORD
        }
    })

    // DEFINE EMAIL OPTION
    const emailOptions ={
        from:'CineFlix support<tseringlama123@gmail.com>',
        to:option.email,
        subject:option.subject,
        text:option.message

    }
    await transporter.sendMail(emailOptions)

}

module.exports = sendEmail;