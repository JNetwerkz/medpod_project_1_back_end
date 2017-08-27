const router = require('express').Router()
const hospitalController = require('../controllers/hospitalController')

router
.get('/search', hospitalController.search)
.get('/:id', hospitalController.show)
.put('/:id', hospitalController.update)

router
.get('/', hospitalController.index)
.post('/', hospitalController.create)

module.exports = router
