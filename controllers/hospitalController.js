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
        name: 1
      }
    }

    HospitalModel
    .paginate(
      {
        name: query
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
  },

  update: (req, res, next) => {
    const {
    params: {id},
    body
  } = req

    const {
      name,
      nameAbbreviation,
      associationAddress_street,
      associationAddress_unit,
      associationAddress_postalcode,
      associationAddress_country,
      associationPhoneNumber,
      associationEmail
  } = body

    HospitalModel
    .findById(id)
    .then((foundHospital) => {
      foundHospital.name = name
      foundHospital.nameAbbreviation = nameAbbreviation
      foundHospital.associationAddress_street = associationAddress_street
      foundHospital.associationAddress_unit = associationAddress_unit
      foundHospital.associationAddress_postalcode = associationAddress_postalcode
      foundHospital.associationAddress_country = associationAddress_country
      foundHospital.associationPhoneNumber = associationPhoneNumber
      foundHospital.associationEmail = associationEmail

      return foundHospital.save()
    })
    // .then((savedHospital) => {
    //   return HospitalModel
    //     .findById(savedHospital._id)
    // })
    .then((foundHospital) => {
      res.json(foundHospital)
    })
    .catch((err) => {
      res.json(err)
    })
  }
}
