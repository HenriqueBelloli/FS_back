const classUsuario = require('../class/usuario')
const responses = require('../helper/responses')

exports.postUsuario = async (req, res) => {
  const { nome, email, senha } = req.body

  if (!nome || !email || !senha) {
    return responses.sendResponse(res, 400, true, 'Campos obrigatórios não informados.', null)
  }

  const dados = { nome, email, senha }

  const result = await classUsuario.usuarioCriar(dados)
  return responses.sendResponse(res, 201, false, 'Usuário criado com sucesso.', result)
}

exports.putUsuario = async (req, res) => {
  const { id } = req.query

  if (!id) {
    return responses.sendResponse(res, 400, true, 'Id não informado.', null)
  }

  const { nome, email, senha } = req.body

  if (!nome && !email && !senha) {
    return responses.sendResponse(
      res,
      400,
      true,
      'Nenhum campo válido informado para atualização.',
      null
    )
  }

  const dados = { id, nome, email, senha }

  const result = await classUsuario.usuarioEditar(dados)

  return responses.sendResponse(res, 200, false, 'OK.', result)
}

exports.getUsuario = async (req, res) => {
  const { id } = req.query

  if (!id) {
    return responses.sendResponse(res, 400, true, 'Id não informado.', null)
  }

  const result = await classUsuario.usuarioConsultar(id)
  return responses.sendResponse(res, 200, false, 'OK.', result)
}

exports.deleteUsuario = async (req, res) => {
  const { id } = req.query

  if (!id) {
    return responses.sendResponse(res, 400, true, 'Id não informado.', null)
  }

  await classUsuario.usuarioDeletar(id)

  return responses.sendResponse(res, 204, false, 'Usuário eliminado com sucesso.', null)
}

exports.getUsuarioBalance = async (req, res) => {
  const { usuarioId, periodo_inicial, periodo_final } = req.query
  if (!usuarioId) {
    return responses.sendResponse(res, 400, true, 'Id não informado.', null)
  }
  const dados = {usuarioId, periodo_inicial, periodo_final}

  const result = await classUsuario.usuarioBalancoCarregar(dados)
  return responses.sendResponse(res, 200, false, 'OK.', result)
}

exports.postUsuarioLogin = async (req, res) => {
  const { email, senha } = req.body

  if (!email || !senha) {
    return responses.sendResponse(res, 400, true, 'Campos obrigatórios não informados.', null)
  }

  const dados = { email, senha }

  const result = await classUsuario.usuarioLogar(dados)
  return responses.sendResponse(res, 200, false, 'OK.', result)}