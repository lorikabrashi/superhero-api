const nodemailer = require('nodemailer')

const createTransport = async () => {
  const testAccount = await nodemailer.createTestAccount()
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  })
  return transporter
}

module.exports = {
  sendForgotPasswordEmail: async (email, token) => {

    const transporter = await createTransport()
    const info = await transporter.sendMail({
      from: 'SuperHero App', // sender address
      to: 'lorik@pristine-tech.com', // list of receivers
      subject: 'Test superhero app', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>', // html body
    })
    console.log(info)
  },
}
