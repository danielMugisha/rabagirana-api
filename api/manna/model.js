const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const mannaSchema = new Schema({
    title:{type:String, required:true},
    summary:{type: String, required: true},
    content:{type: String, required: true},
    author:{type: String, required: true},
    createdAt: {type: Number, default: Date.now()},
    featuredImage:String
})

const Manna = mongoose.model('Manna', mannaSchema)
module.exports = Manna