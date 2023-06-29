const { adminService } = require('../services')

const getBookAdmin = async (req, res) => {
  const { bookId } = req.params
  const { bring, onlyDeleted } = req.query

  try {
    // NOTA: le dejo al provider la decision de retornar una sola libreria o todas dependiendo si le llega o no un parametro a su función
    const bookFound = await adminService.getBookAdmin(bookId, bring, onlyDeleted)

    if (!bookFound) {
      return res
        .status(404)
        .json({ action: 'get book admin', error: 'Library not found' })
    } else {
      res.json(bookFound)
    }
  } catch (error) {
    res.status(404).json({ action: 'Get book admin', error: error.message })
  }
}

const restoreBook = async (req, res) => {
  const { bookId } = req.params
  try {
    const bookFound = await adminService.restoreBook(bookId)

    if (!bookFound.success) {
      return res
        .status(404)
        .json(bookFound)
    } else {
      res.json(bookFound)
    }
  } catch (error) {
    res.status(404).json({ action: 'Recover library', error: error.message })
  }
}

const getUserAdmin = async (req, res) => {
  const { userId } = req.params
  const { bring, onlyDeleted } = req.query

  try {
    // NOTA: le dejo al provider la decision de retornar una sola libreria o todas dependiendo si le llega o no un parametro a su función
    const userFound = await adminService.getUserAdmin(userId, bring, onlyDeleted)

    if (!userFound) {
      return res
        .status(404)
        .json({ action: 'get user by super admin', error: 'user not found' })
    } else {
      res.json(userFound)
    }
  } catch (error) {
    res.status(404).json({ action: 'Get user by super admin', error: error.message })
  }
}

const restoreUser = async (req, res) => {
  const { userId } = req.params
  try {
    const userFound = await adminService.restoreUser(userId)
    if (!userFound.success) {
      return res
        .status(404)
        .json(userFound)
    } else {
      res.json(userFound)
    }
  } catch (error) {
    res.status(404).json({ action: 'Recover library', error: error.message })
  }
}

module.exports = {
  getBookAdmin,
  restoreBook,
  getUserAdmin,
  restoreUser
}
