const { Op } = require('sequelize')
const { Book, User } = require('../models')

const getBookAdmin = async (bookId, bring, onlyDeleted) => {
  let whereCondition = {}

  if (bring === 'deleted') {
    whereCondition.deletedAt = { [Op.ne]: null }
  } else if (bring === 'no-deleted') {
    whereCondition.deletedAt = null
  } else if (bring === 'all') {
    whereCondition = {}
  }

  try {
    if (!bookId) {
      // Obtener todos los elementos, incluidos los eliminados, paranoid = false
      const foundBook = await Book.findAll({
        where: whereCondition,
        include: {
          all: true,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        paranoid: false,
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      if (foundBook.length === 0) {
        return { success: false, error: 'Book not found' }
      }
      return { success: true, book: foundBook }
    }

    const foundBook = await Book.findByPk(bookId, {
      include: {
        all: true,
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      },
      paranoid: false,
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })

    if (!foundBook) {
      return { success: false, error: 'Book not found' }
    }
    return { success: true, book: foundBook }
  } catch (error) {
    console.log(`Error looking for Book, ${error}`)
    return { success: false, error: error.message }
  }
}

const restoreBook = async (bookId) => {
  try {
    if (bookId) {
      // Recuperar una biblioteca eliminada por su ID
      const restoredBook = await Book.restore({ where: { id: bookId } })

      if (!restoredBook) {
        return { success: false, message: 'Book not found' }
      }

      return { success: true, message: 'Book restored successfully' }
    } else {
      // Recuperar todas las bibliotecas eliminadas
      const restoredBook = await Book.restore({ where: { deletedAt: { [Op.not]: null } } })

      if (restoredBook.length === 0) {
        return { success: false, message: 'No deleted Book found' }
      }

      return { success: true, message: 'All deleted Book restored successfully' }
    }
  } catch (error) {
    console.log(`Error restoring Book: ${error}`)
    return { success: false, error: error.message }
  }
}
const getUserAdmin = async (userId, bring) => {
  let whereCondition = {}

  if (bring === 'deleted') {
    whereCondition.deletedAt = { [Op.ne]: null }
  } else if (bring === 'no-deleted') {
    whereCondition.deletedAt = null
  } else if (bring === 'all') {
    whereCondition = {}
  }
  console.log(whereCondition)

  try {
    if (!userId) {
      // Obtener todos los elementos, incluidos los eliminados, paranoid = false
      const userFound = await User.findAll({
        where: whereCondition,
        include: {
          all: true,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        paranoid: false,
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      if (userFound.length === 0) {
        return { success: false, error: 'User not found' }
      }
      return { success: true, User: userFound }
    }

    const foundUser = await User.findByPk(userId, {
      include: {
        all: true,
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      },
      paranoid: false,
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })

    if (!foundUser) {
      return { success: false, error: 'User not found' }
    }
    return { success: true, User: foundUser }
  } catch (error) {
    console.log(`Error looking for User by super admin, ${error}`)
    return { success: false, error: error.message }
  }
}

const restoreUser = async (userId) => {
  try {
    if (userId) {
      // Recuperar un user eliminada por su ID
      const restoredUser = await User.restore({ where: { id: userId } })

      if (!restoredUser) {
        return { success: false, message: 'delete User not found' }
      }

      return { success: true, message: 'User restored successfully' }
    } else {
      // Recuperar todas los users eliminadas
      const restoredUser = await User.restore({ where: { deletedAt: { [Op.not]: null } } })

      if (restoredUser.length === 0) {
        return { success: false, message: ' deleted User not found' }
      }

      return { success: true, message: 'All deleted User restored successfully' }
    }
  } catch (error) {
    console.log(`Error restoring User: ${error}`)
    return { success: false, error: error.message }
  }
}

module.exports = {
  restoreBook,
  getBookAdmin,
  getUserAdmin,
  restoreUser
}
