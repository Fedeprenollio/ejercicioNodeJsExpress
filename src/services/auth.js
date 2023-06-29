const { tokenServices } = require('../Utils')
const { userProvider } = require('../providers')

const loginUser = async (user, password) => {
  const userFoundInfo = await userProvider.validateUser({ user, password })

  if (userFoundInfo.success === true) {
    const token = tokenServices.geterateToken(userFoundInfo)
    return { token }
  } else {
    // Enviamos el error { success: false, error: 'Invalid password or userName' }
    return userFoundInfo
  }
}

module.exports = { loginUser }
