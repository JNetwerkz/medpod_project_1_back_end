const router = require('express').Router()

const patientController = require('../controllers/patientController')

router
.get('/:id', patientController.show)

router
.get('/', patientController.index)
.post('/', patientController.create)

module.exports = router
