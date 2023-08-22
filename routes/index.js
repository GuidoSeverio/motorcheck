var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', async(req, res, next) => {
  console.log(req.body)
  var nombre = req.body.nombre;
  var tel = req.body.tel;
  var consulta = req.body.consulta;

  var obj = {
    to: 'guido.severio@hotmail.com',
    subject: 'CONTACTO WEB',
    html: nombre + " se contactó a través de la web. Su teléfono es: " + tel + ". <br> Y realizó esta consulta: " + consulta
  }
  var transport = nodemailer.createTransport ({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  var info = await transport.sendMail(obj);

  res.render ('index', {
    message: 'Consulta enviada correctamente.'
  });
});

module.exports = router;
