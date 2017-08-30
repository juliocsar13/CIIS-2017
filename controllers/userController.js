var User = require('../collections/user');
var jwt = require('jsonwebtoken');
var uploaderController = require('./uploader');
var mail = require('./mail');



module.exports.register = function (req,res) {
    console.log('registrando');
    var data = req.body;
    console.log(req.body);

    const uploaderOptions = {
      service: 'dropbox', file: req.file
    };

    uploaderController (uploaderOptions)
        .then(params => {
              var user = new User();
              user.voucher = params.file;
              user.voucherThumb = params.thumbnail;
              console.log(params);
              user.dni = data.dni;
              user.name = data.name;
              user.lastname = data.lastname;
              user.type = data.type;
              user.city = data.city;
              user.email = data.email;
              user.cellphone = data.cellphone;

              user.save(function (err,user) {
                  if(err){
                    console.log(err);
                    return res.sendStatus(503)
                  }
                  mail.sendEmail(user);
                  console.log(user);
                  return res.json(200);
              });
              }
            )
}

module.exports.createView = function (req,res) {
    res.render('layout');
}
module.exports.getUsers = function (req,res) {
    User.find({},function(error,users){

        res.json(users)
    })

    /*.exec(function (err,user) {
      if(err) return reserror.sendStatus(503);
      return res.json(user);
    });*/
}
module.exports.deleteUsers = function (req,res) {
    User.remove({})
    .exec(function (err,user) {
      if(err) return res.sendStatus(503);
      return res.json(user);
    });
}
