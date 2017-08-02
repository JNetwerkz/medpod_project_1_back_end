const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const doctorObj = {
  'first name': {
    type: String,
    required: [true, 'Please specify FIRST NAME for Doctor']
  },
  'last name': {
    type: String,
    required: [true, 'Please specify LAST NAME for Doctor']
  },
  'hospital': {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: [true, 'Please select HOSPITAL for Doctor from the dropdown list']
  },
  'gender': {
    type: String,
    required: [true, 'Please specify GENDER for Doctor'],
    enum: {
      values: ['male', 'female', 'others'],
      message: 'Please specify either MALE, FEMALE OR OTHERS for gender'
    }
  }
}

const doctorSchema = new mongoose.Schema(doctorObj)
doctorSchema.plugin(mongoosePaginate)


module.exports = mongoose.model('Doctor', doctorSchema)
