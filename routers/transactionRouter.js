const router = require('express').Router()
const transactionController = require('../controllers/transactionController')

router
.get('/search', transactionController.search)
// .get('/download', transactionController.download)
.get('/:id', transactionController.show)

router
.post('/', transactionController.create)
.get('/', transactionController.index)

module.exports = router
