var nodemailer = require('nodemailer');

var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'esistacna@gmail.com', // my mail
        pass: '!ciistacna123#'
    }
}));


module.exports.sendEmail = function(user){
    var html = '<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>ciis2017</title>
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
        <div style="    height: 100vh; background-color: #fff; margin: 2%; width: 620px; margin: auto; padding: 2%; font-family: 'Open Sans', sans-serif;" class="document-style">
          <div style="text-align: center; margin: auto;" class="document-title">
              <span>Hola Sr(a): JULIO CESAR pari mamani, ésta es tu confirmacion de registro al</span>
              <h2 style="color: #0000FF;">XVIII Congreso Internacional de Informatica y Sistemas-TACNA</h2>
          </div>
          <div style="  height: 2px; background-color: #797979; margin-bottom: 10px;" class="line"></div>
          <div style="    margin-top: 35px; margin-bottom: 35px;" class="document-description">
            <p>Su solicitud de Inscripcion ha sido enviada con éxito</p>
          </div>
          <span>Resumen de Inscripcion:</span>
          <div style="display: flex; background-color: #dcdcdc; justify-content: space-around; padding: 2%;" class="conteiner-assistant">
            <div style="text-align: center;" class="assistant">
              <h3>ASISTENTE</h3>
              <div class="line"></div>
              <span>JULIO CESAR pari mamani</span>
            </div>
            <!--<div class="assistant">
              <h3>ESTADO</h3>
              <div class="line"></div>
              <span>Pendiente</span>
            </div>
            <div class="assistant">
              <h3>CANTIDAD</h3>
              <div class="line"></div>
              <span>1</span>
            </div>-->
          </div>
          <div class="text-conteiner">
            <p class="document-text">El Congreso Internacional de Informática y Sistemas - Tacna se llevará a cabo del 13 al 17. "Tecnologías que rompen paradigmas en nuestro siglo"</p>
            <!--<span>Reglamento del Evento:Descargar<br></span>-->
            <span>Si tienes consultas puedes comunicarte a: ciistacna@unjbg.edu.pe</span>
          </div>
          <div style="text-align: center; margin-top: 25px; background-color: #dcdcdc; padding: 2%;" class="conteiner-law">
            <span class="document-law">Este correo ha sido enviado de manera automática por HUKODE<br></span>
            <!--<span class="document-law">Copyrugth (c) HUKODE APP.Todos los derechos reservados</span>-->
          </div>
        </div>
    </body>
    </html>'
  var mailOptions = {
    from: '"'+user.eventType+'" <esistacna@gmail.com>', // sender address
    to: user.email, // list of receivers
    subject:  user.eventType+'- TACNA ✔', // Subject line
    text: '<div>Hola '+user.name+user.lastname+' confirme su preregistro</div>', // plain text body
    html: html
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
       console.log(error);
        return console.log(error);

    }
    sendInscription(user);
    console.log('Message sent: ' + info.response);
  });

}

  sendInscription = function(user){

  var email = user.email;
  var name = user.name;
  var mailOptions = {
    from: user.eventType+': ' + email, // sender address
    to: 'esistacna@gmail.com', // list of receivers
    subject: '['+user.eventType+'] Pre-inscripción: ' + email, // Subject line
    text: user.name+' '+user.lastname+' ('+user.email+') se ha preinscrito a '+user.eventType+'.' // plaintext body
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
       console.log(error);
        return console.log(error);

    }
    console.log('Message sent: ' + info.response);
  });

}


module.exports.contact = function(req,res){

  var email = req.body.email;
  var name = req.body.name;
  var subject = req.body.subject;
  var mailOptions = {
    from: name + ' ' + email, // sender address
    to: 'esistacna@gmail.com', // list of receivers
    subject: 'Consultas: ' + email, // Subject line
    text: subject // plaintext body
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
       console.log(error);
        return res.sendStatus(503);

    }
    console.log('Message sent: ' + info.response);
    res.send();
  });

}
