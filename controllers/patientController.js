const PatientModel = require('../models/Patient')

module.exports = {
  index: (req, res, next) => {
    console.log('index patient req accepted')
    PatientModel.find().exec((err, results) => {
      console.log('responding to index patient req')
      if (err) console.error(err)
      res.json(results)
    })
  },

  show: (req, res, next) => {

  },

  create: (req, res, next) => {
    console.log('create patient req accepted', req.body)
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
