const logger = require('../helper/logger')
const APIError = require('../errors/api.error')
const db = require('../../config/db_sequelize')

exports.contaCriar = async (dados) => {
  // Verifica se o usuário existe
  const usuario = await db.Usuario.findByPk(dados.usuarioId)

  if (!usuario) {
    throw new APIError(400, 'Usuário não localizado', undefined)
  }
  // Verifica se já existe um registro com mesma descrição
  const registroExistente = await db.Conta.findOne({
    where: { descricao: dados.descricao, usuarioId: dados.usuarioId }
  })

  if (registroExistente) {
    logger.error('Já existe conta cadastrada com mesma descrição.')
    throw new APIError(400, 'Descricao já cadastrado.', undefined)
  }

  const novaConta = await db.Conta.create(dados)

  return novaConta
}

exports.contaEditar = async (dados) => {
  // Verifica se o registro existe
  const conta = await db.Conta.findByPk(dados.id)

  if (!conta) {
    throw new APIError(404, 'Conta não localizada', undefined)
  }

  // Cria um objeto com as propriedades que devem ser atualizadas
  const dadosAtualizar = {}

  if (dados.descricao) {
    dadosAtualizar.descricao = dados.descricao
  }

  // Atualiza o registro
  await db.Conta.update(dadosAtualizar, {
    where: {
      id: dados.id
    }
  })

  // Recarrega os dados da conta atualizada
  const contaAtualizada = await db.Conta.findByPk(dados.id)

  return contaAtualizada
}

exports.contaConsultar = async (id) => {
  const conta = await db.Conta.findByPk(id)

  if (!conta) {
    throw new APIError(404, 'Conta não localizada', undefined)
  }

  return conta
}

exports.contaDeletar = async (id) => {
  // Verifica se o registro existe
  const conta = await db.Conta.findByPk(id)

  if (!conta) {
    throw new APIError(404, 'Conta não localizada', undefined)
  }

  await db.Conta.destroy({
    where: {
      id: id
    }
  })
}

exports.usuarioCategoriasCarregar = async (usuarioId) => {
  const contas = await db.Conta.findAll({
    where: { usuarioId: usuarioId},
    attributes: ['id', 'descricao', 'saldo']
  })
  return contas
}