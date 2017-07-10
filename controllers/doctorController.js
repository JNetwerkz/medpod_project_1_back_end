const DoctorModel = require('../models/Doctor')
const sequelizeJSON = require('../script/sequelizeJSON')

module.exports = {
  search: (req, res, next) => {

  },
  index: (req, res, next) => {

  },
  show: (req, res, next) => {
    console.log(req.params)
    DoctorModel.findById(req.params.id).exec((err, results) => {
      console.log('responding to show doctor req')
      if (err) console.error(err)
      res.json(results)
    })
  },
  create: (req, res, next) => {
    const newDoctor = new DoctorModel(req.body)

    newDoctor.save((err, saved, next) => {
      if (err) {
        res.json(err)
      } else {
        res.json(saved)
      }
    })
  }
}
