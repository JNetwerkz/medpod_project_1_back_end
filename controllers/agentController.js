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
    console.log('index agent req accepted')
    AgentModel.find().exec((err, results) => {
      console.log('responding to index agent req')
      if (err) console.error(err)
      res.json(results)
    })
  },

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
  }
}
