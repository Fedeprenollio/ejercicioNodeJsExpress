const libraryService = require('./library')
const bookService = require('./book')
const userService = require('./user')
const authService = require('./auth')
const adminService = require('./admin')
const searchService = require('./search')

module.exports = {
  libraryService,
  bookService,
  userService,
  authService,
  adminService,
  searchService
}
