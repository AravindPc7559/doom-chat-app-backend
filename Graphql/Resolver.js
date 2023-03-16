const userModel = require('../Models/UserModel')
const bcrypt = require('bcrypt')
const cloudinary = require('../Utils/Cloudinary')
const createToken = require('../Utils/JWT')
const messageModel = require('../Models/MessageModel')

const Resolvers = {
  Query: {
    getAll: async () => {
      return 'Aravind'
    },
  },
  Mutation: {
    // Creating a new user
    AddUser: async (parent, args, context, info) => {
      const { name, email, password, number, image } = args.data

      try {
        // Checking that if the email and number is exist in db or not.
        const checkEmail = await userModel.findOne({ email })
        const checkNumber = await userModel.findOne({ number })
        let imageRes
        let data

        // If the email and number is not exist in db, then create the user.
        if (checkEmail) {
          return {
            message: 'Email already exist!',
            status: 'error',
          }
        } else if (checkNumber) {
          return {
            message: 'Number already exist!',
            status: 'error',
          }
        } else {
          //hashing the password
          const hashedPassword = await bcrypt.hash(password, 10)
          // if the image is not null, then upload the image to cloudinary
          if (image !== '') {
            imageRes = await cloudinary.uploader.upload(image, {
              folder: 'Chat-App-User-Images',
            })

            data = await userModel.create({
              email,
              name,
              number,
              password: hashedPassword,
              image: {
                public_id: imageRes.public_id,
                url: imageRes.secure_url,
              },
            })
          } else {
            data = await userModel.create({
              email,
              name,
              number,
              password: hashedPassword,
            })
          }

          if (data) {
            return {
              message: 'user created successfully',
              status: 'success',
            }
          } else {
            return {
              message: 'user created failed',
              status: 'error',
            }
          }
        }
      } catch (error) {
        return {
          message: 'something went wrong',
          status: 'error',
        }
      }
    },
    // Login a user
    LoginUser: async (parent, args, context, info) => {
      // destructuring the email and password from the args
      const { email, password } = args.data
      try {
        // Getting details of the user from the db
        const checkEmail = await userModel.findOne({ email })

        if (checkEmail) {
          // if the user exists in the db, then check the password
          if (bcrypt.compareSync(password, checkEmail.password)) {
            // if the password is correct, then create a token
            const token = createToken(
              checkEmail.email,
              checkEmail._id,
              checkEmail.name,
              checkEmail.number,
            )

            // Returning the details of the user
            return {
              status: 'success',
              message: 'login successful',
              token,
              id: checkEmail._id,
            }
          } else {
            // if the password is incorrect, then return an error
            return {
              status: 'error',
              message: 'Password is incorrect',
              token: '',
              id: '',
            }
          }
        } else {
          // if the user does not exist in the db, then return an error
          return {
            status: 'error',
            message: 'Email does not exist',
            token: '',
            id: '',
          }
        }
      } catch (error) {
        // Something went wrong we will return an error
        return {
          status: 'error',
          message: 'something went wrong',
          token: '',
          id: '',
        }
      }
    },
    // Add Contacts
    AddContact: async (parent, args, context, info) => {
      const { name, number, currentUserId } = args.data

      try {
        const data = await userModel.findByIdAndUpdate(currentUserId, {
          $push: { contacts: { name, number } },
        })

        if (data) {
          return {
            status: 'success',
            message: 'contact added successfully',
          }
        } else {
          return {
            status: 'error',
            message: 'contact added failed',
          }
        }
      } catch (error) {
        return {
          status: 'error',
          message: 'something went wrong',
        }
      }
    },
    // Send Message
    SendMessage: async (parent, args, context, info) => {
      try {
        const {
          message,
          senderId,
          senderName,
          receiverId,
          receiverName,
        } = args.data

        const sendMessage = await messageModel.create({
          message,
          sender: {
            userId: senderId,
            Name: senderName,
          },
          receiver: {
            userId: receiverId,
            Name: receiverName,
          },
        })

        if (sendMessage) {
          return {
            message: 'message sent successfully',
            status: 'success',
          }
        } else {
          return {
            message: 'message sent failed',
            status: 'error',
          }
        }
      } catch (error) {
        return {
          message: 'message sent successfully',
          status: 'success',
        }
      }
    },
  },
}

module.exports = Resolvers
