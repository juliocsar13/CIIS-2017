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
    from: 'esistacna@gmail.com', // sender address
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
