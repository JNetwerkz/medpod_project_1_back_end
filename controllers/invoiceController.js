const InvoiceModel = require('../models/Invoice')
const CommissionModel = require('../models/Commission').Model
const querystring = require('querystring')

module.exports = {
  index: (req, res, next) => {
    console.log(req.query)
    const {
      search,
      page
    } = req.query

    const query = querystring.parse(search)

    if (!query.invoicing_doctor) delete query.invoicing_doctor
    if (!query.monthCreated) delete query.monthCreated
    if (!query.yearCreated) delete query.yearCreated
    console.log(query)
    const parsedPage = parseInt(page)

    const options = {
      page: parsedPage || 1,
      limit: 12,
      sort: {
        createdAt: 1
      },
      // populate: 'patient receiving_doctor',
      populate: [
        {
          path: 'invoicing_doctor'
        }
      ]
    }

    InvoiceModel
    .paginate(
      query,
      options, // options
      (err, results) => {
        if (err) console.error(err)
        console.log(results)
        res.json(results)
      }
    )
  },
  // index: (req, res, next) => {
  //   console.log('index invoice req accepted')
  //   InvoiceModel
  //   .find()
  //   .populate('invoicing_doctor')
  //   .exec((err, results) => {
  //     console.log('responding to req')
  //     if (err) console.error(err)
  //     res.json(results)
  //   })
  // },

  show: (req, res, next) => {
    InvoiceModel
    .findById(req.params.id)
    .populate({
      path: 'invoicing_doctor',
      populate: { path: 'hospital' }
    })
    .populate({
      path: 'transactions.transaction',
      populate: { path: 'patient' }
    })
    .populate({
      path: 'transactions.addons.item'
    })
    .exec((err, results) => {
      if (err) console.error(err)
      res.json(results)
    })
  },

  create: (req, res, next) => {
    const newInvoice = new InvoiceModel(req.body)

    newInvoice.save()
    .then((savedInvoice) => {
      console.log('savedInvoice', savedInvoice)
      const commsPromise = savedInvoice.transactions.map((item) => {
        const { transaction: transactionId, receivable: { amount: invoiceAmount } } = item
        const { _id: invoiceId } = savedInvoice
        return CommissionModel.findOneAndUpdate(transactionId, {
          invoiceAmount,
          invoiceId
        })
      })

      return Promise.all(commsPromise)
      .then(() => {
        return savedInvoice
      })
    })
    .then((savedInvoice) => {
      console.log('savedInvoice', savedInvoice)
      res.json(savedInvoice)
    })
    .catch((err) => {
      console.log('errors', err)
      res.json(err)
    })

    // newInvoice.save((err, saved) => {
    //   console.log('invoice create error', err)
    //   err
    //   ? res.json(err)
    //   : res.json(saved)
    // })
  },

  updateInvoiceStatus: (req, res, next) => {
    console.log(req.body)
    const { id } = req.params
    const {
      name
    } = req.body


    const opts = [
      { path: 'invoicing_doctor', populate: { path: 'hospital' } },
      { path: 'transactions.transaction', populate: { path: 'patient' } },
      { path: 'transactions.addons.item' }
    ]


    InvoiceModel
    .findById(id)
    .then((foundInvoice) => {
      console.log('invoice to update', foundInvoice)
      foundInvoice.statuses.push({ name })
      return foundInvoice.save()
    })
    .then((savedInvoice) => {
      return InvoiceModel.populate(savedInvoice, opts)
    })
    .then((populatedInvoice) => {
      res.json(populatedInvoice)
    })
    .catch((err) => res.json(err))
  }
}
