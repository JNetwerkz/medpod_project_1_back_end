const CommissionModel = require('../models/Commission').Model
const querystring = require('querystring')

module.exports = {
  search: (req, res, next) => {
    console.log('search addon req accepted')
    const query = { $regex: req.query.search, $options: 'i' }
    AddonModel
    .find({
      $or: [
          { 'name': query }
      ]
    })
    .sort('name')
    .exec((err, results) => {
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

    let query = querystring.parse(search)

    if (!query.invoiceMonth) delete query.invoiceMonth

    const parsedPage = parseInt(page)

    console.log('qs query', query)
    console.log('parsedpage', parsedPage)

    const options = {
      page: parsedPage || 1,
      limit: 12,
      sort: {
        invoiceMonth: 1
      },
    // populate: 'patient receiving_doctor',
      populate: [
        {
          path: 'transactionId',
          populate: {
            path: 'patient'
          }
        },
        {
          path: 'referralAgentId'
        }
      ]
    }

    CommissionModel
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

  index: (req, res, next) => {
    console.log('index addon req accepted')
    AddonModel.find().sort({ status: 1, name: 1 }).exec((err, results) => {
      console.log('responding to index addon req')
      if (err) console.error(err)
      res.json(results)
    })
  },

  show: (req, res, next) => {
    console.log(req.params)
    AddonModel.findById(req.params.id).exec((err, results) => {
      console.log('responding to show addon req')
      if (err) console.error(err)
      res.json(results)
    })
  },

  create: (req, res, next) => {
    console.log(req.body)
    const newCommission = new CommissionModel(req.body)

    newCommission.save((err, saved, next) => {
      err
      ? res.json(err)
      : res.json(saved)
    })
  },

  updateStatus: (req, res, next) => {
    console.log(req)
    AddonModel
    .findById(req.params.id)
    .then((foundAddon) => {
      return foundAddon.update(req.body)
    })
    .then(() => {
      return AddonModel.find().sort('status name')
    })
    .then((results) => {
      res.json(results)
    })
    .catch((err) => res.json(err))
  }
}
