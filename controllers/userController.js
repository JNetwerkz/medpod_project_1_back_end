const adminAuth = require('../firebase').auth

module.exports = {
  index: (req, res, next) => {
    console.log(req.body)
    const { body } = req
    const promise = Object.keys(body).map((uid) => {
      return adminAuth.getUser(uid)
    })

    Promise.all(promise)
    .then((allUserRecord) => {
      const userData = allUserRecord.map((userRecord) => {
        console.log(userRecord)
        const { email, uid, displayName, metadata: { lastSignInTime } } = userRecord
        return { email, lastSignInTime, uid, displayName, userType: body[uid] }
      })
      res.json(userData)
    })
    .catch((err) => console.error(err))
  },

  create: (req, res, next) => {

  },
  destroy: (req, res, next) => {

  }
}
