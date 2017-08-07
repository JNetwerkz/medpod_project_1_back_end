const AgentModel = require('../models/Agent')
const TransactionModel = require('../models/Transaction')
const sequelizeJSON = require('../script/sequelizeJSON')
const querystring = require('querystring')

module.exports = {
  searchTransaction: (req, res, next) => {
    const {
      id: agentId
    } = req.params

    const {
      search,
      page
    } = req.query

    const query = querystring.parse(search)
    if (!query['transaction month']) delete query['transaction month']

    const parsedPage = parseInt(page)

    const options = {
      page: parsedPage || 1,
      limit: 12,
      sort: {
        'invoice date': 1
      },
      // populate: 'patient receiving_doctor',
      populate: [{
          path: 'patient',
          populate: {
            path: 'referral_agent'
          }
        },
        {
          path: 'receiving_doctor'
        }
      ]
    }

    TransactionModel
      .paginate(query, options)
      .then((results) => {
        results.docs = results.docs.filter((transaction, index) => {
          const {
            patient: {
              referral_agent: {
                _id: referralAgentId
              }
            }
          } = transaction
          if (referralAgentId.toString() === agentId) return transaction
        })
        res.json(results)
      })
  },

  search: (req, res, next) => {
    console.log('search agent req accepted')
    const query = {
      $regex: req.query.search,
      $options: 'i'
    }
    AgentModel
      .find({
        $or: [{
            'first name': query
          },
          {
            'last name': query
          }
        ]
      })
      .exec((err, results) => {
        if (err) console.error(err)
        res.json(results)
      })
  },

  index: (req, res, next) => {
    // console.log('index agent req accepted', req.query)
    const {
      search,
      page
    } = req.query

    const parsedPage = parseInt(page)

    const query = {
      $regex: search || '',
      $options: 'i'
    }
    const options = {
      page: parsedPage || 1,
      limit: 12,
      sort: {
        'last name': 1,
        'first name': 1
      }
    }

    AgentModel
      .paginate({
          $or: [{
              'first name': query
            },
            {
              'last name': query
            }
          ]
        }, // query
        options, // options
        (err, results) => {
          if (err) console.error(err)
          console.log(results)
          res.json(results)
        }
      )
  },
  // index: (req, res, next) => {
  //   console.log('index agent req accepted')
  //   AgentModel.find().exec((err, results) => {
  //     console.log('responding to index agent req')
  //     if (err) console.error(err)
  //     res.json(results)
  //   })
  // },

  show: (req, res, next) => {
    console.log(req.params)
    AgentModel.findById(req.params.id).exec((err, results) => {
      console.log('responding to show agent req')
      if (err) console.error(err)
      res.json(results)
    })
  },

  create: (req, res, next) => {
    const newAgent = new AgentModel(req.body)

    newAgent.save((err, saved, next) => {
      err
        ?
        res.json(err) :
        res.json(saved)
    })
  },

  update: (req, res, next) => {
    console.log(req.body)
    const {
      params: {
        id
      },
      body
    } = req

    const {
      'first name': firstName,
      'last name': lastName,
      gender
    } = body

    AgentModel.findById(id).exec((err, foundAgent) => {
      if (err) return res.json(err)

      foundAgent['first name'] = firstName
      foundAgent['last name'] = lastName
      foundAgent.gender = gender
      console.log(foundAgent)
      foundAgent.save((err, saved, next) => {
        console.log(err)
        err
          ?
          res.json(err) :
          res.json(saved)
      })
    })
  }
}