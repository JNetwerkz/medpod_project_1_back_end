const mongoose = require('mongoose')
const moment = require('moment')
const mongoosePaginate = require('mongoose-paginate')

const transactionObj = {
  'patient': {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  },
  procedureName: {
    type: String,
    required: [true, 'Please indicate PROCEDURE / TREATMENT name. Name will be displayed on Outgoing Invoice']
  },
  'invoice date': {
    type: Date,
    required: [true, 'Please indicate INVOICE DATE for Transaction']
  },
  'invoice number': {
    type: String,
    required: [true, 'Please indicate INVOICE NUMBER for Transaction']
  },
  'receiving_doctor': {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  },
  'transaction amount': {
    type: Number,
    required: [true, 'Please indicate TRANSACTION AMOUNT for Transaction. Indicate 0 if not applicable']
  },
  'transaction month': {
    type: Number
  },
  'transaction year': {
    type: Number
  },
  'entry number': {
    type: Number
  },
  status: {
    type: String,
    default: 'active'
  },
  additionalInfo: {
    type: String
  }
}

const transactionSchema = new mongoose.Schema(transactionObj, { timestamps: { createdAt: 'createdAt' } })

transactionSchema.plugin(mongoosePaginate)

transactionSchema.pre('save', function (next) {
  const transaction = this

  let
    queryResult,
    transactionMonth = moment(transaction['invoice date']).month() + 1,
    transactionYear = moment(transaction['invoice date']).year(),
    transactionPatient = transaction['patient']

  transaction['transaction month'] = transactionMonth
  transaction['transaction year'] = transactionYear

  TransactionModel
  .find({'patient': transactionPatient, 'transaction month': transactionMonth})
  .sort({'entry number': -1})
  .limit(1)
  .exec((err, result) => {
    if (err) console.error('err', err)

    if (result.length !== 0) {
      transaction['entry number'] = result[0]['entry number'] + 1
    } else {
      transaction['entry number'] = 1
    }
    next()
  })
})

const TransactionModel = mongoose.model('Transaction', transactionSchema)

module.exports = TransactionModel
