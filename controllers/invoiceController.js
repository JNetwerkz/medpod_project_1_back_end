const InvoiceModel = require('../models/Invoice')
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

    newInvoice.save((err, saved) => {
      console.log('invoice create error', err)
      err
      ? res.json(err)
      : res.json(saved)
    })
  },

  updateInvoiceStatus: (req, res, next) => {
    console.log(req.body)
    const { id } = req.params
    const {
      name
    } = req.body

    InvoiceModel
    .findById(id)
    .then((foundInvoice) => {
      console.log('invoice to update', foundInvoice)
      foundInvoice.statuses.push({ name })
      return foundInvoice.save()
    })
    .then((savedInvoice) => {
      res.json(savedInvoice)
    })
    .catch((err) => res.json(err))
  }
}
