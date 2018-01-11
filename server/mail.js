require('./config/config.js');

const nodemailer = require('nodemailer');
const myEmail = process.env.SENDER_EMAIL;
const myPass = process.env.SENDER_PASSWORD;

var transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  service: 'gmail',
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

// Use at least Nodemailer v4.1.0
// require('./config/config.js');
//
// const nodemailer = require('nodemailer');
// //const myEmail = process.env.SENDER_EMAIL;
// const myPass = process.env.SENDER_PASSWORD;
//
// var transporter;
// var myEmail;
//
// // Generate SMTP service account from ethereal.email
// nodemailer.createTestAccount((err, account) => {
//     if (err) {
//         console.error('Failed to create a testing account. ' + err.message);
//         return process.exit(1);
//     }
//     myEmail = account.user;
//     // Create a SMTP transporter object
//     transporter = nodemailer.createTransport({
//         host: account.smtp.host,
//         port: account.smtp.port,
//         secure: account.smtp.secure,
//         auth: {
//             user: myEmail,
//             pass: account.pass
//         }
//     });
//
// });
//
// const sendMail = (text) => {
//   var mailOptions = {
//     from: myEmail,
//     to: process.env.RECEIVER_EMAIL,
//     subject: 'Nuevo Mensaje de un cliente!',
//     html: text
//   };
//
//   return new Promise(function(resolve, reject){
//
//     transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//         return reject(error);
//       } else {
//         console.log(info.response);
//         return resolve(`Email sent: ${info.response}`);
//       }
//     });
//   });
//
// }
//
// module.exports = {
//   sendMail
// }
