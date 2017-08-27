const router = require('express').Router()
const agentController = require('../controllers/agentController')

router
.get('/search', agentController.search)
.get('/:id', agentController.show)
.get('/:id/transaction', agentController.searchTransaction)
.put('/:id', agentController.update)

router
.get('/', agentController.index)
.post('/', agentController.create)

module.exports = router
