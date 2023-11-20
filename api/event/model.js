const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const eventSchema = new Schema({
    title:{type:String, required:true},
    summary:{type: String, required: true},
    startDate:{type: Number, required: true},
    endDate:{type: Number, required:true},
    registrationForm : String,
    featuredImage: String,
    featuredPdf: String,
    createdAt: {type: Number, default: Date.now()}
})

const Event = mongoose.model('Event', eventSchema)
module.exports = Event