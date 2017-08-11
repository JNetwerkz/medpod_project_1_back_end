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
    console.log(req.body)
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
      hospital,
      associationName,
      associationAddress_street,
      associationAddress_unit,
      associationAddress_postalcode,
      associationAddress_country,
      associationPhoneNumber,
      associationEmail
    } = body

    DoctorModel
    .findById(id)
    .then((foundDoctor) => {
      console.log('foundDoc', foundDoctor)
      foundDoctor['first name'] = firstName
      foundDoctor['last name'] = lastName
      foundDoctor.gender = gender
      foundDoctor.hospital = hospital
      foundDoctor.associationName = associationName
      foundDoctor.associationAddress_street = associationAddress_street
      foundDoctor.associationAddress_unit = associationAddress_unit
      foundDoctor.associationAddress_postalcode = associationAddress_postalcode
      foundDoctor.associationAddress_country = associationAddress_country
      foundDoctor.associationPhoneNumber = associationPhoneNumber
      foundDoctor.associationEmail = associationEmail

      return foundDoctor.save()
    })
    .then((savedDoctor) => {
      console.log('saved', savedDoctor)
      return DoctorModel
      .findById(savedDoctor._id)
      .populate('hospital')
    })
    .then((foundDoctor) => {
      console.log('second found', foundDoctor)
      res.json(foundDoctor)
    })
    .catch((err) => {
      console.log('err yo')
      res.json(err)
    })
    // DoctorModel.findById(id).exec((err, foundDoctor) => {
    //   if (err) return res.json(err)
    //
    //   foundDoctor['first name'] = firstName
    //   foundDoctor['last name'] = lastName
    //   foundDoctor.gender = gender
    //   foundDoctor.hospital = hospital
    //
    //   const updatePromise = foundDoctor.save().then((saved) => {
    //     return saved
    //   })
    //
    //   updatePromise
    //   .then((savedDoctor) => {
    //     DoctorModel
    //     .findById(savedDoctor._id)
    //     .populate('hospital')
    //     .exec((err, foundDoctor) => {
    //       err
    //       ? res.json(err)
    //       : res.json(foundDoctor)
    //       // if (err) console.error(err)
    //       // res.json(foundDoctor)
    //     })
    //   })
    //   .catch((err) => {
    //     return res.json(err)
    //   })
    // })
  }
}
