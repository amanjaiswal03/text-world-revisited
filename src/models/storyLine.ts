var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const storyLineSchema = new Schema({
    id: Number,
    creatorId: Number,
    type: {type: String, enum: ['General', 'StoryLine']},
    title: String,
    detail: String,
    storyLineId: Number,
}, {timestamps: true})
module.exports = mongoose.model('storyLines', storyLineSchema);