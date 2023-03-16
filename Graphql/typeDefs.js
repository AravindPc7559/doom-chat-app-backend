const { gql } = require('apollo-server')

const typeDefs = gql`
  input UserInput {
    name: String
    email: String
    password: String
    number: String
    image: String
  }

  type AddUserReturn {
    message: String
    status: String
  }

  input LoginInput {
    email: String
    password: String
  }

  type LoginReturn {
    message: String
    status: String
    token: String!
    id: String!
  }

  input AddContactInput {
    name: String
    number: String
    currentUserId: String
  }

  input sendMessageInput {
    message: String
    senderId: String
    senderName: String
    receiverId: String
    receiverName: String
  }

  type Query {
    getAll: String
  }

  type Mutation {
    AddUser(data: UserInput): AddUserReturn
    LoginUser(data: LoginInput): LoginReturn
    AddContact(data: AddContactInput): AddUserReturn
    SendMessage(data: sendMessageInput): AddUserReturn
  }
`

module.exports = typeDefs
