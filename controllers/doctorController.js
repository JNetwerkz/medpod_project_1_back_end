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
    const {
      search,
      page
    } = req.query

    const parsedPage = parseInt(page)

    const query = { $regex: search || '', $options: 'i' }
    const options = {
      page: parsedPage || 1,
      limit: 12,
      sort: {
        'last name': 1,
        'first name': 1
      }
    }

    DoctorModel
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

  show: (req, res, next) => {
    console.log(req.params)
    DoctorModel
    .findById(req.params.id)
    .populate('hospital')
    .exec((err, results) => {
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
  },

  update: (req, res, next) => {
    const {
      params: {id},
      body
    } = req

    const {
      'first name': firstName,
      'last name': lastName,
      gender,
      hospital
    } = body

    console.log(id, body)

    DoctorModel.findById(id).exec((err, foundDoctor) => {
      if (err) console.error(err)

      foundDoctor['first name'] = firstName
      foundDoctor['last name'] = lastName
      foundDoctor.gender = gender
      foundDoctor.hospital = hospital

      console.log(foundDoctor)


      // foundDoctor.save((err, saved, next) => {
      //   if (err) console.error(err)
      //   res.json(saved)
      // })

      const updatePromise = foundDoctor.save().then((saved) => {
        return saved
      })

      updatePromise.then((savedDoctor) => {
        DoctorModel
        .findById(savedDoctor._id)
        .populate('hospital')
        .exec((err, foundDoctor) => {
          if (err) console.error(err)
          res.json(foundDoctor)
        })
      })

    })
  }
}
