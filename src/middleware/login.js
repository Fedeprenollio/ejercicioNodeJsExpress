const loggingMiddleware = (req, res, next) => {
  console.log(`LLamada a  ${req.url} con el metodo ${req.method}`)
  console.log(`Authorization:  ${req.get('Authorization')}`)
  next()
}

module.exports = loggingMiddleware
