const router = require('express').Router()
const fileController = require('../controllers/fileController')

// router.get('/:id', fileController.show)

router
// .get('/', fileController.index)
.post('/', fileController.create)

module.exports = router
