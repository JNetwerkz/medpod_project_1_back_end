const sequelizeJSON = require('../script/sequelizeJSON')
const aws = require('aws-sdk')
const fs = require('fs')
const path = require('path')
const querystring = require('querystring')

const TransactionModel = require('../models/Transaction')

module.exports = {
  search: (req, res, next) => {
    console.log('search transaction req accepted')
    console.log(req)

    const query = req.query

    // if (!query.receiving_doctor) delete query.receiving_doctor

    TransactionModel
    .find(query)
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
    console.log(req.query)
    const {
      search,
      page
    } = req.query


    const query = querystring.parse(search)
    console.log(query)

    const parsedPage = parseInt(page)

    const options = {
      page: parsedPage || 1,
      limit: 12,
      populate: 'patient',
      sort: {
        'patient: first name': 1
      }
    }

    TransactionModel
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
