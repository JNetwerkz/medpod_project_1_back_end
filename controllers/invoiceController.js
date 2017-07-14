const InvoiceModel = require('../models/Invoice')

module.exports = {
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
