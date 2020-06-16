var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
    id: Number,
    email: String,
    password: String,
    dateCreated: {type: Date, default: Date.now}
})
module.exports = mongoose.model('users', userSchema);