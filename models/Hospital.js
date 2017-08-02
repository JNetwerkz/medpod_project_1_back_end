const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const hospitalObj = {
  'name': {
    type: String,
    required: [true, 'Please specify name for Hospital']
  },
  'address': {
    type: String
  }
}

const hospitalSchema = new mongoose.Schema(hospitalObj)
hospitalSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Hospital', hospitalSchema)
