module.exports = ({ transactions }) => {
  let grandTotalAmount = 0
  transactions.forEach((item, index) => {
    const {
      receivable,
      addons
    } = item

    const receivableTotal = parseFloat(receivable.amount)

    const addOnTotal = addons.reduce((acc, val) => {
      if (val.amount === '') return acc
      acc = acc + parseFloat(val.amount)
      return acc
    }, 0)


    grandTotalAmount = grandTotalAmount + receivableTotal + addOnTotal
  })

  return grandTotalAmount
}
