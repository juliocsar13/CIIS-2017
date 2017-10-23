var User = require('../collections/user');
var Assist = require('../collections/assist');

module.exports.create= function (req,res) {
    var data = req.query;
    console.log(data);

    User.findOne({dni:data.dni})
    .exec(function (err,user) {
      if(user) {
        var assist = new Assist();
        assist.user_id = user._id;
        var today = new Date();
        assist.createdAt = today.setHours(today.getHours()-5);
        assist.save(function (err,assist) {
          if(err){
            console.log(err);
            return res.sendStatus(503);
          }
          console.log(assist);
          return res.json(200);
        });
      }
    });
}

module.exports.getAssist = function (req,res) {

  var data = req.query;
  console.log(data);

  User.findOne({dni:data.dni})
  .exec(function (err,user) {
    if(user) {
      Assist.find({user_id:user._id})
      .exec(function (err,assist){
          return res.json(assist);
      });
    }
  });
}


module.exports.getDay = function (req,res) {

  var data = req.query;
  console.log(data);

  User.findOne({dni:data.dni})
  .exec(function (err,user) {
    if(user) {
      Assist.find({user_id:user._id})
      .exec(function (err,assist){
        console.log(assist);
        
          var days=[];
          assist.map(function(value){
            days.push(value.createdAt.getDate());
          });

          var assist_day = days.filter(function(item, pos) {
              return days.indexOf(item) == pos;
          })
          return res.json(assist_day);
      });
    }
  });
}


module.exports.deleteAssist = function (req,res) {
    Assist.remove({})
    .exec(function (err,assist) {
      if(err) return res.sendStatus(503);
      return res.json(assist);
    });
}
