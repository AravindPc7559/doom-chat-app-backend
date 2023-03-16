const jwt = require('jsonwebtoken')

const now = new Date()
const oneDayFromNow = Math.floor(now.getTime() / 1000) + 60 * 60 * 24

const createToken = async (email, id, name, number) => {
  return await jwt.sign(
    {
      email,
      id,
      name,
      number,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: oneDayFromNow },
  )
}

module.exports = createToken
