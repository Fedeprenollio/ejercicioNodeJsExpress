const { SERVER_SECRET } = require('../middleware/auth-mdw')
const jwt = require('jsonwebtoken')
const { userProvider } = require('../providers')

const loginUser = async (user, password) => {
  const userFoundInfo = await userProvider.validateUser({ user, password })
  if (userFoundInfo.success === true) {
    const token = jwt.sign({ user: userFoundInfo.user.user, role: userFoundInfo.user.role || 'User' }, SERVER_SECRET)
    return { token }
  } else {
    return userFoundInfo
  }
  // }
}

module.exports = { loginUser }
