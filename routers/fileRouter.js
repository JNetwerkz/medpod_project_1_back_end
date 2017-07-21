const router = require('express').Router()
const fileController = require('../controllers/fileController')

router
.delete('/:id', fileController.delete)
// .get('/:id', fileController.show)

router
.get('/', fileController.index)
.post('/', fileController.create)

module.exports = router
