const router = require('express').Router()
const querystring = require('querystring')

const patientController = require('../controllers/patientController')

router
.get('/search', patientController.search)
.get('/:id', patientController.show)
.put('/:id', patientController.update)

router
.get('/', patientController.index)
.post('/', patientController.create)

module.exports = router
