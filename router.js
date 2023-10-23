const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const models = require("./models.js");

//post

router.post('/cadastro/usuario', async (req, res) => {
    const {Nome, Email, Cidade, Senha} = req.body;
    try {
        const novoUsuario = await models.usuario.create({
            Nome,
            Email,
            Cidade,
            Senha
        });
        res.status(200).json(novoUsuario);
    } catch(err) {
        res.status(500).json({error: "Erro ao criar usuário"});
    }
});

router.post('/cadastro/despesas', async (req, res) => {
    const {Nome, Data, Valor, Descricao} = req.body;
    try {
        const novaDespesa = await models.cadastroDespesas.create({
            Nome,
            Data,
            Valor,
            Descricao
        });
        res.status(200).json(novaDespesa);
    } catch(err) {
        res.status(500).json({error: "Erro ao cadastrar despesa"});
    }
});

router.post('/cadastro/receitas', async (req, res) => {
    const {Nome, Data, Valor, Descricao} = req.body;
    try {
        const novaReceita = await models.cadastroReceitas.create({
            Nome,
            Data,
            Valor,
            Descricao
        });
        res.status(200).json(novaReceita);
    } catch(err) {
        res.status(500).json({error: "Erro ao cadastrar receita"});
    }
});

router.post('/cadastro/tipos_despesas', async (req, res) => {
    const {Nome} = req.body;
    try {
        const novoTipoDespesa = await models.tiposDespesas.create({
            Nome
        });
        res.status(200).json(novoTipoDespesa);
    } catch(err) {
        res.status(500).json({error: "Erro ao cadastrar tipo de despesas"});
    }
});

router.post('/cadastro/tipos_receitas', async (req, res) => {
    const {Nome} = req.body;
    try {
        const novoTipoReceita = await models.tiposReceitas.create({
            Nome
        });
        res.status(200).json(novoTipoReceita);
    } catch(err) {
        res.status(500).json({error: "Erro ao cadastrar tipo de receitas"});
    }
});

router.post('/cadastro/movimentacoes_financeiras', async (req, res) => {
    const {Tipo, Data, Valor} = req.body;
    try {
        const novaMovimentacao = await models.movimentacoesFinanceiras.create({
            Tipo,
            Data,
            Valor
        });
        res.status(200).json(novaMovimentacao);
    } catch(err) {
        res.status(500).json({error: "Erro ao cadastrar movimentação financeira"});
    }
});

router.post('/cadastro/conta', async (req, res) => {
    const {Numero, Saldo} = req.body;
    try {
        const novaConta = await models.conta.create({
            Numero,
            Saldo
        });
        res.status(200).json(novaConta);
    } catch(err) {
        res.status(500).json({error: "Erro ao criar conta"});
    }
});

//get

router.get('/get/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const usuario = await models.usuario.findByPk(id);
        if(usuario){
            res.status(200).json(usuario);
        } else {
            res.status(404).json({error: "Usuário não encontrado"});
        }
    } catch(err) {
        res.status(500).json({error: "Erro ao buscar usuário"});
    }
});

router.get('/get/despesas/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const cadastroDespesas = await models.cadastroDespesas.findByPk(id);
        if(cadastroDespesas){
            res.status(200).json(cadastroDespesas);
        } else {
            res.status(404).json({error: "Despesa não encontrada"});
        }
    } catch(err) {
        res.status(500).json({error: "Erro ao buscar Despesa"});
    }
});

router.get('/get/receitas/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const cadastroReceitas = await models.cadastroReceitas.findByPk(id);
        if(cadastroReceitas){
            res.status(200).json(cadastroReceitas);
        } else {
            res.status(404).json({error: "Receita não encontrada"});
        }
    } catch(err) {
        res.status(500).json({error: "Erro ao buscar Receita"});
    }
});

router.get('/get/tipos_despesas/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const tiposDespesas = await models.tiposDespesas.findByPk(id);
        if(tiposDespesas){
            res.status(200).json(tiposDespesas);
        } else {
            res.status(404).json({error: "Tipo de despesa não encontrada"});
        }
    } catch(err) {
        res.status(500).json({error: "Erro ao buscar Tipo de despesa"});
    }
});

