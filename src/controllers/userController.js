"use strict";
const formidable = require("formidable");
const fs = require("fs-extra");
const path = require("path");
const randomstring = require("randomstring");
var mongoose = require('mongoose');

var User = require('../collections/user');
var Type = require('../collections/type');
var jwt = require('jsonwebtoken');
var uploaderController = require('./uploader');
var mail = require('./mail');
var multer = require ('multer');


module.exports.register = function (req,res) {
    //console.log('registrando',req.files);
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      let data = fields;

      Type.findOne({_id:data.type})
      .exec(function (err,type) {
        if(type){
          var user = new User();

          data.photo = path.join("uploads/", files.photo.name);
          console.log(data);

          user.dni = data.dni;
          user.name = data.name;
          user.lastname = data.lastname;
          user.type = mongoose.Types.ObjectId(data.type);
          user.discount = data.discount? data.discount : 0;
          user.debt = type.amount - user.discount;
          user.city = data.city;
          user.email = data.email;
          user.cellphone = data.cellphone;
          user.eventType = data.eventType;
          user.photo = data.photo;

          user.save(function (err,user) {
              if(err){
                console.log(err);
                return res.sendStatus(503)
              }
              user.title = "XVIII Congreso Internacional de Informatica y Sistemas-TACNA";
              user.date = "13 al 17 de Noviembre";
              //mail.sendEmail(user);
              console.log(user);
              return res.json(200);
          });
        }
      });


      // Photo.create(data)
      //   .then((err,result) => {
      //     if(err) return res.status(500).send(err);
      //     data.type = "";
      //     console.log(result);
      //     return res.send();
      //   });
    });
    form.on("error", function(err) {
      return res.send(null, 500);
    });

    form.on("fileBegin", function(name, file) {
      let rdName = randomstring.generate();
      rdName = rdName.replace("/", "");
      let originalName = file.name;
      file.name = rdName + path.extname(originalName);
    });

    form.on("end", function(fields, files) {
      const temp_path = this.openedFiles[0].path;
      const file_name = this.openedFiles[0].name;
      const new_location = path.join(__dirname, "../public/uploads/", file_name);

      fs.copy(temp_path, new_location, function(err) {
        if (err) {
          console.error(err);
        } else {
          console.log("success!")
        }
      });
    });
}

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
  Type.find({})
  .exec(function (err,type) {
    if(err) return res.sendStatus(503);
    res.render('index', { types: type });
  });
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

module.exports.listUser = function (req,res) {

  User.find({})
  .exec(function (err,user) {
    if(err) return res.sendStatus(503);
    res.render('test',{'user':user});
  });
}


module.exports.deleteUsers = function (req,res) {
    User.remove({})
    .exec(function (err,user) {
      if(err) return res.sendStatus(503);
      return res.json(user);
    });
}
