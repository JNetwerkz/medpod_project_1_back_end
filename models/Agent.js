const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

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

agentSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Agent', agentSchema)
