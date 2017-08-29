var User = require('../collections/user');
var jwt = require('jsonwebtoken');
var verification = require('./verification');
var crypto = require("crypto");



module.exports.register = function (req,res) {
    var token = crypto.randomBytes(20).toString('hex');
    console.log('registrando');
    var params = req.body;
    console.log(req.body);
    var user = new User();

    user.dni = params.dni;
    user.name = params.name;
    user.lastname = params.lastname;
    user.type = params.type;
    user.city = params.city;
    user.email = params.email;
    user.emailToken = token;

    user.save(function (err,user) {
        if(err){
          console.log(err);
          return res.sendStatus(503)
        }
        verification.sendEmail(user);
        console.log(user);
        return res.sendStatus(200);
    });

}

module.exports.createView = function (req,res) {
    res.render('layout');
}
module.exports.getUsers = function (req,res) {
    User.find({})
    .exec(function (err,user) {
      if(err) return res.sendStatus(503);
      return res.json(user);
    });
}
module.exports.deleteUsers = function (req,res) {
    User.remove({})
    .exec(function (err,user) {
      if(err) return res.sendStatus(503);
      return res.json(user);
    });
}
