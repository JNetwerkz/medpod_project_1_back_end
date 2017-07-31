const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent'
  }
}

const patientSchema = new mongoose.Schema(patientObj)
patientSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Patient', patientSchema)
