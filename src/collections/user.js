var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var userSchema = new Schema({
    email: {type:String, unique:true},
    name: String,
    lastname: String,
    city: String,
    cellphone: String,
    dni: {type:String, unique:true},
    type: {type: Schema.ObjectId, ref: 'Type'},
    debt:{type:SchemaTypes.Double},
    discount:{type:SchemaTypes.Double},
    eventType: String,
    photo:String,
    createdAt:{ type: Date, default: Date.now}
});

module.exports = mongoose.model('User',userSchema);
