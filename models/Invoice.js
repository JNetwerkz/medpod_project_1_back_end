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
    addons: {

    }
  }]
}

const invoiceSchema = new mongoose.Schema(invoiceObj)

module.exports = mongoose.model('Invoice', invoiceSchema)
