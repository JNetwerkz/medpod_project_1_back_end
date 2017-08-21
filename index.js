// setup dotenv
require('dotenv').config()

// express setup
const express = require('express')
const app = express()
const port = process.env.PORT || 8888

// cors setup
const cors = require('cors')
const corsOptions = {
  // origin: 'http://localhost:3000'
  // origin: ['http://localhost:3000', 'https://medipod-project1-cms-react.herokuapp.com', process.env.FRONTEND_REACT_URL || 'null']
  origin: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.FRONTEND_DOMAIN_URL || process.env.FRONTEND_HEROKU_URL
}

app.use(cors(corsOptions))
// app.use(cors())
app.use(express.static('public'))
// body-parser setup
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false, type: 'application/x-www-form-urlencoded'}))
app.use(bodyParser.json())

// mongodb setup
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
// const dbURI = 'mongodb://localhost:27017/Medipod_Project_1'
 const dbURI = process.env.MLAB_MONGODB_URI || 'mongodb://localhost:27017/Medipod_Project_1'
mongoose.connect(dbURI, {useMongoClient: true}, (err) => {
  if (err) console.error(err)
  console.log(`connected!`)
})
// const db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', () => console.log('connected to mongodb!'))

// firebase token auth
const auth = require('./firebase').auth
app.all('*', (req, res, next) => {
  console.log('req.headers', req.headers.authorization)

  let reqHeaders = req.headers.authorization ? req.headers.authorization.split(' ') : ''

  if (reqHeaders[0] !== 'Bearer' || reqHeaders[0] === '') {
    res.json({msg: 'Aucthorization required.'})
  } else {
    auth.verifyIdToken(reqHeaders[1])
    .then((decodedToken) => {
      console.log('User Verified', decodedToken)
      next()
    })
    .catch(() => res.json({msg: 'User Not Authorized.'}))
  }
})

// routers setup
app.get('/', (req, res) => {
  res.send('hello')
})
app.use('/transaction', require('./routers/transactionRouter'))
app.use('/patient', require('./routers/patientRouter'))
app.use('/doctor', require('./routers/doctorRouter'))
app.use('/hospital', require('./routers/hospitalRouter'))
app.use('/addon', require('./routers/addonRouter'))
app.use('/agent', require('./routers/agentRouter'))
app.use('/invoice', require('./routers/invoiceRouter'))
app.use('/file', require('./routers/fileRouter'))
app.use('/user', require('./routers/userRouter'))
app.use('/commission', require('./routers/commissionRouter'))

app.listen(port, () => {
  console.log(`app is running at ${port}`)
})
