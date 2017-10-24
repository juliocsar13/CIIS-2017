var Type = require('../collections/type');
var User = require('../collections/user');
var Payment = require('../collections/payment');
var mongoose = require('mongoose');

module.exports.create= function (req,res) {
    var data = req.body;
    console.log(data);

    var payment = new Payment();
    payment.user_id = mongoose.Types.ObjectId(data.user);
    payment.quantity = data.quantity;
    payment.save(function (err,payment) {
      if(err){
        console.log(err);
        return res.sendStatus(503);
      }
      if (payment) {
        User.findOne({_id:data.user})
        .exec(function (err,user) {
          if(err) return res.sendStatus(503);
          if (user) {
            user.debt -= payment.quantity;
            user.save(function (err,user) {
                if(err){
                  console.log(err);
                  return res.sendStatus(503)
                }
                console.log(user);
                return res.json(user);
            });
          }
        });
      }
    });
}

module.exports.getPayment = function (req,res) {
    Payment.find({})
    .exec(function (err,payment) {
      if(err) return res.sendStatus(503);
      return res.json(payment);
    });
}

module.exports.deletePayment = function (req,res) {
    Payment.remove({})
    .exec(function (err,payment) {
      if(err) return res.sendStatus(503);
      return res.json(payment);
    });
}