router.get('/get/tipos_receitas/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const tiposReceitas = await models.tiposReceitas.findByPk(id);
        if(tiposReceitas){
            res.status(200).json(tiposReceitas);
        } else {
            res.status(404).json({error: "Tipo de receita não encontrada"});
        }
    } catch(err) {
        res.status(500).json({error: "Erro ao buscar tipo de receita"});
    }
});


router.get('/get/movimentacoes/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const movimentacoesFinanceiras = await models.movimentacoesFinanceiras.findByPk(id);
        if(movimentacoesFinanceiras){
            res.status(200).json(movimentacoesFinanceiras);
        } else {
            res.status(404).json({error: "movimentação financeira não encontrada"});
        }
    } catch(err) {
        res.status(500).json({error: "Erro ao buscar movimentação financeira"});
    }
});

router.get('/get/contas/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const conta = await models.conta.findByPk(id);
        if(conta){
            res.status(200).json(conta);
        } else {
            res.status(404).json({error: "Conta não encontrada"});
        }
    } catch(err) {
        res.status(500).json({error: "Erro ao buscar conta"});
    }
});

//Listar as despesas de um usuário específico
router.get('/get/despesas/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const despesas = await models.cadastroDespesas.findAll({
            where: { UserId: userId },
            include: [
                { model: models.tiposDespesas },
                { model: models.movimentacoesFinanceiras, where: { Tipo: 'Saida' } }
            ]
        });
        res.status(200).json(despesas);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar despesas" });
    }
});

//Listar as receitas de um usuário específico
router.get('/get/receitas/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const receitas = await models.cadastroReceitas.findAll({
            where: { UserId: userId },
            include: [
                { model: models.tiposReceitas },
                { model: models.movimentacoesFinanceiras, where: { Tipo: 'Entrada' } }
            ]
        });
        res.status(200).json(receitas);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar receitas" });
    }
});

//Listar o saldo da conta de um usuário
router.get('/get/saldo/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const conta = await models.conta.findOne({
            where: { UserId: userId },
            include: [{ model: models.usuario }]
        });
        res.status(200).json(conta);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar saldo da conta" });
    }
});

//Listar todas as movimentações financeiras de um usuário
router.get('/get/movimentacoes/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const movimentacoes = await models.movimentacoesFinanceiras.findAll({
            where: { UserId: userId },
            include: [
                { model: models.cadastroDespesas, include: [{ model: models.tiposDespesas }] },
                { model: models.cadastroReceitas, include: [{ model: models.tiposReceitas }] }
            ]
        });
        res.status(200).json(movimentacoes);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar movimentações financeiras" });
    }
});

//Listar todas as despesas de um tipo específico
router.get('/get/despesas/tipo/:tipoDespesaId', async (req, res) => {
    const { tipoDespesaId } = req.params;
    try {
        const despesas = await models.cadastroDespesas.findAll({
            where: { TipoDespesaId: tipoDespesaId },
            include: [
                { model: models.tiposDespesas },
                { model: models.movimentacoesFinanceiras, where: { Tipo: 'Saida' } }
            ]
        });
        res.status(200).json(despesas);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar despesas por tipo" });
    }
});

//Listar todas as despesas e receitas de um usuário em um período de tempo específico
router.get('/get/movimentacoes/periodo/:userId/:dataInicial/:dataFinal', async (req, res) => {
    const { userId, dataInicial, dataFinal } = req.params;
    try {
        const movimentacoes = await models.movimentacoesFinanceiras.findAll({
            where: {
                UserId: userId,
                Data: { [models.Sequelize.Op.between]: [dataInicial, dataFinal] }
            },
            include: [
                { model: models.cadastroDespesas, include: [{ model: models.tiposDespesas }] },
                { model: models.cadastroReceitas, include: [{ model: models.tiposReceitas }] }
            ],
            order: [['Data', 'DESC']]
        });
        res.status(200).json(movimentacoes);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar movimentações financeiras por período" });
    }
});

