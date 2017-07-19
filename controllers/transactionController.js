const sequelizeJSON = require('../script/sequelizeJSON')
const aws = require('aws-sdk')
const fs = require('fs')
const path = require('path')

const TransactionModel = require('../models/Transaction')

module.exports = {
  download: (req, res, next) => {
    aws.config.update(
      {
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        region: 'ap-southeast-1'
      }
)

    const s3 = new aws.S3()
    console.log(s3)

    const options = {
      Bucket: 'testingbucket-medipod',
      Key: 'front-end-web-developer-interview-questions.pdf'
    }

    res.attachment('file')
    var fileStream = s3.getObject(options).createReadStream()
    fileStream.pipe(res)
    // s3.getObject(options, (err, data) => {
    //   res.attachment('hi')
    //   var fileStream = data.createReadStream()
    //   fileStream.pipe(res)
    // })

    // var file = path.join(__dirname, 'file.pdf')

    // res.download('file.pdf')
    // var fileStream = s3.getObject(options).createReadStream()
    // fileStream.pipe(res)
  },
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
    .exec((err, results) => {
      console.log('responding to show transaction req')
      if (err) console.error(err)
      res.json(results)
    })
  },

  create: (req, res, next) => {
    console.log(req.body)
    const newTransaction = new TransactionModel(sequelizeJSON(req.body))
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
