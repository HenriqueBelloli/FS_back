const classCategoria = require('../class/categoria')
const responses = require('../helper/responses')

exports.postCategoria = async (req, res) => {
  const { usuarioId, descricao, tipo } = req.body

  if (!usuarioId || !descricao || !tipo) {
    return responses.sendResponse(res, 400, true, 'Campos obrigatórios não informados.', null)
  }

  if (tipo !== 1 && tipo !== 2) {
    return responses.sendResponse(res, 400, true, 'Tipo informado não é válido.', null)
  }

  const dados = { usuarioId, descricao, tipo }

  const result = await classCategoria.categoriaCriar(dados)
  return responses.sendResponse(res, 201, false, 'Categoria criada com sucesso.', result)
}

exports.putCategoria = async (req, res) => {
  const { id } = req.query

  if (!id) {
    return responses.sendResponse(res, 400, true, 'Id não informado.', null)
  }

  const { descricao, tipo, usuarioId } = req.body

  if (usuarioId) {
    return responses.sendResponse(res, 400, true, 'Não é permitido alterar o usuário.', null)
  }

  if (tipo) {
    return responses.sendResponse(
      res,
      400,
      true,
      'Não é permitido alterar o tipo da categoria.',
      null
    )
  }

  if (!descricao) {
    return responses.sendResponse(
      res,
      400,
      true,
      'Nenhum campo válido informado para atualização.',
      null
    )
  }

  const dados = { id, descricao }

  const result = await classCategoria.categoriaEditar(dados)

  return responses.sendResponse(res, 200, false, 'OK.', result)
}

exports.getCategoria = async (req, res) => {
  const { id } = req.query

  if (!id) {
    return responses.sendResponse(res, 400, true, 'Id não informado.', null)
  }

  const result = await classCategoria.categoriaConsultar(id)
  return responses.sendResponse(res, 200, false, 'OK.', result)
}

exports.deleteCategoria = async (req, res) => {
  const { id } = req.query

  if (!id) {
    return responses.sendResponse(res, 400, true, 'Id não informado.', null)
  }

  await classCategoria.categoriaDeletar(id)

  return responses.sendResponse(res, 204, false, 'Categoria eliminada com sucesso.', null)
}
