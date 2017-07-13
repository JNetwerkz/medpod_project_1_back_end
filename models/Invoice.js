const mongoose = require('mongoose')

const invoiceObj = {

}

const invoiceSchema = new mongoose.Schema(invoiceObj)

module.exports = mongoose.model('Invoice', invoiceSchema)
