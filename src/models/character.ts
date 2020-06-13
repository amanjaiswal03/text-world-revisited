var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const characterSchema = new Schema({
    id: Number,
    name: String,
    dateCreated: {type: Date, default: Date.now},
    background: String,
    worldId: Number,
    storyLineId: Number 
})