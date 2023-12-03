const classConta = require('../class/conta')
const responses = require('../helper/responses')

exports.postConta = async (req, res) => {
  const { descricao, usuarioId, saldo } = req.body

  if (!descricao || !usuarioId) {
    return responses.sendResponse(res, 400, true, 'Campos obrigatórios não informados.', null)
  }

  const dados = { descricao, usuarioId, saldo }

  const result = await classConta.contaCriar(dados)
  return responses.sendResponse(res, 201, false, 'Conta criada com sucesso.', result)
}

exports.putConta = async (req, res) => {
  const { id } = req.query

  if (!id) {
    return responses.sendResponse(res, 400, true, 'Id não informado.', null)
  }

  const { descricao, saldo, usuarioId } = req.body

  if(saldo){
    return responses.sendResponse(res, 400, true, 'Não é permitido editar o saldo do cadastro.', null)
  }

  if(usuarioId){
    return responses.sendResponse(res, 400, true, 'Não é permitido alterar o usuário.', null)
  }

  if (!descricao) {
    return responses.sendResponse(res, 400, true, 'Nenhum campo válido informado para atualização.', null)
  }

  const dados = { id, descricao }

  const result = await classConta.contaEditar(dados)

  return responses.sendResponse(res, 200, false, 'OK.', result)
}

exports.getConta = async (req, res) => {
  const { id } = req.query

  if (!id) {
    return responses.sendResponse(res, 400, true, 'Id não informado.', null)
  }

  const result = await classConta.contaConsultar(id)
  return responses.sendResponse(res, 200, false, 'OK.', result)
}

exports.deleteConta = async (req, res) => {
  const { id } = req.query

  if (!id) {
    return responses.sendResponse(res, 400, true, 'Id não informado.', null)
  }
  
  await classConta.contaDeletar(id)

  return responses.sendResponse(res, 204, false, 'Conta eliminada com sucesso.', null)
}

exports.getContasUsuario = async (req, res) => {
  const {usuarioId } = req.query

  if (!usuarioId) {
    return responses.sendResponse(res, 400, true, 'Usuário não informado.', null)
  }

  const result = await classConta.usuarioContasCarregar(usuarioId)
  return responses.sendResponse(res, 200, false, 'OK.', result)
}