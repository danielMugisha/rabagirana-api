const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const resourceSchema = new Schema({
    name:{type:String, required:true},
    category:{type: String, required: true},
    featuredFile:String
})

const Resource = mongoose.model('Resource', resourceSchema)
module.exports = Resource