const libraryProvider = require('./library')
const bookProvider = require('./book')
const userProvider = require('./user')
const adminProvider = require('./admin')
const searchProvider = require('./search')
// const authProvider = require('./auth')

module.exports = { libraryProvider, bookProvider, userProvider, adminProvider, searchProvider }
