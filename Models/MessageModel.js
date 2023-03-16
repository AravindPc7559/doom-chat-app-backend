const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
    },
    sender: {
      userId: {
        type: String,
      },
      Name: {
        type: String,
      },
    },
    receiver: {
      userId: {
        type: String,
      },
      Name: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  },
)


const messageModel = mongoose.model('Message', messageSchema)

module.exports = messageModel;