const libraryController = require('./library')
const bookController = require('./book')
const userControllers = require('./user')
const authControllers = require('./auth')
const adminControllers = require('./admin')
const searchControllers = require('./search')

module.exports = {
  libraryController,
  bookController,
  userControllers,
  authControllers,
  adminControllers,
  searchControllers
}
