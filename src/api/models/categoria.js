module.exports = (sequelize, Sequelize) => {
  const Categoria = sequelize.define('categoria', {
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
    }
  })
  return Categoria
}
