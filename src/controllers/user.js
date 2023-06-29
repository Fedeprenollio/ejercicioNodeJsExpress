const { userService } = require('../services')

const createUser = async (req, res) => {
  const newData = req.body
  try {
    const newUser = await userService.createUser(newData)
    res.json(newUser)
  } catch (error) {
    res.status(500).json({ action: 'createUser', error: error.message })
  }
}

const getUser = async (req, res) => {
  const { userId } = req.params
  try {
    // NOTA: le dejo al provider la decision de retornar una sola libreria o todas dependiendo si le llega o no un parametro a su función
    const foundUsers = await userService.getUser(userId)

    if (!foundUsers) {
      return res
        .status(404)
        .json(foundUsers)
    } else {
      res.json(foundUsers)
    }
  } catch (error) {
    res.status(404).json({ action: 'Get user', error: error.message })
  }
}

const deleteUser = async (req, res) => {
  const { userId } = req.params
  try {
    const foundUser = await userService.deleteUser(userId)

    if (!foundUser.success) {
      return res
        .status(404)
        .json(foundUser)
    } else {
      res.json(foundUser)
    }
  } catch (error) {
    res.status(404).json({ action: 'Delete user', error: error.message })
  }
}

const updateUser = async (req, res) => {
  const { userId } = req.params
  const { role, user } = req.user
  console.log('QUE USER', role)
  try {
    const foundUserToUpdate = await userService.updateUser(userId, req.body, role, user)

    if (!foundUserToUpdate.success) {
      return res
        .status(404)
        .json(foundUserToUpdate)
    } else {
      res.json(foundUserToUpdate)
    }
  } catch (error) {
    res.status(404).json({ action: 'Update library', error: error.message })
  }
}

module.exports = {
  createUser,
  getUser,
  deleteUser,
  updateUser
}
