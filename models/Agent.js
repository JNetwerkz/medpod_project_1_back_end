const mongoose = require('mongoose')

const agentObj = {
  'first name': {
    type: String
  },
  'last name': {
    type: String
  },
  'gender': {
    type: String
  }
}

const agentSchema = new mongoose.Schema(agentObj)

module.exports = mongoose.model('Agent', agentSchema)
