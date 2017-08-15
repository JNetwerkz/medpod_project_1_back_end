const admin = require('firebase-admin')

const clientAdmin = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.GOOGLE_ADMIN_PROJECT_ID,
    clientEmail: process.env.GOOGLE_ADMIN_CLIENT_EMAIL,
    // privateKey: JSON.parse(process.env.GOOGLE_ADMIN_PRIVATE_KEY)
    privateKey: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? process.env.GOOGLE_ADMIN_PRIVATE_KEY : JSON.parse(process.env.GOOGLE_ADMIN_PRIVATE_KEY)
  })
})

module.exports = {
  auth: clientAdmin.auth()
}
