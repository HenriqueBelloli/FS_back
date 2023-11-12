/* Carrega as configurações de ambiente. */
const dotenv = require('dotenv')
const path = require('path')
const envPath = path.join(__dirname, 'config', '.env')
dotenv.config({ path: envPath })

//dotenv.config({ path: './src/config/.env' })

const logger = require('./api/helper/logger')

const app = require('./config/express')
const config = require('./config/config')
const db = require('./config/db_sequelize')

let server

/* Sincroniza a estrutura do banco de dados*/
syncBanco()

/* Inicia o servidor */
server = app.listen(config.port, async () => {
  logger.info(`Servidor rodando na porta ${config.port}`)
})

/* Tratamento de erros */
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.fatal('Server closed')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error) => {
  logger.error(error)
  exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
  logger.info('SIGTERM received')
  if (server) {
    server.close()
  }
})

module.exports = server

async function syncBanco() {
  await db.sequelize
    .sync({ force: true })
    .then(() => {
      logger.info('Conexao com banco de dados estabelecida e modelos sincronizados. Criando registros padrão...')

      criarTriggers()

      // Crie um usuário
      db.Usuario.create({
        nome: 'user',
        email: 'user@email.com',
        senha: '123'
      })
        .then((user) => {
          // Crie uma conta
          return db.Conta.create({
            descricao: 'conta bancária',
            usuarioId: user.id
          })
        })
        .then((user) => {
          // Crie categorias
          return db.Categoria.bulkCreate([
            { tipo: 1, descricao: 'salário', usuarioId: user.id },
            { tipo: 1, descricao: 'mesada', usuarioId: user.id },
            { tipo: 2, descricao: 'alimentação', usuarioId: user.id },
            { tipo: 2, descricao: 'aluguel', usuarioId: user.id },
            { tipo: 2, descricao: 'energia elétrica', usuarioId: user.id }
          ])
        })
        .catch((error) => {
          logger.error('Erro ao criar registros padrao:' + error)
        })
    })
    .catch((error) => {
      logger.error('Erro na sincronizacao de modelos:' + error)
    })
}

async function criarTriggers() {
  try {
    const sql = `
    CREATE OR REPLACE FUNCTION atualizar_saldo_conta()
    RETURNS TRIGGER AS $$
    BEGIN

      IF (TG_OP = 'INSERT') THEN
        UPDATE conta
        SET saldo = saldo + NEW.valor
        WHERE id = NEW."contaId";

      ELSIF (TG_OP = 'UPDATE') THEN

        IF OLD."contaId" != NEW."contaId" THEN
          UPDATE conta
          SET saldo = saldo - OLD.valor
          WHERE id = OLD."contaId";

          UPDATE conta
          SET saldo = saldo + NEW.valor
          WHERE id = NEW."contaId";

        ELSE
          UPDATE conta
          SET saldo = saldo - OLD.valor + NEW.valor
          WHERE id = NEW."contaId";
        END IF;

      ELSIF (TG_OP = 'DELETE') THEN
        UPDATE conta
        SET saldo = saldo - OLD.valor
        WHERE id = OLD."contaId";
      END IF;

      RETURN NEW;
      END;
    $$ LANGUAGE plpgsql;
    
    CREATE TRIGGER movimentacaoContaSaldoAtualizar
    AFTER INSERT OR DELETE OR UPDATE ON movimentacaos
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_saldo_conta();
    `

    await await db.sequelize.query(sql)

    console.log('Triggers criadas com sucesso.')
  } catch (error) {
    console.error('Erro ao criar as triggers:' + error)
  }
}
