var Type = require('../collections/type');

module.exports.create= function (req,res) {
    var data = req.body;
    console.log(data);

    var type = new Type();
    type.name = data.name;
    type.amount = data.amount;
    type.save(function (err,type) {
      if(err){
        console.log(err);
        return res.sendStatus(503);
      }
      console.log(type);
      return res.json(200);
    });
}

module.exports.deleteType = function (req,res) {
    Type.remove({})
    .exec(function (err,type) {
      if(err) return res.sendStatus(503);
      return res.json(type);
    });
}
