const { userProvider } = require('../providers')

const createUser = async (newUser) => {
  return await userProvider.createUser(newUser)
}

const getUser = async (userId) => {
  return await userProvider.getUser(userId)
}

const deleteUser = async (userId) => {
  return await userProvider.deleteUser(userId)
}

const validateUser = async (user, password) => {
  const userFound = await userProvider.validateUser({ user, password })
  return userFound
}

const updateUser = async (userId, newData, role, user) => {
  return await userProvider.updateUser(userId, newData, role, user)
}

// ● Acciones
// ○ Login

module.exports = {
  createUser,
  getUser,
  deleteUser,
  validateUser,
  updateUser
}
