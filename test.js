const schema = require('.')
const person = require('./example.json')
const fancyPerson = {
  first_name: 'string',
  middle_name: 'optional string',
  last_name: 'string',
  age: 'number',
  job: {
    company: 'optional string',
    title: 'string'
  } 
}

schema.validate(person, {
  first_name: 'daniel',
  middle_name: 'de',
  last_name: 'vito'
})

schema.validate(person, {
  first_name: 'daniel',
  last_name: 'vito'
})

try {
  schema.validate(person, {
    last_name: 'vito'
  })
} catch (e) {
  console.log(e.message)
}

try {
  schema.validate(fancyPerson, {
    first_name: 'danny',
    last_name: 'devito',
    age: 667,
    job: {
      company: 'paddy\'s pub',
      title: 69
    }
  })
} catch (e) {
  console.log(e.message)
}
