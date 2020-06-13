var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
    id: Number,
    userName: String,
    email: String,
    password: String,
    dateCreated: {type: Date, default: Date.now},
    characterId: String
})