const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

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
    type: Number,
    default: 0
  },
  invoiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice'
  },
  transactionMonth: {
    type: Number
  },
  transactionYear: {
    type: Number
  }
}

const commissionSchema = new mongoose.Schema(commissionObj, { timestamps: { createdAt: 'createdAt' } })
commissionSchema.plugin(mongoosePaginate)

module.exports = {
  Model: mongoose.model('Commission', commissionSchema),
  commissionSchema
}
