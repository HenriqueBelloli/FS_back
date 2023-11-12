const express = require('express')
const exceptionHandler = require('express-exception-handler')
exceptionHandler.handle()
const app = express()

app.use(express.json())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))

const requestTrace = require('../api/middlewares/requestsTrace')
app.use(requestTrace)

const { protectRoutes } = require('./config')
const tokenCheck = require('../api/middlewares/tokenCheck')
if (protectRoutes) {
  app.use(tokenCheck)
}

const routes = require('../api/routes/')
const error = require('../api/middlewares/error')

app.use('/', routes)
app.use(error.handler)
app.use(error.notFound)

module.exports = app
