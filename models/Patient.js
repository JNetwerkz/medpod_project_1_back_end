const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const patientObj = {
  'first name': {
    type: String,
    required: [true, 'Please specify FIRST NAME for Patient']
  },
  'last name': {
    type: String,
    required: [true, 'Please specify LAST NAME for Patient']
  },
  'ic / passport': {
    type: String,
    required: [true, 'Please specify IC / PASSPORT for Patient']
  },
  'gender': {
    type: String,
    required: [true, 'Please specify GENDER for Patient'],
    enum: {
      values: ['male', 'female', 'others'],
      message: 'Please specify either MALE, FEMALE, or OTHERS for gender'
    }
  },
  'referral_agent': {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent'
  }
}

const patientSchema = new mongoose.Schema(patientObj)
patientSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Patient', patientSchema)
