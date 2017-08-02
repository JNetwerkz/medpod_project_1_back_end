const mongoose = require('mongoose')
const moment = require('moment')

const mongoosePaginate = require('mongoose-paginate')

const invoiceObj = {
  transactions: [
    {
      transaction:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
      },
      receivable:
      {
        percentage:
        {
          type: Number
        },
        amount:
        {
          type: Number
        }
      },
      addons:
      [
        { item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Addon'
          },
          amount: {
            type: Number
          }
        }
      ]
    }
  ],
  'invoicing_doctor': {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  },
  createdAt: {
    type: Date,
    default: moment()
  },
  monthCreated: {
    type: Date,
    default: moment().month() + 1
  },
  yearCreated: {
    type: Date,
    default: moment().year()
  }
}

const invoiceSchema = new mongoose.Schema(invoiceObj)

invoiceSchema.plugin(mongoosePaginate)

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
