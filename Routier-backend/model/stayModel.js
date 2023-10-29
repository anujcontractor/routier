const mongoose = require('mongoose');
//const { float } = require('webidl-conversions');
const Schema = mongoose.Schema;

const staySchema = new Schema({
    name:{type: String},
    address:{type: String},
    description:{type: String},
    rating:{type: Number},
    propertyrulesandinfo:{type: String},
    price:{type: Number},
    nearbyplaces:{type: String}
}, {timestamps: true})

const Stay = mongoose.model('Stay', staySchema)
module.exports = Stay