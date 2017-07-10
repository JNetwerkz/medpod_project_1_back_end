const router = require('express').Router()
const doctorController = require('../controllers/doctorController')

router
.get('/:id', doctorController.show)

router
.post('/', doctorController.create)

module.exports = router
