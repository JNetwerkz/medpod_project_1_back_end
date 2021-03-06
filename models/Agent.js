const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const agentObj = {
  'first name': {
    type: String,
    required: [true, 'Please specify FIRST NAME for Agent']
  },
  'last name': {
    type: String,
    required: [true, 'Please specify LAST NAME for Agent']
  },
  'gender': {
    type: String,
    required: [true, 'Please specify GENDER for Agent'],
    enum: {
      values: ['male', 'female', 'others'],
      message: 'Please specify either MALE, FEMALE OR OTHERS for gender'
    }
  },
  personalPhoneNumber: {
    type: String
  },
  personalEmail: {
    type: String
  },
  'ic / passport': {
    type: String,
    unique: [true, 'Agent with IC / Passport already exist'],
    required: [true, 'Please specify IC / PASSPORT for Agent']
  },
  additionalInfo: {
    type: String
  }
}

const agentSchema = new mongoose.Schema(agentObj)

agentSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Agent', agentSchema)
