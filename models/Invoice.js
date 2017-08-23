const mongoose = require('mongoose')
const moment = require('moment')
const autoIncrement = require('mongoose-auto-increment')
const getInvoiceGrandTotal = require('../script/getInvoiceGrandTotal')

const mongoosePaginate = require('mongoose-paginate')
autoIncrement.initialize(mongoose.connection)

const statusModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please select STATUS from provided list'],
    enum: {
      values: [
        'Interim Bill',
        'Final Tax Invoice (FIT)',
        'Bill Collection (BillC)',
        'Distributor Fee (DF)',
        'Query Bill / Email Bill (QB / EB)',
        'Proforma (PF)',
        'Invoiced (INV)',
        'Paid and Archive',
        'VOID'
      ],
      message: 'Please select STATUS from provided list'
    }
  }
  // updatedAt: {
  //   type: Date,
  //   // required: [true, 'Please indicate date for STATUS']
  // }
}, { timestamps: { createdAt: 'createdAt' } })

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
          type: Number,
          required: [true, 'Please specify AMOUNT / PERCENTAGE for Transaction']
        }
      },
      addons:
      [
        { item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Addon'
        },
          amount: {
            type: Number,
            required: [true, 'Please specify AMOUNT for the Add-on']
          }
        }
      ]
    }
  ],
  'invoicing_doctor': {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  },
  invoiceNumber: {
    type: Number
  },
  monthCreated: {
    type: Number,
    default: moment().month() + 1
  },
  yearCreated: {
    type: Number,
    default: moment().year()
  },
  statuses: [statusModel],
  grandTotal: {
    type: Number,
    default: 0
  }
}

const invoiceSchema = new mongoose.Schema(invoiceObj, { timestamps: { createdAt: 'createdAt' } })

invoiceSchema.plugin(mongoosePaginate)
// invoiceSchema.plugin(autoIncrement.plugin, { model: 'Invoice', field: 'invoiceNumber', startAt: 10001, incrementBy: 1 })
//

invoiceSchema.pre('save', function (next) {
  const _this = this
  const currentYear = moment().year()
  // next()
  _this.grandTotal = getInvoiceGrandTotal(_this)

  InvoiceModel
  .find({ yearCreated: currentYear })
  .sort({ invoiceNumber: -1 })
  .limit(1)
  .exec((err, result) => {
    if (err) console.error('err', err)
    if (result.length !== 0) {
      _this.invoiceNumber = result[0].invoiceNumber + 1
    } else {
      _this.invoiceNumber = 100000
    }
    next()
  })
})
//
// invoiceSchema.post('save', function (next) {
//   const _this = this
//   console.log('HEY IM POST SAVE BITCH', _this)
//   // next()
// })

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

const InvoiceModel = mongoose.model('Invoice', invoiceSchema)
module.exports = InvoiceModel
