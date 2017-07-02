const assert = require('assert')

function makeTypeMessage(type, value) {
  return `Expected value to be a 'string'. Got type '${typeof value}'. Value is: '${value}'`
}

module.exports = {
  string: (v) => assert.equal(typeof v, 'string', makeTypeMessage('string', v)),
  number: (v) => assert.equal(typeof v, 'number', makeTypeMessage('number', v)),
  boolean: (v) => assert.equal(typeof v, 'boolean', makeTypeMessage('boolean', v)),
  object: (v) => assert.equal(typeof v, 'object', makeTypeMessage('object', v)),
  array: (v) => assert.equal(v.constructor, Array, `Expected value to be of class 'Array'. Value is: '${value}'`),
  numeric: (v) => assert.isFalse(isNaN(+v), `Expected value to be coercible to a number, but got 'NaN'. Value is: '${value}'`),
  truthy: (v) => assert(v),
  integer: (v) => assert.isTrue(String(v).match(/^(0|[1-9][0-9]+)$/), `Expected value to be a valid integer. Value is: '${value}'`)
}
