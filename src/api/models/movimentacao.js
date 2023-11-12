module.exports = (sequelize, Sequelize) => {
  const Movimentacao = sequelize.define('movimentacao', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    tipo: {
      type: Sequelize.INTEGER, //1: receita, 2: despesa
      allowNull: false
    },
    descricao: {
      type: Sequelize.STRING,
      allowNull: false
    },
    data: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    valor: {
      type: Sequelize.DECIMAL,
      allowNull: false
    }
  })
  return Movimentacao
}
