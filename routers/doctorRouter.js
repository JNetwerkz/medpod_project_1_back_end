const router = require('express').Router()
const doctorController = require('../controllers/doctorController')

router
.get('/search', doctorController.search)
.get('/:id', doctorController.show)
.put('/:id', doctorController.update)

router
.get('/', doctorController.index)
.post('/', doctorController.create)

module.exports = router
