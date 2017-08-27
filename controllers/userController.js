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
    console.log(req.body)
    const {
      email,
      password,
      displayName,
      userType
    } = req.body

    adminAuth.createUser({
      email, password, displayName
    })
    .then((createdUser) => {
      res.json(createdUser)
    })
    .catch((err) => {
      res.json({ errors: err })
    })
  },

  destroy: (req, res, next) => {
    const { id } = req.params
    adminAuth.deleteUser(id)
    .then(() => {
      res.json()
    })
    .catch((err) => console.error('Error deleting user', err))
  }
}
