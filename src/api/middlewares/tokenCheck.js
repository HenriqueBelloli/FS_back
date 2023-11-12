const config = require('../../config/config')
const responses = require('../helper/responses')

function tokenVerification(req, res, next) {
  const bearer = req.headers.authorization
  const token = bearer?.slice(7)?.toString()

  /* Rotas que podem passar pela validação */
  const lStatus = req.path === '/status'

  if (!token && !lStatus) {
    return responses.sendResponse(res, 401, true, 'no bearer token header was present', null)
  }

  if (token && config.token !== token) {
    return responses.sendResponse(res, 403, true, 'invalid bearer token supplied', null)
  }

  next()
}

module.exports = tokenVerification
