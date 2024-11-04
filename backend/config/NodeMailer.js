const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'forumchatapp@gmail.com',
        pass:'mycg fzsl skwk nvqd'
    }
});

const sendMail = async (mailOptions) => {
   transporter.sendMail(mailOptions, async (err, info) => {
      if (err) {
        console.log("Error in sending email: " + err)
      } else {
        console.log("Email sent successfully: " + info.response)
      }
    })
  }

module.exports = sendMail;