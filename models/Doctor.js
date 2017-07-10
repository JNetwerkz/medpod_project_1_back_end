const mongoose = require('mongoose')

const doctorObj = {
  'first name': {
    type: String
  },
  'last name': {
    type: String
  },
  'hospital': {
    type: mongoose.Schema.Types.ObjectId
  },
  'gender': {
    type: String
  }
}

const doctorSchema = new mongoose.Schema(doctorObj)

module.exports = mongoose.model('Doctor', doctorSchema)
