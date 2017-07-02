const requirements = require('./requirements.js')
const SchemaError = require('./errors.js').SchemaError

function _validateReq (req, value, stack) {
  const parts = req.split(' ')
  let i, len = parts.length

  for (i = 0; i < len; ++i) {
    // TODO: error messages
    // TODO: switch to individual functions
    if (parts[i] === 'optional') {
      if (!value) return
      continue
    }

    try {
      requirements[parts[i]](value)
    } catch (e) {
      throw new SchemaError(`Error in '${stack}': ${e.message}`)
    }
  }
}

function _validate (schema, object, stack) {
  // TODO: better error messages

  if (!schema) {
    throw new Error('error!')
  }

  if (typeof schema === 'string') {
    _validateReq(schema, object, stack)
    return
  }

  if (typeof object !== 'object' || typeof schema !== 'object') {
    throw new Error('error')
  }

  const fields = Object.keys(Object.assign({}, object, schema))
  for (const key of fields) {
    _validate(schema[key], object[key], stack + '.' + key)
  }
}

function validate (schema, object) {
  return _validate(schema, object, 'Object')
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
  _validateReq,
  validate,
  isValid
}
