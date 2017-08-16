const mongoose = require('mongoose')

const commissionObj = {
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction'
  },
  referralAgentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent'
  },
  invoiceAmount: {
    type: Number
  },
  commissionAmount: {
    type: Number
  },
  invoiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice'
  },
  invoiceMonth: {
    type: Number
  },
  invoiceYear: {
    type: Number
  }
}

const commissionSchema = new mongoose.Schema(commissionObj)

module.exports = {
  Model: mongoose.model('Commission', commissionSchema),
  commissionSchema
}
