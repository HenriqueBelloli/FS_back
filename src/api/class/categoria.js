const logger = require('../helper/logger')
const APIError = require('../errors/api.error')
const db = require('../../config/db_sequelize')

exports.categoriaCriar = async (dados) => {
  // Verifica se o usuário existe
  const usuario = await db.Usuario.findByPk(dados.usuarioId)

  if (!usuario) {
    throw new APIError(400, 'Usuário não localizado', undefined)
  }

  // Verifica se já existe um registro com mesma descrição
  const registroExistente = await db.Categoria.findOne({
    where: { usuarioId: dados.usuarioId, descricao: dados.descricao, tipo: dados.tipo }
  })

  if (registroExistente) {
    logger.error('Já existe categoria cadastrada com mesma descrição.')
    throw new APIError(400, 'categoria já cadastrado.', undefined)
  }

  const novaCategoria = await db.Categoria.create(dados)

  return novaCategoria
}

exports.categoriaEditar = async (dados) => {
  // Verifica se o registro existe
  const categoria = await db.Categoria.findByPk(dados.id)

  if (!categoria) {
    throw new APIError(404, 'Categoria não localizada', undefined)
  }

  // Cria um objeto com as propriedades que devem ser atualizadas
  const dadosAtualizar = {}

  if (dados.descricao) {
    dadosAtualizar.descricao = dados.descricao
  }

  // Atualiza o registro
  await db.Categoria.update(dadosAtualizar, {
    where: {
      id: dados.id
    }
  })

  // Recarrega os dados do registro atualizado
  const categoriaAtualizada = await db.Categoria.findByPk(dados.id)

  return categoriaAtualizada
}

exports.categoriaConsultar = async (id) => {
  const categoria = await db.Categoria.findByPk(id)

  if (!categoria) {
    throw new APIError(404, 'Categoria não localizada', undefined)
  }

  return categoria
}

exports.categoriaDeletar = async (id) => {
  // Verifica se o registro existe
  const categoria = await db.Categoria.findByPk(id)

  if (!categoria) {
    throw new APIError(404, 'Categoria não localizada', undefined)
  }

  await db.Categoria.destroy({
    where: {
      id: id
    }
  })
}
exports.usuarioCategoriasCarregar = async (usuarioId, tipo) => {
  const categorias = await db.Categoria.findAll({
    where: { usuarioId: usuarioId, tipo: tipo },
    attributes: ['id', 'descricao'],
    order: [
      ['descricao', 'ASC'] // ASC para ordenação crescente, DESC para ordenação decrescente
    ]
  })
  return categorias
}
