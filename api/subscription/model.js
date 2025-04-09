const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const subscriptionSchema = new Schema({
    email_address:{type:String, required:true, trim: true, unique: true},
    status:{type: String, required: true, trim: true},
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

// Create index for improved query performance
subscriptionSchema.index({ email_address: 1 }, { unique: true });

const Subscription = mongoose.model('Subscription', subscriptionSchema)
module.exports = Subscription