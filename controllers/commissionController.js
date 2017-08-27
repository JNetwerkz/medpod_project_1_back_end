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
    console.log('comms index', req.query)

    const {
    search,
    page
  } = req.query

    let query = querystring.parse(search)

    if (!query.transactionYear) delete query.transactionYear
    if (!query.transactionMonth) delete query.transactionMonth
    if (!query.referralAgentId) delete query.referralAgentId

    const parsedPage = parseInt(page)

    console.log('qs query', query)
    console.log('parsedpage', parsedPage)

    const options = {
      page: parsedPage || 1,
      limit: 12,
      // sort: {
      //   invoiceMonth: 1
      // },
    // populate: 'patient receiving_doctor',
      populate: [
        {
          path: 'transactionId',
          populate: {
            path: 'patient receiving_doctor'
          }
        },
        {
          path: 'referralAgentId'
        },
        {
          path: 'invoiceId'
        }
      ]
    }

    CommissionModel
    .paginate(
      query,
      options,
      (err, results) => {
        if (err) console.error(err)
        console.log(results)
        res.json(results)
      }
    )
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

  update: (req, res, next) => {
    console.log(req.body, req.params.id)
    CommissionModel
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    // .populate({
    //   path: 'transactionId',
    //   populate: {
    //     path: 'patient receiving_doctor'
    //   }
    // })
    // .populate('referralAgentId')
    // .populate('invoiceId')
    .then((foundCommission) => {
      const opts = [
        { path: 'transactionId',
          populate: { path: 'patient receiving_doctor' }
        },
        { path: 'referralAgentId' },
        { path: 'invoiceId' }
      ]
      return CommissionModel.populate(foundCommission, opts)
    })
    .then((populatedCommission) => {
      console.log('populatedCommission', populatedCommission)
      res.json(populatedCommission)
    })
    .catch((err) => res.json(err))
  }
}
