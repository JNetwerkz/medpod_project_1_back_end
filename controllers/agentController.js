const AgentModel = require('../models/Agent')
const sequelizeJSON = require('../script/sequelizeJSON')

module.exports = {
  search: (req, res, next) => {
    console.log('search agent req accepted')
    const query = { $regex: req.query.search, $options: 'i' }
    AgentModel
    .find({
      $or: [
          { 'first name': query },
          { 'last name': query }
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

    console.log(typeof page)

    const query = { $regex: search || '', $options: 'i' }
    const options = {
      page: parsedPage || 1,
      limit: 12,
      sort: {
        'last name': 1,
        'first name': 1
      }
    }

    AgentModel
    .paginate(
      {
        $or: [
          { 'first name': query },
          { 'last name': query }
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
      if (err) {
        res.json(err)
      } else {
        res.json(saved)
      }
    })
  },

  update: (req, res, next) => {
    const {
      params: {id},
      body
    } = req

    const {
      'first name': firstName,
      'last name': lastName,
      gender
    } = body

    console.log(id, body)

    AgentModel.findById(id).exec((err, foundAgent) => {
      if (err) console.error(err)

      foundAgent['first name'] = firstName
      foundAgent['last name'] = lastName
      foundAgent.gender = gender

      foundAgent.save((err, saved, next) => {
        if (err) console.error(err)
        res.json(saved)
      })
    })
  }
}
