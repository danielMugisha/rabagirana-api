const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema({
    userId: {type:Schema.Types.ObjectId, required:true},
    token: {type:String, required:true},
    createdAt: {type:Number, default: Date.now(), expires: 30*86400},
})

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema)
module.exports = RefreshToken