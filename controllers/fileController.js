const FileModel = require('../models/File')

module.exports = {
  index: (req, res, next) => {
    console.log('index file req accepted', req.query)
    const query = req.query ? req.query : ''
    FileModel
    .find(query)
    // .populate('invoicing_doctor')
    .exec((err, results) => {
      console.log('responding to req')
      if (err) console.error(err)
      res.json(results)
    })
  },
  //
  // show: (req, res, next) => {
  //   InvoiceModel
  //   .findById(req.params.id)
  //   .populate('invoicing_doctor')
  //   .populate({
  //     path: 'transactions.transaction'
  //   })
  //   .exec((err, results) => {
  //     if (err) console.error(err)
  //     res.json(results)
  //   })
  // },

  create: (req, res, next) => {
    console.log(req.body)

    const newFile = new FileModel(req.body)

    newFile.save((err, saved) => {
      if (err) {
        res.json(err)
      } else {
        res.json(saved)
      }
    })
  },
  delete: (req, res, next) => {
    FileModel
    .findById(req.params.id)
    .remove()
    .exec((err, deleted) => {
      if (err) res.json(err)
      res.json(deleted)
    })
  }
}
