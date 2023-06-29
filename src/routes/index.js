const libraryRouter = require('./library')
const bookRouter = require('./book')
const userRouter = require('./user')
const authRouter = require('./auth')
const adminRouter = require('./admin')
const searchRouter = require('./search')

module.exports = {
  libraryRouter,
  bookRouter,
  userRouter,
  authRouter,
  adminRouter,
  searchRouter
}
