const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

const contactsRouter = require('./routes/api/contacts')

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

app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not found',
  })
})

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : 500
  res.status(err.status).json({
    status: err.status === 500 ? 'fail' : 'error',
    code: err.status,
    message: err.message,
    data: err.status === 500 ? 'Internal Server Error' : err.data,
  })
})

module.exports = app
