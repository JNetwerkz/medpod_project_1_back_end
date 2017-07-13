const router = require('express').Router()
const invoiceController = require('../controllers/invoiceController')

router.post('/', invoiceController.create)

module.exports = router
