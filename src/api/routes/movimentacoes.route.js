const express = require('express')
const controller = require('../controllers/movimentacao.controller')
const contentTypeCheck = require('../middlewares/contentTypeCheck')

const router = express.Router()

router.route('').post(contentTypeCheck, controller.postMovimentacao) 
router.route('').put(contentTypeCheck, controller.putMovimentacao)
router.route('').get(controller.getMovimentacao)
router.route('').delete(controller.deleteCategoria)

router.route('/search').get(controller.getSearchMovimentacao)


module.exports = router
