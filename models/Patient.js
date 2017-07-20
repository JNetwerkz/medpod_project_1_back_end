const mongoose = require('mongoose')

const patientObj = {
  'first name': {
    type: String
  },
  'last name': {
    type: String
  },
  'ic / passport': {
    type: String
  },
  'gender': {
    type: String
  },
  'referral_agent': {
    type: mongoose.Schema.Types.ObjectId
  }
}

const patientSchema = new mongoose.Schema(patientObj)

module.exports = mongoose.model('Patient', patientSchema)
