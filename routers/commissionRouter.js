const router = require('express').Router()
const commissionController = require('../controllers/commissionController')

router
.get('/search', commissionController.search)
.get('/:id', commissionController.show)
.put('/:id/status', commissionController.updateStatus)
router
.get('/', commissionController.index)
.post('/', commissionController.create)

module.exports = router
