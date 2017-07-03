// express setup
const express = require('express')
const app = express()
const port = process.env.PORT || 8888
// cors setup
const cors = require('cors')
const whitelist = []
const corsOptions = {
  origin: 'http://localhost:3000'
}
app.use(cors(corsOptions))

// body-parser setup
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// firebase token auth
const auth = require('./firebase').auth
app.all('*', (req, res, next) => {
  console.log('req.headers', req.headers.authorization)

  let reqHeaders = req.headers.authorization ? req.headers.authorization.split(' ') : ''

  if (reqHeaders[0] !== 'Bearer' || reqHeaders[0] === '') {
    res.json({msg: 'User Not Authorized.'})
  } else {
    auth.verifyIdToken(reqHeaders[1])
    .then((decodedToken) => {
      console.log('User Verified', decodedToken)
      next()
    })
    .catch(() => res.json({msg: 'User Not Authorized.'}))
  }
})

app.listen(port, () => {
  console.log(`app is running at ${port}`)
})
