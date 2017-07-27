const InvoiceModel = require('../models/Invoice')

module.exports = {
  index: (req, res, next) => {
    console.log('index invoice req accepted')
    InvoiceModel
    .find()
    .populate('invoicing_doctor')
    .exec((err, results) => {
      console.log('responding to req')
      if (err) console.error(err)
      res.json(results)
    })
  },

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
    console.log(req.body)

    const newInvoice = new InvoiceModel(req.body)

    newInvoice.save((err, saved) => {
      if (err) {
        res.json(err)
      } else {
        res.json(saved)
      }
    })
  }
}
