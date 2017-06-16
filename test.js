const schema = require('.')
const person = require('./example.json')

schema.validate(person, {
  first_name: 'daniel',
  middle_name: 'de',
  last_name: 'vito'
})

schema.validate(person, {
  first_name: 'daniel',
  last_name: 'vito'
})
