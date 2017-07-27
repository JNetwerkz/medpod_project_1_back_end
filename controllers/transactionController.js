const sequelizeJSON = require('../script/sequelizeJSON')
const aws = require('aws-sdk')
const fs = require('fs')
const path = require('path')

const TransactionModel = require('../models/Transaction')

module.exports = {
  search: (req, res, next) => {
    console.log('search transaction req accepted')
    console.log(req)
    TransactionModel
    .find(req.query)
    .populate('patient')
    .populate({
      path: 'receiving_doctor'
    })
    .exec((err, results) => {
      console.log('responding to req')
      if (err) console.error(err)
      res.json(results)
    })
  },

  index: (req, res, next) => {
    console.log('index transaction req accepted')
    TransactionModel
    .find()
    .populate('patient')
    .exec((err, results) => {
      console.log('responding to req')
      if (err) console.error(err)
      res.json(results)
    })
  },

  show: (req, res, next) => {
    TransactionModel
    .findById(req.params.id)
    .populate('patient')
    .populate('receiving_doctor')
    .exec((err, results) => {
      console.log('responding to show transaction req')
      if (err) console.error(err)
      res.json(results)
    })
  },

  create: (req, res, next) => {
    console.log(req.body)
    const newTransaction = new TransactionModel(req.body)
    console.log(newTransaction)

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
