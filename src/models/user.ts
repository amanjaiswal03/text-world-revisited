var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
    id: Number,
    email: String,
    password: String,
}, {timestamps: true});
module.exports = mongoose.model('users', userSchema);