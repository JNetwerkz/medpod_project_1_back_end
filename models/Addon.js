const mongoose = require('mongoose')

const addonObj = {
  'name': {
    type: String,
    required: [true, 'Please specify NAME for Add-on'],
    uppercase: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['active', 'archived'],
    lowercase: true,
    default: 'active'
  }
}

const addonSchema = new mongoose.Schema(addonObj)

module.exports = {
  Model: mongoose.model('Addon', addonSchema),
  addonSchema
}
