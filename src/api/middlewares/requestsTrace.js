const logger = require('../helper/logger')

function requestsTrace(req, res, next) {
  logger.trace(`Received request: ${req.method} ${req.url}`)
  next()
}

module.exports = requestsTrace
