const router = require('express').Router()
const commissionController = require('../controllers/commissionController')

// router
// .get('/search', commissionController.search)
// .get('/:id', commissionController.show)

router
.put('/:id', commissionController.update)
.get('/', commissionController.index)
.post('/', commissionController.create)

module.exports = router
