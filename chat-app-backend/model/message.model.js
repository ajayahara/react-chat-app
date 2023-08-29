const mongoose = require("mongoose")
const messageSchema = new mongoose.Schema({
    chatId:String,
    text:String,
    senderId:String
}, {
    timestamps: true
})
const messageModel = mongoose.model('messages', messageSchema);
module.exports = { messageModel };