const requirements = require('./requirements.js')
const SchemaError = require('./errors.js').SchemaError

function _validateReq (req, value, stack) {
  const parts = req.split(' ')
  let i, len = parts.length

  for (i = 0; i < len; ++i) {
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
  if (!schema) {
    throw new Error(`Error: no schema rules for '${stack}'`)
  }

  if (typeof schema === 'string') {
    _validateReq(schema, object, stack)
    return
  }

  if (typeof object !== 'object' || typeof schema !== 'object') {
    throw new Error(`Both value and schema must be objects.` +
      ` Value ${object} cannot be validated with schema ${schema}`)
  }

  const fields = Object.keys(Object.assign({}, object, schema))
  for (const key of fields) {
    _validate(schema[key], object[key], stack + '.' + key)
  }
}

function validate (schema, object) {
  if (!schema) throw new Error('missing schema')
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
