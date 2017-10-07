var User = require('../collections/user');
var jwt = require('jsonwebtoken');
var uploaderController = require('./uploader');
var mail = require('./mail');
var multer = require ('multer');
var  fs = require('fs');


module.exports.register = function (req,res) {
    //console.log('registrando',req.files);
    var data = req.body;
    console.log(req.body);

    var user = new User();
    user.dni = data.dni;
    user.name = data.name;
    user.lastname = data.lastname;
    user.type = data.type;
    user.city = data.city;
    user.email = data.email;
    user.cellphone = data.cellphone;
    user.eventType = data.eventType;

    user.save(function (err,user) {
        if(err){
          console.log(err);
          return res.sendStatus(503)
        }
        user.title = "XVIII Congreso Internacional de Informatica y Sistemas-TACNA";
        user.date = "13 al 17 de Noviembre";
        mail.sendEmail(user);
        console.log(user);
        return res.json(200);
    });

    //
    // const uploaderOptions = {
    //   service: 'dropbox', file: req.file
    // };

    // uploaderController (uploaderOptions)
    //     .then(params => {
    //           var user = new User();
    //           user.voucher = params.file;
    //           user.voucherThumb = params.thumbnail;
    //           console.log(params);
    //           user.dni = data.dni;
    //           user.name = data.name;
    //           user.lastname = data.lastname;
    //           user.type = data.type;
    //           user.city = data.city;
    //           user.email = data.email;
    //           user.cellphone = data.cellphone;
    //
    //           user.save(function (err,user) {
    //               if(err){
    //                 console.log(err);
    //                 return res.sendStatus(503)
    //               }
    //               mail.sendEmail(user);
    //               console.log(user);
    //               return res.json(200);
    //           });
    //           }
    //         )
}
/*
module.exports.sslController1 = function(req,res){
    res.sendFile('.well-known/acme-challenge/ElKZ3PuQ67S8s_8yZeowzibyI2dLI5oaaFGym949XGo', { root: path.join(__dirname, '../public') });

    fs.readFile('/archivos/${archivo}', function(err, content) {
    if(err) {  }
    cb(content);
    })




    fs.readFile('archivo.txt', 'utf-8', (err, data) => {
      if(err) {
        console.log('error: ', err);
      } else {
        console.log(data);
      }
    });
}

module.exports.sslController2 = function(req,res){
    res.sendFile('.well-known/acme-challenge/jtm3MenpuEpXRrrNWZiMfTOZqN-sJOn6qJ95lulThbA', { root: path.join(__dirname, '../public') });
}

*/
module.exports.sslController1 = function(req,res){
console.log("hola")
console.log("archivo",req.params)
fs.readFile('src/public/.well-known/acme-challenge/zf2uIh7KIBEFFrKnxQY1jBGH5xEYlY2E6BAz0dMKx6s', 'utf-8', (err, data) => {
      if(err) {
        console.log('error: ', err);
      } else {
        console.log(data);
        res.send(data)
      }
    });

}

module.exports.sslController2 = function(req,res){
console.log("archivo",req.params)

    fs.readFile('src/public/.well-known/acme-challenge/ziWr--RAg3dYNucCUNNHMJt0nzN5KBueFLRBKI6_K84', 'utf-8', (err, data) => {
      if(err) {
        console.log('error: ', err);
      } else {
        console.log(data);
        res.send(data)
      }
    });
}
module.exports.createView = function (req,res) {
    res.render('index');
}
module.exports.getUsers = function (req,res) {
    User.find({})
    .exec(function (err,user) {
      if(err) return res.sendStatus(503);
      return res.json(user);
    });
}

module.exports.emailCheck = function (req,res) {
    var data = req.query;
    User.find({email:data.email})
    .exec(function (err,user) {
      if(user) return res.json(user);
    });
}

module.exports.dniCheck = function (req,res) {
    var data = req.query;
    User.find({dni:data.dni})
    .exec(function (err,user) {
      if(user) return res.json(user);
    });
}

module.exports.deleteUsers = function (req,res) {
    User.remove({})
    .exec(function (err,user) {
      if(err) return res.sendStatus(503);
      return res.json(user);
    });
}
