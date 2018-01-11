require('./config/config.js');

const nodemailer = require('nodemailer');
const myEmail = process.env.SENDER_EMAIL;
const myPass = process.env.SENDER_PASSWORD;

var transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: myEmail,
    pass: myPass
  }
});

const sendMail = (text) => {
  var mailOptions = {
    from: myEmail,
    to: process.env.RECEIVER_EMAIL,
    subject: 'Nuevo Mensaje de un cliente!',
    html: text
  };

  return new Promise(function(resolve, reject){
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        return reject(error);
      } else {
        return resolve(`Email sent: ${info.response}`);
      }
    });
  });

}

module.exports = {
  sendMail
}