//Listar todas as despesas e receitas de um usuário com um determinado valor mínimo
router.get('/get/movimentacoes/valor-minimo/:userId/:valorMinimo', async (req, res) => {
    const { userId, valorMinimo } = req.params;
    try {
        const movimentacoes = await models.movimentacoesFinanceiras.findAll({
            where: {
                UserId: userId,
                Valor: { [models.Sequelize.Op.gte]: valorMinimo }
            },
            include: [
                { model: models.cadastroDespesas, include: [{ model: models.tiposDespesas }] },
                { model: models.cadastroReceitas, include: [{ model: models.tiposReceitas }] }
            ]
        });
        res.status(200).json(movimentacoes);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar movimentações financeiras com valor mínimo" });
    }
});

//Listar todas as despesas de um usuário com informações detalhadas de suas categorias
router.get('/get/despesas-categorias/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const despesas = await models.cadastroDespesas.findAll({
            where: { UserId: userId },
            include: [
                { model: models.tiposDespesas }
            ]
        });
        res.status(200).json(despesas);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar despesas com categorias" });
    }
});

//put

router.put('/put/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { Nome, Email, Cidade, Senha } = req.body;

    try {
        const usuario = await models.usuario.findByPk(id);
        if(usuario){
            await usuario.update({
                Nome,
                Email,
                Cidade,
                Senha
            });
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ error: "Usuário não encontrado" });
        }
    } catch (err) {
        res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
});

router.put('/put/cadastroReceitas/:id', async (req, res) => {
    const { id } = req.params;
    const { Nome, Email, Cidade, Senha } = req.body;

    try {
        const cadastroReceitas = await models.cadastroReceitas.findByPk(id);
        if(cadastroReceitas){
            await cadastroReceitas.update({
                Nome,
                Data,
                Valor,
                Descricao
            });
            res.status(200).json(cadastroReceitas);
        } else {
            res.status(404).json({ error: "Receita não encontrada" });
        }
    } catch (err) {
        res.status(500).json({ error: "Erro ao atualizar receitas" });
    }
});

router.put('/put/cadastroDespesas/:id', async (req, res) => {
    const { id } = req.params;
    const { Nome, Email, Cidade, Senha } = req.body;

    try {
        const cadastroDespesas = await models.cadastroDespesas.findByPk(id);
        if(cadastroDespesas){
            await cadastroDespesas.update({
                Nome,
                Data,
                Valor,
                Descricao
            });
            res.status(200).json(cadastroDespesas);
        } else {
            res.status(404).json({ error: "Despesa não encontrada" });
        }
    } catch (err) {
        res.status(500).json({ error: "Erro ao atualizar despesa" });
    }
});

router.put('/put/tiposDespesas/:id', async (req, res) => {
    const { id } = req.params;
    const { Nome, Email, Cidade, Senha } = req.body;

    try {
        const tiposDespesa = await models.tiposDespesa.findByPk(id);
        if(tiposDespesa){
            await tiposDespesa.update({
                Nome
            });
            res.status(200).json(tiposDespesa);
        } else {
            res.status(404).json({ error: "tipo de despesa não encontrada" });
        }
    } catch (err) {
        res.status(500).json({ error: "Erro ao atualizar tipo de despesa" });
    }
});

router.put('/put/tiposReceitas/:id', async (req, res) => {
    const { id } = req.params;
    const { Nome, Email, Cidade, Senha } = req.body;

    try {
        const tiposReceitas = await models.tiposReceitas.findByPk(id);
        if(tiposReceitas){
            await tiposReceitas.update({
                Nome
            });
            res.status(200).json(tiposReceitas);
        } else {
            res.status(404).json({ error: "Tipos de receita não encontrada" });
        }
    } catch (err) {
        res.status(500).json({ error: "Erro ao atualizar tipo de receitas" });
    }
});

