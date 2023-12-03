const APIError = require('../errors/api.error')
const db = require('../../config/db_sequelize')

exports.movimentacaoCriar = async (dados) => {
  // Verifica se o usuário existe
  const usuario = await db.Usuario.findByPk(dados.usuarioId)

  if (!usuario) {
    throw new APIError(400, 'Usuário não localizado', undefined)
  }

  // Verifica se a conta existe
  const conta = await db.Conta.findByPk(dados.contaId)

  if (!conta) {
    throw new APIError(400, 'Conta não localizada', undefined)
  }

  if (conta.usuarioId != dados.usuarioId) {
    throw new APIError(400, 'Conta não pertence ao usuário informado', undefined)
  }

  //Verifica se a categoria existe
  const categoria = await db.Categoria.findByPk(dados.categoriaId)

  if (!categoria) {
    throw new APIError(400, 'Categoria não localizada', undefined)
  }

  if (categoria.usuarioId != dados.usuarioId) {
    throw new APIError(400, 'Categoria não pertence ao usuário informado', undefined)
  }

  if (categoria.tipo != dados.tipo) {
    throw new APIError(400, 'Categoria inválida para o tipo de movimento informado', undefined)
  }

  const novaMovimentacao = await db.Movimentacao.create(dados)

  return novaMovimentacao
}

exports.movimentacaoEditar = async (dados) => {
  // Verifica se o registro existe
  const movimentacao = await db.Movimentacao.findByPk(dados.id)

  if (!movimentacao) {
    throw new APIError(404, 'Movimentacao não localizada', undefined)
  }

  // Cria um objeto com as propriedades que devem ser atualizadas
  const dadosAtualizar = {}

  if (dados.descricao) {
    dadosAtualizar.descricao = dados.descricao
  }

  if (dados.data) {
    dadosAtualizar.data = dados.data
  }

  if (dados.valor) {
    dadosAtualizar.valor = dados.valor
  }

  if (dados.contaId) {
    // Verifica se a conta existe
    const conta = await db.Conta.findByPk(dados.contaId)

    if (!conta) {
      throw new APIError(400, 'Conta não localizada', undefined)
    }

    if (conta.usuarioId != movimentacao.usuarioId) {
      throw new APIError(400, 'Conta não pertence ao usuário informado', undefined)
    }

    dadosAtualizar.contaId = dados.contaId
  }

  if (dados.categoriaId) {
    //Verifica se a categoria existe
    const categoria = await db.Categoria.findByPk(dados.contaId)

    if (!categoria) {
      throw new APIError(400, 'Categoria não localizada', undefined)
    }

    if (categoria.usuarioId != movimentacao.usuarioId) {
      throw new APIError(400, 'Categoria não pertence ao usuário informado', undefined)
    }

    if (categoria.tipo != dados.tipo ? dados.tipo : movimentacao.tipo) {
      throw new APIError(400, 'Categoria inválida para o tipo de movimento informado', undefined)
    }

    dadosAtualizar.categoriaId = dados.categoriaId
  }

  // Atualiza o registro
  await db.Movimentacao.update(dadosAtualizar, {
    where: {
      id: dados.id
    }
  })

  // Recarrega os dados do registro atualizado
  const MovimentacaoAtualizada = await db.Movimentacao.findByPk(dados.id)

  return MovimentacaoAtualizada
}

exports.movimentacaoConsultar = async (id) => {
  const movimentacao = await db.Movimentacao.findByPk(id)

  if (!movimentacao) {
    throw new APIError(404, 'Movimentação não localizada', undefined)
  }

  return movimentacao
}

exports.movimentacaoDeletar = async (id) => {
  // Verifica se o registro existe
  const movimentacao = await db.Movimentacao.findByPk(id)

  if (!movimentacao) {
    throw new APIError(404, 'Movimentação não localizada', undefined)
  }

  await db.Movimentacao.destroy({
    where: {
      id: id
    }
  })
}

exports.movimentacoesConsultar = async (dados) => {
  let condicaoWhere = {}

  condicaoWhere.usuarioId = dados.usuarioId
  condicaoWhere.tipo = dados.tipo
  
  if (dados.periodo_inicial && dados.periodo_final) {
    condicaoWhere.data = {
      [db.Sequelize.Op.between]: [dados.periodo_inicial, dados.periodo_final]
    }
  }

  if (dados.contaId) {
    condicaoWhere.contaId = dados.contaId
  }

  if (dados.categoriaId) {
    condicaoWhere.categoriaId = dados.categoriaId
  }

  const movimentacoes = await db.Movimentacao.findAll({
    where: condicaoWhere,
    attributes: ['id', 'descricao', 'data', 'valor', 'tipo'],
    include: [
      {
        model: db.Conta,
        attributes: ['id', 'descricao'],
        as: 'conta'
      },
      {
        model: db.Categoria,
        attributes: ['id', 'descricao'],
        as: 'categoria'
      }
    ],
    order: [
      ['data', 'ASC'] // ASC para ordenação crescente, DESC para ordenação decrescente
    ]
  })

  return movimentacoes
}
