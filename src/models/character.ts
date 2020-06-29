var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const characterSchema = new Schema({
    id: Number,
    name: String,
    dateCreated: {type: Date, default: Date.now},
    background: String,
    creatorId: Number,
    worldId: Number
}, {timestamps: true})

module.exports = mongoose.model('characters', characterSchema);