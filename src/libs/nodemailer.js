import nodemailer from 'nodemailer'

async function mail(to, subject, message) {
  maildata.html = html

  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT > 99,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    }
  });
  transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    html: message
  }, (err, result) => {
    if (err)
      return Promise.reject(new Error(err))
    else
      return Promise.resolve(result)
  })
}

export default mail
