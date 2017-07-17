const mongoose = require('mongoose')

const hospitalObj = {
  'name': {
    type: String
  },
  'address': {
    type: String
  }
}

const hospitalSchema = new mongoose.Schema(hospitalObj)

module.exports = mongoose.model('Hospital', hospitalSchema)
