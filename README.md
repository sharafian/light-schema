# Light Schema
> Schemas shouldn't be larger than the data they validate

`light-schema` is a module that lets you write simple schemas. For some use cases,
JSONSchema feels like overkill. Light schemas are very small, in comparison. They're
even small enough to embed in your code, if you're so inclined. 

```js
const { validate } = require('light-schema')

const personSchema = {
  firstName: 'string',
  middleName: 'optional string',
  lastName: 'string',
  age: 'integer number',
  phone: 'optional integer string',
  job: {
    company: 'string',
    title: 'string',
    salary: 'optional number',
  }
}

function registerPerson(person) {
  validate(personSchema, person)
  /* alternatively, `if (!isValid(personSchema, person))` can be used. */

  /* ... */
}
```

These basic checks should be enough to remove cumbersome validity checks from
your code like `if (typeof val === 'object' && val && typeof val.thing === 'string')`.

Semantic checks like mutually exclusive fields, checking exact values, etc. are
outside the scope of this module.

## How Light Schemas work

The way a light schema works is that it's a string of requirements. These
requirements enfore basic rules like type or whether a field is optional. The
requirements are processed one after another.

Let's use `optional numeric string` as an example.

1. `optional` : if the value in this field doesn't exist, validation on it is stopped without error.
2. `numeric` : if the value cannot be coerced to a number, an error is thrown.
3. `string` : if `typeof value !== 'string'`, an error is thrown.

So `"100"`, `undefined`, and `"43.13"` are valid, but `100` and `"abc"` are not.

## List of Requirements

| Name | Purpose |
|:--|:--|
| `optional` | If value does not exist, validation of value stops without error. |
| `string` | Asserts that value's type is `string`. |
| `number` | Asserts that value's type is `number`. |
| `boolean` | Asserts that value's type is `boolean`. |
| `object` | Asserts that value's type is `object`. |
| `array` | Asserts that value's constructor is `Array`. |
| `numeric` | Asserts that value can be coerced to a number. |
| `truthy` | Asserts that value is coerced to `true`. |
| `integer` | Asserts that value is a valid integer number or integer string. |
