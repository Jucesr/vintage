const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const mail = require('./mail');

const port = process.env.PORT || 3000;
const public_path = path.join(__dirname, '../public');

const app = express();
app.use(bodyParser.json());
app.use( express.static(public_path) );

app.post('/sendmail', (req, res) => {

  const text = createTextMessage(req.body);
  mail.sendMail(text).then( (result) => {
    res.status(200).send();
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(port, () => {
  console.log(`Server listening in port ${port}`);
});

const createTextMessage = (message) =>{
  const title = `<p style="font-size:25px">Un cliente ha enviado un mensaje </p>`;
  const name = `<li> <strong>Nombre: </strong>${message.name}</li>`;
  const email = `<li> <strong>Email: </strong>${message.email} <strong>&lt;-- Click para responder</strong></li>`;
  const phone = `<li> <strong>Telefono: </strong>${message.phone}</li>`;
  const date = `<li> <strong>Fecha: </strong>${message.date}</li>`;
  const text = `<li> <strong>Mensaje: </strong>${message.message}</li>`;
  const warning = `<div style="font-size:25px;color:red;">No responder directamente a este correo sino al email de la parte superior.</div>`
  return `${title} <ul style="font-size:20px">${name} ${email} ${phone} ${date} ${text}</ul> ${warning}`
}
