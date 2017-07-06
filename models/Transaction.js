const mongoose = require('mongoose')

const transactionObj = {
  'patient': {
    type: mongoose.Schema.Types.ObjectId
  },
  'invoice date': {
    type: Date
  }
}
