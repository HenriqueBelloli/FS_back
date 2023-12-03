const logger = require('../helper/logger')
const APIError = require('../errors/api.error')
const db = require('../../config/db_sequelize')

exports.usuarioCriar = async (dados) => {
  // Verifica se já existe um registro com o mesmo e-mail
  const registroExistente = await db.Usuario.findOne({ where: { email: dados.email } })

  if (registroExistente) {
    logger.error('E-mail já cadastrado.')
    throw new APIError(400, 'E-mail já cadastrado.', undefined)
  }

  const novoUsuario = await db.Usuario.create(dados)

  return novoUsuario
}

exports.usuarioEditar = async (dados) => {
  // Verifica se o usuário existe
  const usuario = await db.Usuario.findByPk(dados.id)

  if (!usuario) {
    throw new APIError(404, 'Usuário não localizado', undefined)
  }

  // Cria um objeto com as propriedades que devem ser atualizadas
  const dadosAtualizar = {}

  if (dados.nome) {
    dadosAtualizar.nome = dados.nome
  }

  if (dados.email) {
    const registroExistente = await db.Usuario.findOne({
      where: {
        email: dados.email,
        id: {
          [db.Sequelize.Op.not]: dados.id
        }
      }
    })

    if (registroExistente) {
      logger.error('E-mail já cadastrado.')
      throw new APIError(400, 'E-mail já cadastrado.', undefined)
    }
    dadosAtualizar.email = dados.email
  }

  if (dados.senha) {
    dadosAtualizar.senha = dados.senha
  }

  // Atualiza o registro
  await db.Usuario.update(dadosAtualizar, {
    where: {
      id: dados.id
    }
  })

  // Recarrega os dados do usuário atualizado
  const usuarioAtualizado = await db.Usuario.findByPk(dados.id)

  return usuarioAtualizado
}

exports.usuarioConsultar = async (id) => {
  const usuario = await db.Usuario.findByPk(id)

  if (!usuario) {
    throw new APIError(404, 'Usuário não localizado', undefined)
  }

  return usuario
}

exports.usuarioDeletar = async (id) => {
  // Verifica se o usuário existe
  const usuario = await db.Usuario.findByPk(id)

  if (!usuario) {
    throw new APIError(404, 'Usuário não localizado', undefined)
  }

  await db.Usuario.destroy({
    where: {
      id: id
    }
  })
}

exports.usuarioBalancoCarregar = async (dados) => {
  const usuario = await db.Usuario.findByPk(dados.usuarioId)

  if (!usuario) {
    throw new APIError(404, 'Usuário não localizado', undefined)
  }

  // Consultar e somar o saldo das contas do usuário
  const contasDoUsuario = await db.Conta.findAll({
    attributes: ['saldo'],
    where: { usuarioId: dados.usuarioId }
  })

  let totalSaldo = contasDoUsuario.reduce((total, conta) => total + conta.saldo, 0)
  totalSaldo = parseFloat(totalSaldo)

  const { periodo_inicial, periodo_final } = dados

  // Somar as receitas do período
  const totalReceitas = await db.Movimentacao.sum('valor', {
    where: {
      usuarioId: dados.usuarioId,
      tipo: 1,
      data: {
        [db.Sequelize.Op.between]: [periodo_inicial, periodo_final]
      }
    }
  }) || 0

  // Somar as despesas do período
  const totalDespesas = await db.Movimentacao.sum('valor', {
    where: {
      usuarioId: dados.usuarioId,
      tipo: 2,
      data: {
        [db.Sequelize.Op.between]: [periodo_inicial, periodo_final]
      }
    }
  }) || 0

  return {
    totalSaldo,
    totalReceitas,
    totalDespesas
  }
}
