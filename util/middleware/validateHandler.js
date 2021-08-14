function validate(data, schema) {
  const result = schema.validate(data)
  return result.error
}

function validateHandler(schema, check = 'body') {
  return function (req, res, next) {
    const error = validate(req[check], schema)
    error ? next(error) : next()
  }
}

module.exports = validateHandler
