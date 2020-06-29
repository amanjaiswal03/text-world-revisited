var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const worldSchema = new Schema({
    id: Number,
    name: String,
    dateCreated: {type: Date, default: Date.now},
    background: String,
    creatorId: String
}, {timestamps: true})
module.exports = mongoose.model('worlds', worldSchema);