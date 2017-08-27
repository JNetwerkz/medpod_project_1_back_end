const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const hospitalObj = {
  name: {
    type: String,
    required: [true, 'Please specify NAME for Hospital']
  },
  nameAbbreviation: {
    type: String,
    unique: [true, 'Abbreviation used for existing Hospital. Please select another']
  },
  associationAddress_street: {
    type: String,
    required: [true, 'Please specify BLOCK, & STREET']
  },
  associationAddress_unit: {
    type: String
  },
  associationAddress_postalcode: {
    type: String,
    required: [true, 'Please specify POSTAL CODE']
  },
  associationAddress_country: {
    type: String,
    required: [true, 'Please specify COUNTRY']
  },
  associationPhoneNumber: {
    type: String
  },
  associationEmail: {
    type: String
  }

}

const hospitalSchema = new mongoose.Schema(hospitalObj)
hospitalSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Hospital', hospitalSchema)
