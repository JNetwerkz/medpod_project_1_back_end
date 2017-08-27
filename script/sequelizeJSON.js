module.exports = (params) => {
  const output = {}
  params.forEach((item) => {
    let key = item.name
    let val = item.value

    item.value ? output[key] = val : ''
  })

  return output
}
