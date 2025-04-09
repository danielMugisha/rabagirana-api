const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const resourceSchema = new Schema({
    name:{type:String, required:true, trim: true},
    category:{type: String, required: true, trim: true},
    featuredFile:{type:String, required: true}
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

// Create index for improved query performance
resourceSchema.index({ category: 1 });
resourceSchema.index({ createdAt: -1 });
resourceSchema.index({ name: 'text' });

const Resource = mongoose.model('Resource', resourceSchema)
module.exports = Resource