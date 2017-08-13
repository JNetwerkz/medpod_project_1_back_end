const router = require('express').Router()
const invoiceController = require('../controllers/invoiceController')

router.get('/:id', invoiceController.show)
router.post('/:id/status/new', invoiceController.updateInvoiceStatus)

router
.get('/', invoiceController.index)
.post('/', invoiceController.create)

module.exports = router
