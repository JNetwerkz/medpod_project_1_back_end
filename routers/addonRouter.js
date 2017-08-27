const router = require('express').Router()
const addonController = require('../controllers/addonController')

router
.get('/search', addonController.search)
.get('/:id', addonController.show)
.put('/:id/status', addonController.updateStatus)
router
.get('/', addonController.index)
.post('/', addonController.create)

module.exports = router
