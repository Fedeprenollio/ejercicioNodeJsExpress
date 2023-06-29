const jwt = require('jsonwebtoken')
const { SERVER_SECRET } = require('../middleware/auth-mdw')

const geterateToken = (userFoundInfo) => {
  const token = jwt.sign({ user: userFoundInfo.user.user, role: userFoundInfo.user.role || 'User' }, SERVER_SECRET)
  return token
}

module.exports = {
  geterateToken
}
