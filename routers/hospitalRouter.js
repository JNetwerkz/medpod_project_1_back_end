const router = require('express').Router()
const hospitalController = require('../controllers/hospitalController')

router
.get('/search', hospitalController.search)
.get('/:id', hospitalController.show)

router
.get('/', hospitalController.index)
.post('/', hospitalController.create)

module.exports = router
