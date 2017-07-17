const mongoose = require('mongoose')

const invoiceObj = {
  transactions: [{
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction'
    },
    receivable: {
      percentage: {
        type: Number
      },
      amount: {
        type: Number
      }
    },
    addons: [{
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Addon'
      },
      amount: {
        type: Number
      }
    }]
  }],
  'invoicing_doctor': {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  }
}

const invoiceSchema = new mongoose.Schema(invoiceObj)

// invoiceSchema.pre('save', function (next) {
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

module.exports = mongoose.model('Invoice', invoiceSchema)
