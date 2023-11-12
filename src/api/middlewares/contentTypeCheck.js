const responses = require('../helper/responses')

function contentTypeVerification(req, res, next) {
  const contentType = req.headers['content-type']

  if (contentType !== 'application/json' && contentType !== 'application/x-www-form-urlencoded') {
    return responses.sendResponse(res, 400, true, 'invalid contentType', null)
  }

  next()
}

module.exports = contentTypeVerification
