var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const postSchema = new Schema({
    id: Number,
    name: String,
    dateCreated: {type: Date, default: Date.now},
    type: {type: String, enum: ['storyLine', 'journal']},
    characterId: String,
    storyLineId: String 
})