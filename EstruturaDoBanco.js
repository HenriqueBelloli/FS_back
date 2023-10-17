const Sequelize = require("sequelize");

const sequelize = new Sequelize("gestao", "postgres", "postgres123", {
    host: "localhost",
    dialect: "postgres"
});

sequelize.authenticate().then(() => console.log('Conectou!')).catch((erro) => console.log('Não conectou!'));

const usuario = sequelize.define('Usuario', {
    Nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Cidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const cadastroDespesas = sequelize.define('CadastroDespesas', {
    Nome:  {
        type: Sequelize.STRING,
        allowNull: false
    },
    Data: {
        type: Sequelize.DATE,
        allowNull: false
    },
    Valor: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    Descricao: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const cadastroReceitas = sequelize.define('CadastroReceitas', {
    Nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Data: {
        type: Sequelize.DATE,
        allowNull: false
    },
    Valor: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    Descricao: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const tiposDespesas = sequelize.define('TiposDespesas', {
    Nome: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const tiposReceitas = sequelize.define('TiposReceitas', {
    Nome: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const movimentacoesFinanceiras = sequelize.define('MovimentacoesFinanceiras', {
    Tipo: {
        type: Sequelize.ENUM('Entrada', 'Saida'),
        allowNull: false
    },
    Data: {
        type: Sequelize.DATE,
        allowNull: false
    },
    Valor: {
        type: Sequelize.DECIMAL,
        allowNull: false
    }
});

const conta = sequelize.define('Conta', {
    Numero: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Saldo: {
        type: Sequelize.DECIMAL,
        allowNull: false
    }
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
