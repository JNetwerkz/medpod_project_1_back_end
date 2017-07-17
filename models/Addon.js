const mongoose = require('mongoose')

const addonObj = {
  'name': {
    type: String
  }
}

const addonSchema = new mongoose.Schema(addonObj)

module.exports = {
  Model: mongoose.model('Addon', addonSchema),
  addonSchema
}
