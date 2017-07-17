const AddonModel = require('../models/Addon').Model
const sequelizeJSON = require('../script/sequelizeJSON')

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
    .exec((err, results) => {
      if (err) console.error(err)
      res.json(results)
    })
  },

  index: (req, res, next) => {
    console.log('index addon req accepted')
    AddonModel.find().exec((err, results) => {
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
    const newAddon = new AddonModel(req.body)

    newAddon.save((err, saved, next) => {
      if (err) {
        res.json(err)
      } else {
        res.json(saved)
      }
    })
  }
}
