var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
    email: String,
    name: String,
    lastname: String,
    city: String,
    dni: String,
    type: String,
    createdAt:{ type: Date, default: Date.now}
});

module.exports = mongoose.model('User',userSchema);
