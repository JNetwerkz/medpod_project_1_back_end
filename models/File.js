const mongoose = require('mongoose')

const fileObj = {
  Key: {
    type: String
  },
  description: {
    type: String
  },
  fileType: {
    type: String
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  },
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction'
  }
}

const fileSchema = new mongoose.Schema(fileObj)

// fileSchema.pre('save', function (next) {
//   const invoice = this
//   console.log('pre save invoice', this)
//   // invoice.transactions[0].addons = [{name: 'ambulance fee'}, {name: 'GST'}]
//   invoice.transactions[0].addons = [{
//     item: {
//       name: 'ambulance fee'
//     },
//     amount: 200
//   }, {
//     item: {
//       name: 'GST'
//     },
//     amount: 200
//   }]
//   next()
// })

module.exports = mongoose.model('File', fileSchema)
