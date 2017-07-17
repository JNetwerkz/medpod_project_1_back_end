const router = require('express').Router()
const addonController = require('../controllers/addonController')

router
.get('/search', addonController.search)
.get('/:id', addonController.show)

router
.get('/', addonController.index)
.post('/', addonController.create)

module.exports = router
