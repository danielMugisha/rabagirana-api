const mongoose = require('mongoose')
const Schema = mongoose.Schema

const storySchema = new Schema({
    title:{type:String, required:true},
    summary:{type: String, required: true},
    content:{type: String, required: true},
    author:{type: String, required: true},
    createdAt: {type: Number, default: Date.now()},
    featuredImage:String
})

const Story = mongoose.model('Story', storySchema);
module.exports = Story;