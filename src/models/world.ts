var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const worldSchema = new Schema({
    id: Number,
    name: String,
    dateCreated: {type: Date, default: Date.now},
    background: String,
    creatorId: String
})
module.exports = mongoose.model('worlds', worldSchema);