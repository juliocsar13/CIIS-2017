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

  var mailOptions = {
    from: '"CIIS" <esistacna@gmail.com>', // sender address
    to: user.email, // list of receivers
    subject: 'CIIS TACNA - Confirmar Preregistro ✔', // Subject line
    text: 'Hola '+user.name+user.lastname+' confirme su preregistro', // plain text body
    html: '<p>Hola '+ user.name +' '+user.lastname+' <br>Registro exitoso!'

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
