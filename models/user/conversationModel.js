const mongoose = require('mongoose')

const conversationSchema = mongoose.Schema({
    userId: {
        type: String,
    },
    socketId: {
        type: String,
    },
    chat: {
        type: String,
    }
},
    {
        timestamp: true
    }
)

exports.ChatModel = mongoose.model('conversation', conversationSchema)
