const { ChatModel } = require('../../models/user/conversationModel')

exports.chatWithUs = async (req, res) => {
  try {
    const { userId, message } = req.body

    const chatDetails = await ChatModel({ userId: userId, chat: message })
    await chatDetails.save()
    res.status(200).json({ status: 'Message sent', chatDetails })

  } catch (e) {
    console.log(e.message)
  }
}