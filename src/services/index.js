const libraryService = require('./library')
const bookService = require('./book')
const userService = require('./user')
const authService = require('./auth')
const adminService = require('./admin')

module.exports = {
  libraryService,
  bookService,
  userService,
  authService,
  adminService
}
