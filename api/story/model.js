const mongoose = require('mongoose')
const Schema = mongoose.Schema

const storySchema = new Schema({
    title:{type:String, required:true, trim: true},
    summary:{type: String, required: true, trim: true},
    content:{type: String, required: true, trim: true},
    author:{type: String, required: true, trim: true},
    featuredImage:{type: String, required: true},
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

// Create index for improved query performance
storySchema.index({ createdAt: -1 });
storySchema.index({ title: 'text', summary: 'text', content: 'text' });

const Story = mongoose.model('Story', storySchema);
module.exports = Story;