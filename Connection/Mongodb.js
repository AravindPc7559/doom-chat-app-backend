const mongoose = require('mongoose')

const Connection = async() => {
  await mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch((err) => {
      console.log('Mongodb Connection Error: ' + err)
    })
}

module.exports = Connection
