const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const doctorObj = {
  'first name': {
    type: String
  },
  'last name': {
    type: String
  },
  'hospital': {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital'
  },
  'gender': {
    type: String
  }
}

const doctorSchema = new mongoose.Schema(doctorObj)
doctorSchema.plugin(mongoosePaginate)


module.exports = mongoose.model('Doctor', doctorSchema)
