const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

const contactsRouter = require('./routes/api/contacts')
const { errorHandler } = require('./helpers/apiHelpers.js')
const { notFoundHandler } = require('./helpers/apiHelpers.js')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use('/api/contacts', contactsRouter)

app.use(notFoundHandler)
app.use(errorHandler)

module.exports = app
