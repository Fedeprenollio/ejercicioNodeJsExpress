const { SERVER_SECRET } = require('../middleware/auth-mdw')
const jwt = require('jsonwebtoken')
const { userProvider } = require('../providers')

const loginUser = async (user, password) => {
  if (user === 'admin' && password === 'admin') {
    const token = jwt.sign({ user, role: 'Admin' }, SERVER_SECRET, {
      expiresIn: '10m'
    })
    return token
  } else {
    const userFound = await userProvider.validateUser({ user, password })
    if (userFound.success === true) {
      const token = jwt.sign({ user, role: 'User' }, SERVER_SECRET)
      return {token}
    } else {
      return userFound
    }
  }
}

module.exports = { loginUser }
