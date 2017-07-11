const DoctorModel = require('../models/Doctor')
const sequelizeJSON = require('../script/sequelizeJSON')

module.exports = {
  search: (req, res, next) => {
    console.log('search doctor req accepted')
    const query = {$regex: req.query.search, $options: 'i'}
    DoctorModel
    .find({
        $or: [
          { 'first name': query },
          { 'last name': query }
          // search hospital here
        ]
      })
    .exec((err, results) => {
      if (err) console.error(err)
      res.json(results)
    })
  },

  index: (req, res, next) => {
    console.log('index doctor req accepted')
    DoctorModel.find().exec((err, results) => {
      console.log('responding to index patient req')
      if (err) console.error(err)
      res.json(results)
    })
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
