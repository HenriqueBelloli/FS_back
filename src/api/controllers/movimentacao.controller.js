const classMovimentacao = require('../class/movimentacao')
const responses = require('../helper/responses')

exports.postMovimentacao = async (req, res) => {
  const { usuarioId, tipo, descricao, data, valor, contaId, categoriaId } = req.body

  if (!usuarioId || !tipo || !descricao || !data || !valor || !contaId || !categoriaId) {
    return responses.sendResponse(res, 400, true, 'Campos obrigatórios não informados.', null)
  }

  if (tipo !== 1 && tipo !== 2) {
    return responses.sendResponse(res, 400, true, 'Tipo informado não é válido.', null)
  }

  const dados = { usuarioId, tipo, descricao, data, valor, contaId, categoriaId }

  const result = await classMovimentacao.movimentacaoCriar(dados)
  return responses.sendResponse(res, 201, false, 'Movimentação criada com sucesso.', result)
}

exports.putMovimentacao = async (req, res) => {
  const { id } = req.query

  if (!id) {
    return responses.sendResponse(res, 400, true, 'Id não informado.', null)
  }

  const { tipo, descricao, data, valor, usuarioId, contaId, categoriaId } = req.body

  if (usuarioId) {
    return responses.sendResponse(res, 400, true, 'Não é permitido alterar o usuário.', null)
  }

  if (tipo) {
    return responses.sendResponse(res, 400, true, 'Não é permitido alterar o tipo.', null)
  }

  if (!descricao && !descricao && !data && !valor && !contaId && !categoriaId) {
    return responses.sendResponse(
      res,
      400,
      true,
      'Nenhum campo válido informado para atualização.',
      null
    )
  }

  const dados = { id, descricao, data, valor, usuarioId, contaId, categoriaId }

  const result = await classMovimentacao.movimentacaoEditar(dados)

  return responses.sendResponse(res, 200, false, 'OK.', result)
}

exports.getMovimentacao = async (req, res) => {
  const { id } = req.query

  if (!id) {
    return responses.sendResponse(res, 400, true, 'Id não informado.', null)
  }

  const result = await classMovimentacao.movimentacaoConsultar(id)
  return responses.sendResponse(res, 200, false, 'OK.', result)
}

exports.deleteCategoria = async (req, res) => {
  const { id } = req.query

  if (!id) {
    return responses.sendResponse(res, 400, true, 'Id não informado.', null)
  }

  await classMovimentacao.movimentacaoDeletar(id)

  return responses.sendResponse(res, 204, false, 'Categoria eliminada com sucesso.', null)
}

exports.getSearchMovimentacao = async (req, res) => {
  const { usuarioId, tipo, periodo_inicial, periodo_final, contaId, categoriaId  } = req.query

  if (!usuarioId) {
    return responses.sendResponse(res, 400, true, 'Id do usuário não informado.', null)
  }

  if (!tipo) {
    return responses.sendResponse(res, 400, true, 'Tipo de movimentação não informado.', null)
  }

  const dados = {usuarioId, tipo, periodo_inicial, periodo_final, contaId, categoriaId}

  const result = await classMovimentacao.movimentacoesConsultar(dados)
  return responses.sendResponse(res, 200, false, 'OK.', result)
}