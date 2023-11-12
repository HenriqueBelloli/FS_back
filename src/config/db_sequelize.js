const Sequelize = require('sequelize')
const config = require('./config')

const sequelize = new Sequelize(config.server.dbName, config.server.user, config.server.password, {
  host: config.server.host,
  dialect: 'postgres'
})

var db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.Usuario = require('../api/models/usuario')(sequelize, Sequelize)
db.Conta = require('../api/models/conta')(sequelize, Sequelize)
db.Categoria = require('../api/models/categoria')(sequelize, Sequelize)
db.Movimentacao = require('../api/models/movimentacao')(sequelize, Sequelize)

// Relacionamento entre Conta e Usuario
db.Conta.belongsTo(db.Usuario, {
  as: 'usuario',
  foreignKey: 'usuarioId',
  onDelete: 'CASCADE'
})

// Relacionamento entre Categoria e Usuario
db.Categoria.belongsTo(db.Usuario, {
  as: 'usuario',
  foreignKey: 'usuarioId',
  onDelete: 'CASCADE'
})

// Relacionamento entre Movimentacao e Usuario
db.Movimentacao.belongsTo(db.Usuario, {
  as: 'usuario',
  foreignKey: 'usuarioId',
  onDelete: 'CASCADE'
})

// Relacionamento entre Movimentacao e Conta
db.Movimentacao.belongsTo(db.Conta, {
  as: 'conta',
  foreignKey: 'contaId',
  onDelete: 'CASCADE'
})

// Relacionamento entre Movimentacao e Categoria
db.Movimentacao.belongsTo(db.Categoria, {
  as: 'categoria',
  foreignKey: 'categoriaId',
  onDelete: 'RESTRICT'
})

module.exports = db
