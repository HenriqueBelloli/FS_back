module.exports = (sequelize, Sequelize) => {
  const Conta = sequelize.define('conta', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    descricao: {
      type: Sequelize.STRING,
      allowNull: false
    },
    saldo: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 0
    }
  })
  return Conta
}
