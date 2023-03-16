const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  contacts: [
    {
      name: {
        type: String,
      },
      number: {
        type: String,
      },
    },
  ],
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel
