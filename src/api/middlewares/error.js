/* eslint-disable no-unused-vars */
const APIError = require('../errors/api.error')
const responses = require('../helper/responses')
const logger = require('../helper/logger')

const handler = (err, req, res, next) => {
  let statusCode = err.status ? err.status : 500
  let message = err.message

  if (err.originError) {
    statusCode = err.originError.status ? err.originError.status : statusCode
    message = err.originError.message ? err.originError.message : message
  }

  logger.debug('Erro: ' + statusCode + '. Message: ' + message)
  responses.sendResponse(res, statusCode, true, message)
}

exports.handler = handler

exports.notFound = (req, res, next) => {
  const err = new APIError(404, 'Route not found', undefined)

  return handler(err, req, res)
}
