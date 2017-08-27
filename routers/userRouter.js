const router = require('express').Router()
const userController = require('../controllers/userController')

router
.post('/', userController.index)
.post('/new', userController.create)

router
.delete('/:id', userController.destroy)

module.exports = router
