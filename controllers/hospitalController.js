const HospitalModel = require('../models/Hospital')
const sequelizeJSON = require('../script/sequelizeJSON')

module.exports = {
  search: (req, res, next) => {
    console.log('search hospital req accepted')
    const query = { $regex: req.query.search, $options: 'i' }
    HospitalModel
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
    console.log('index hospital req accepted')
    HospitalModel.find().exec((err, results) => {
      console.log('responding to index hospital req')
      if (err) console.error(err)
      res.json(results)
    })
  },

  show: (req, res, next) => {
    console.log(req.params)
    HospitalModel.findById(req.params.id).exec((err, results) => {
      console.log('responding to show hospital req')
      if (err) console.error(err)
      res.json(results)
    })
  },

  create: (req, res, next) => {
    const newHospital = new HospitalModel(req.body)

    newHospital.save((err, saved, next) => {
      if (err) {
        res.json(err)
      } else {
        res.json(saved)
      }
    })
  }
}