router.put('/put/movimentacoesFinanceiras/:id', async (req, res) => {
    const { id } = req.params;
    const { Nome, Email, Cidade, Senha } = req.body;

    try {
        const movimentacoesFinanceiras = await models.movimentacoesFinanceiras.findByPk(id);
        if(movimentacoesFinanceiras){
            await movimentacoesFinanceiras.update({
                Tipo,
                Data,
                Valor
            });
            res.status(200).json(movimentacoesFinanceiras);
        } else {
            res.status(404).json({ error: "Movimentação financeira não encontrada" });
        }
    } catch (err) {
        res.status(500).json({ error: "Erro ao atualizar movimentação financeira" });
    }
});

router.put('/put/conta/:id', async (req, res) => {
    const { id } = req.params;
    const { Nome, Email, Cidade, Senha } = req.body;

    try {
        const conta = await models.conta.findByPk(id);
        if(conta){
            await conta.update({
                Tipo,
                Data,
                Valor
            });
            res.status(200).json(conta);
        } else {
            res.status(404).json({ error: "Conta não encontrada" });
        }
    } catch (err) {
        res.status(500).json({ error: "Erro ao atualizar conta" });
    }
});

//delete

router.delete('/delete/usuarios/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = models.usuario.findByPk(id);

        if (usuario) {
            await usuario.destroy();
            res.status(204).send(); 
        } else {
            res.status(404).json({ error: "Usuário não encontrado" });
        }
    } catch (err) {
        res.status(500).json({ error: "Erro ao excluir usuário" });
    }
});

router.delete('/delete/cadastroDespesas/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const cadastroDespesas = models.cadastroDespesas.findByPk(id);

        if (cadastroDespesas) {
            await cadastroDespesas.destroy();
            res.status(204).send(); 
        } else {
            res.status(404).json({ error: "Despesa não encontrada" });
        }
    } catch (err) {
        res.status(500).json({ error: "Erro ao excluir despesa" });
    }
});

router.delete('/delete/cadastroReceitas/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const cadastroReceitas = models.cadastroReceitas.findByPk(id);

        if (cadastroReceitas) {
            await cadastroReceitas.destroy();
            res.status(204).send(); 
        } else {
            res.status(404).json({ error: "Receita não encontrada" });
        }
    } catch (err) {
        res.status(500).json({ error: "Erro ao excluir receita" });
    }
});

router.delete('/delete/tiposDespesas/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const tiposDespesas = models.tiposDespesas.findByPk(id);

        if (tiposDespesas) {
            await tiposDespesas.destroy();
            res.status(204).send(); 
        } else {
            res.status(404).json({ error: "tipo de despesas não encontrado" });
        }
    } catch (err) {
        res.status(500).json({ error: "Erro ao excluir tipos de despesa" });
    }
});

router.delete('/delete/tiposReceitas/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const tiposReceitas = models.tiposReceitas.findByPk(id);

        if (tiposReceitas) {
            await tiposReceitas.destroy();
            res.status(204).send(); 
        } else {
            res.status(404).json({ error: "Tipo de receita não encontrado" });
        }
    } catch (err) {
        res.status(500).json({ error: "Erro ao excluir tipo de receita" });
    }
});

router.delete('/delete/movimentacoesFinanceiras/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const movimentacoesFinanceiras = models.movimentacoesFinanceiras.findByPk(id);

        if (movimentacoesFinanceiras) {
            await movimentacoesFinanceiras.destroy();
            res.status(204).send(); 
        } else {
            res.status(404).json({ error: "Movimentação financeira não encontrada" });
        }
    } catch (err) {
        res.status(500).json({ error: "Erro ao excluir movimentação financeira" });
    }
});

router.delete('/delete/conta/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const conta = models.conta.findByPk(id);

        if (conta) {
            await conta.destroy();
            res.status(204).send(); 
        } else {
            res.status(404).json({ error: "Conta não encontrada" });
        }
    } catch (err) {
        res.status(500).json({ error: "Erro ao excluir conta" });
    }
});

module.exports = router;
