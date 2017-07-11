const mongoose = require('mongoose')
const moment = require('moment')

const transactionObj = {
  // 'patient': {
  //   type: String
  // },
  'patient': {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  },
  'invoice date': {
    type: Date
  },
  'invoice number': {
    type: String
  },
  'receiving doctor': {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  },
  'transaction amount': {
    type: Number
  },
  'transaction month': {
    type: Number
  },
  'entry number': {
    type: Number
  }
}

const transactionSchema = new mongoose.Schema(transactionObj)

transactionSchema.pre('save', function (next) {
  const transaction = this

  let
    queryResult,
    transactionMonth = moment(transaction['invoice date']).month() + 1,
    transactionPatient = transaction['patient']

  transaction['transaction month'] = transactionMonth

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
