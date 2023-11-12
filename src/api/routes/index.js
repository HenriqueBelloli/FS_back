const express = require('express')
const router = express.Router()
const usuariosRoutes = require('./usuarios.route')
const contasRoutes = require('./contas.route')
const categoriasRoutes = require('./categorias.route')
const movimentacoesRoutes = require('./movimentacoes.route')

router.get('/status', (req, res) => res.send('Status OK'))
router.use('/usuarios', usuariosRoutes)
router.use('/contas', contasRoutes)
router.use('/categorias', categoriasRoutes)
router.use('/movimentacoes', movimentacoesRoutes)

module.exports = router