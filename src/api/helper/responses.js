/* Função genérica para retorno das requisições */
const logger = require('./logger')

exports.sendResponse = (res, statusCodigo, erro, mensagem, dados) => {
  let response = {
    error: erro ? true : false,
    message: mensagem
  }

  if (dados) {
    response.data = dados
  }

  logger.trace('Retono: ' + statusCodigo + '. ' + JSON.stringify(response))

  return res.status(statusCodigo).json(response)
}
