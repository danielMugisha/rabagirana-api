const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const eventSchema = new Schema({
    title:{type:String, required:true, trim: true},
    startDate:{type: Number, required: true},
    endDate:{type: Number, required:true},
    registrationForm:{type: String, trim: true},
    featuredImage:{type: String, required: true},
    featuredPdf:{type: String, required: true}
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

// Create index for improved query performance
eventSchema.index({ startDate: 1 });
eventSchema.index({ endDate: 1 });
eventSchema.index({ title: 'text' });

const Event = mongoose.model('Event', eventSchema)
module.exports = Event