const express = require('express')
const controller = require('../controllers/usuario.controller')
const contentTypeCheck = require('../middlewares/contentTypeCheck')

const router = express.Router()

router.route('').post(contentTypeCheck, controller.postUsuario)
router.route('').put(contentTypeCheck, controller.putUsuario)
router.route('').get(controller.getUsuario)
router.route('').delete(controller.deleteUsuario)
router.route('/balance').get(controller.getUsuarioBalance)
router.route('/login').post(contentTypeCheck, controller.postUsuarioLogin)

module.exports = router
