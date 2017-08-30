var User = require('../collections/user');
var jwt = require('jsonwebtoken');
var mail = require('./mail');



module.exports.register = function (req,res) {
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
    user.cellphone = params.cellphone;

    user.save(function (err,user) {
        if(err){
          console.log(err);
          return res.sendStatus(503)
        }
        mail.sendEmail(user);
        console.log(user);
        return res.sendStatus(200);
    });

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
