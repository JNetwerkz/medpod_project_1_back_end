const PatientModel = require('../models/Patient')
const sequelizeJSON = require('../script/sequelizeJSON')

module.exports = {
  search: (req, res, next) => {
    console.log('search patient req accepted')
    const query = {$regex: req.query.search, $options: 'i'}
    PatientModel
    .find({
        $or: [
          { 'first name': query },
          { 'last name': query },
          { 'ic / passport': query }
        ]
      })
    .exec((err, results) => {
      if (err) console.error(err)
      res.json(results)
    })
  },

  index: (req, res, next) => {
    console.log('index patient req accepted')
    PatientModel.find().exec((err, results) => {
      console.log('responding to index patient req')
      if (err) console.error(err)
      res.json(results)
    })
  },

  show: (req, res, next) => {
    console.log(req.params)
    PatientModel.findById(req.params.id).exec((err, results) => {
      console.log('responding to show patient req')
      if (err) console.error(err)
      res.json(results)
    })
  },

  create: (req, res, next) => {
    const newPatient = new PatientModel(req.body)

    newPatient.save((err, saved, next) => {
      console.log('responding to create patient req')
      if (err) {
        res.json(err)
      } else {
        res.json(saved)
      }
    })
  },

  update: (req, res, next) => {

  },

  destroy: (req, res, next) => {

  }
}
