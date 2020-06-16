var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const storyLineSchema = new Schema({
    id: Number,
    name: String,
    dateCreated: {type: Date, default: Date.now},
    theme: String,
    intro: String,
    posts: [String],
    details:{
        physics: String,
        cosmology: String,
        geography: String,
        culture: String
    }  
})
module.exports = mongoose.model('storyLines', storyLineSchema);