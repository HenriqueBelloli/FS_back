const express = require('express')
const controller = require('../controllers/conta.controller')
const contentTypeCheck = require('../middlewares/contentTypeCheck')

const router = express.Router()

router.route('').post(contentTypeCheck, controller.postConta)
router.route('').put(contentTypeCheck, controller.putConta)
router.route('').get(controller.getConta)
router.route('').delete(controller.deleteConta)

router.route('/usuarioContas').get(controller.getContasUsuario)

module.exports = router
