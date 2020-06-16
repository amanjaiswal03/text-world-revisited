var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const worldSchema = new Schema({
    id: Number,
    name: String,
    dateCreated: {type: Date, default: Date.now},
    majorEvents: [String],
    details:{
        physics: String,
        cosmology: String,
        geography: String,
        culture: String
    }  
})
module.exports = mongoose.model('worlds', worldSchema);