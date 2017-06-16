const assert = require('assert')

function _validateReq (req, value) {
  const parts = req.split(' ')
  let i, len = parts.length

  for (i = 0; i < len; ++i) {
    // TODO: error messages
    // TODO: switch to individual functions
    switch (parts[i]) {
      case 'optional':
        if (!value) return
        break
    
      case 'string': 
        assert.equal(typeof value, 'string')
        break

      case 'number':
        assert.equal(typeof value, 'number')
        break

      case 'boolean': 
        assert.equal(typeof value, 'boolean')
        break

      case 'object':
        assert.equal(typeof value, 'object')
        break

      case 'array':
        assert.equal(value.constructor, Array)
        break

      case 'numeric':
        assert.notEqual(+value, NaN)
        break

      case 'truthy':
        assert(value)
        break
    }
  }
}

function validate (schema, object) {
  // TODO: better error messages

  if (!schema) {
    throw new Error('error!')
  }

  if (typeof schema === 'string') {
    _validateReq(schema, object)
    return
  }
  
  const fields = Object.keys(Object.assign({}, object, schema))
  for (const key of fields) {
    validate(schema[key], object[key])
  }
}

function isValid (schema, object) {
  try {
    validate(schema, object)
    return true
  } catch (e) {
    return false
  }
}

module.exports = {
  validate,
  isValid
}
