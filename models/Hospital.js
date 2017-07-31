const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const hospitalObj = {
  'name': {
    type: String
  },
  'address': {
    type: String
  }
}

const hospitalSchema = new mongoose.Schema(hospitalObj)
hospitalSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Hospital', hospitalSchema)
