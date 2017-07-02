class SchemaError extends Error {
  constructor () {
    super(...arguments)
    this.name = 'SchemaError'
  }
}

module.exports = {
  SchemaError
}
