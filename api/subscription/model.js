const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const subscriptionSchema = new Schema({
    email_address:{type:String, required:true},
    status:{type: String, required: true},
})

const Subscription = mongoose.model('Subscription', subscriptionSchema)
module.exports = Subscription