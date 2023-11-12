const express = require('express')
const controller = require('../controllers/categoria.controller')
const contentTypeCheck = require('../middlewares/contentTypeCheck')

const router = express.Router()

router.route('').post(contentTypeCheck, controller.postCategoria) 
router.route('').put(contentTypeCheck, controller.putCategoria)
router.route('').get(controller.getCategoria)
router.route('').delete(controller.deleteCategoria)

module.exports = router
