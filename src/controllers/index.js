const libraryController = require('./library')
const bookController = require('./book')
const userControllers = require('./user')
const authControllers = require('./auth')

module.exports = {
  libraryController,
  bookController,
  userControllers,
  authControllers
}
