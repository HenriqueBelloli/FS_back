const Sequelize = require("sequelize");

const sequelize = new Sequelize("gestao", "postgres", "postgres123", {
    host: "localhost",
    dialect: "postgres"
});

sequelize.authenticate().then(() => console.log('Conectou!')).catch((erro) => console.log('Não conectou!'));

const usuario = sequelize.define('Usuario', {
    Nome: Sequelize.STRING,
    Email: Sequelize.STRING,
    Cidade: Sequelize.STRING,
    Senha: Sequelize.STRING
});

const cadastroDespesas = sequelize.define('CadastroDespesas', {
    Nome: Sequelize.STRING,
    Data: Sequelize.DATE,
    Valor: Sequelize.DECIMAL,
    Descricao: Sequelize.STRING
});

const cadastroReceitas = sequelize.define('CadastroReceitas', {
    Nome: Sequelize.STRING,
    Data: Sequelize.DATE,
    Valor: Sequelize.DECIMAL,
    Descricao: Sequelize.STRING
});

const tiposDespesas = sequelize.define('TiposDespesas', {
    Nome: Sequelize.STRING
});

const tiposReceitas = sequelize.define('TiposReceitas', {
    Nome: Sequelize.STRING
});

const movimentacoesFinanceiras = sequelize.define('MovimentacoesFinanceiras', {
    Tipo: Sequelize.ENUM('Entrada', 'Saida'),
    Data: Sequelize.DATE,
    Valor: Sequelize.DECIMAL
});

const conta = sequelize.define('Conta', {
    Numero: Sequelize.STRING,
    Saldo: Sequelize.DECIMAL
});

usuario.hasOne(conta);
conta.belongsTo(usuario);

cadastroDespesas.belongsTo(tiposDespesas);
tiposDespesas.hasMany(cadastroDespesas);

cadastroReceitas.belongsTo(tiposReceitas);
tiposReceitas.hasMany(tiposReceitas);

movimentacoesFinanceiras.belongsTo(cadastroDespesas, { foreignKey: 'IDDaTransacao', constraints: false });
movimentacoesFinanceiras.belongsTo(cadastroReceitas, { foreignKey: 'IDDaTransacao', constraints: false });

sequelize.sync({ force: true })
  .then(() => {
    console.log('Tabelas criadas com sucesso!');
  })
  .catch(err => {
    console.error('Erro ao criar as tabelas:', err);
  });

