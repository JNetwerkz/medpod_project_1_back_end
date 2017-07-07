const sequelizeJSON = require('../script/sequelizeJSON')

const TransactionModel = require('../models/Transaction')

module.exports = {
  index: (req, res, next) => {
    console.log('index transaction req accepted')
    TransactionModel.find().exec((err, results) => {
      console.log('responding to req')
      if (err) console.error(err)
      res.json(results)
    })
  },

  show: (req, res, next) => {
    TransactionModel.findById(req.params.id).exec((err, results) => {
      console.log('responding to show transaction req')
      if (err) console.error(err)
      res.json(results)
    })
  },

  create: (req, res, next) => {
    const newTransaction = new TransactionModel(sequelizeJSON(req.body))

    newTransaction.save((err, saved, next) => {
      console.log('responding to create transaction req')
      if (err) {
        console.err(err)
        res.json(err)
      } else {
        console.log(saved)
        console.log(saved.code)
        res.json(saved)
      }
    })
  }
}
