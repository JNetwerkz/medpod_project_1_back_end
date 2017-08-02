const mongoose = require('mongoose')

const addonObj = {
  'name': {
    type: String,
    required: [true, 'Please specify NAME for Add-on']
  }
}

const addonSchema = new mongoose.Schema(addonObj)

module.exports = {
  Model: mongoose.model('Addon', addonSchema),
  addonSchema
}
