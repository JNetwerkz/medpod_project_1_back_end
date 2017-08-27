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
    .populate('referral_agent')
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
      populate: 'referral_agent',
      limit: 12,
      sort: {
        'last name': 1,
        'first name': 1
      }
    }

    PatientModel
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
    PatientModel
    .findById(req.params.id)
    .populate('referral_agent')
    .exec((err, results) => {
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
    const {
      params: {id},
      body
    } = req

    const {
      'first name': firstName,
      'last name': lastName,
      gender,
      'ic / passport': icPassport,
      referral_agent: referralAgent,
      personalPhoneNumber,
      personalEmail,
      additionalInfo,
      dob
    } = body

    PatientModel
    .findById(id)
    .then((foundPatient) => {
      console.log('foundp', foundPatient)
      foundPatient['first name'] = firstName
      foundPatient['last name'] = lastName
      foundPatient['ic / passport'] = icPassport
      foundPatient.gender = gender
      foundPatient.referral_agent = referralAgent
      foundPatient.personalPhoneNumber = personalPhoneNumber
      foundPatient.personalEmail = personalEmail
      foundPatient.additionalInfo = additionalInfo
      foundPatient.dob = dob

      return foundPatient.save()
    })
    .then((savedPatient) => {
      console.log('savedp', savedPatient)
      return PatientModel
        .findById(savedPatient._id)
        .populate('referral_agent')
    })
    .then((foundPatient) => {
      console.log('foundp 2', foundPatient)
      res.json(foundPatient)
    })
    .catch((err) => {
      console.log('err', err)
      res.json(err)
    })

    // PatientModel.findById(id).exec((err, foundPatient) => {
    //   if (err) console.error(err)
    //
    //   foundPatient['first name'] = firstName
    //   foundPatient['last name'] = lastName
    //   foundPatient['ic / passport'] = icPassport
    //   foundPatient.gender = gender
    //   foundPatient.referral_agent = referralAgent
    //
    //   console.log(foundPatient)
    //
    //   // foundPatient.save((err, saved, next) => {
    //   //   if (err) console.error(err)
    //   //   res.json(saved)
    //   // })
    //
    //   const updatePromise = foundPatient.save().then((saved) => {
    //     return saved
    //   })
    //
    //   updatePromise.then((savedPatient) => {
    //     PatientModel
    //     .findById(savedPatient._id)
    //     .populate('referral_agent')
    //     .exec((err, foundPatient) => {
    //       if (err) console.error(err)
    //       res.json(foundPatient)
    //     })
    //   })
    // })
  },

  destroy: (req, res, next) => {

  }
}
