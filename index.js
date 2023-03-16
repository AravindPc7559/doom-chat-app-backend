const express = require('express')
const cors = require('cors')
const { ApolloServer, gql } = require('apollo-server')
const typeDefs = require('./Graphql/typeDefs')
const resolvers = require('./Graphql/Resolver')

const dotenv = require('dotenv')
const Connection = require('./Connection/Mongodb')
dotenv.config()

// Mongodb connection
Connection()

const app = express()
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(
  express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }),
)

const server = new ApolloServer({ typeDefs, resolvers })

app.use(function (req, res, next) {
  next(createError(404))
})

app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})

server.listen(port).then(({ url }) => {
  console.log(`��� Server ready at  ${url}`)
})
