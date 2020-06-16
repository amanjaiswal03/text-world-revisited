var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const postSchema = new Schema({
    id: Number,
    title: String,
    detail: String,
    dateCreated: {type: Date, default: Date.now},
    type: {type: String, enum: ['storyLine', 'journal']},
    creatorId: String,
    storyLineId: String 
})

module.exports = mongoose.model('posts', postSchema);
