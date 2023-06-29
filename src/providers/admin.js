const { Op } = require('sequelize')
const { Book, User, Library } = require('../models')
const { hashPassword } = require('../Utils')

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
// NOTA: Un super ADMIN puede editar un usuario y cambar roles
const adminUpdatingUser = async (userId, newData, user) => {
  const { newPassword, currentPasswordAdmin } = newData
  // NOTA: El admin inicial no puede cambiar su rol, siempre serà admin
  if (userId === '1') {
    newData.role = 'Admin'
  }
  try {
    // Verificar la existencia del ADMIN antes de la actualización para luego verificar su password
    const foundAdmin = await User.findOne({
      where: {
        user
      }
    })
    if (!foundAdmin) {
      return { success: false, message: 'Admin not found' }
    }
    // Comparar la contraseña proporcionada por el Admin con la contraseña almacenada
    const isPasswordValid = await hashPassword.validatePassword(
      currentPasswordAdmin,
      foundAdmin.password
    )
    if (isPasswordValid === false) {
      return { success: false, message: 'Invalid password' }
    }

    // Verificar la existencia del usuario antes de la actualización
    const foundUser = await User.findByPk(userId)
    if (!foundUser) {
      return { success: false, message: 'User not found' }
    }

    if (newPassword) {
      // Generar el hash de la NUEVA contraseña
      const hashedNewPassword = await hashPassword.hashPassword(newPassword)

      if (!hashedNewPassword) {
        return { success: false, message: 'Failed to hash new password' }
      }
      const [updatedRowsUserLength] = await User.update({ ...newData, password: hashedNewPassword }, {
        where: { id: userId }
      })
      if (updatedRowsUserLength === 0) {
        return { success: false, message: 'User to update not found or other problem, eg empty fields' }
      }
    } else {
      const [updatedRowsUserLength] = await User.update({ ...newData }, {
        where: { id: userId }
      })
      if (updatedRowsUserLength === 0) {
        return { success: false, message: 'User to update not found or other problem, eg empty fields' }
      }
    }

    const updatedUser = await User.findByPk(userId)
    return {
      success: true,
      message: 'User updated successfully by Administrator',
      updatedUser
    }
  } catch (error) {
    console.error(`Error updating  user by Administrator , ${error}`)
    return { success: false, error }
  }
}

const getLibraryAdmin = async (libraryId, bring) => {
  let whereCondition = {}

  if (bring === 'deleted') {
    whereCondition.deletedAt = { [Op.ne]: null }
  } else if (bring === 'no-deleted') {
    whereCondition.deletedAt = null
  } else if (bring === 'all') {
    whereCondition = {}
  }

  try {
    if (!libraryId) {
      // Obtener todos los elementos, incluidos los eliminados, paranoid = false
      const foundLibrary = await Library.findAll({
        where: whereCondition,
        include: {
          all: true,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        paranoid: false,
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      if (foundLibrary.length === 0) {
        return { success: false, error: 'Library not found' }
      }
      return { success: true, library: foundLibrary }
    }

    const foundLibrary = await Library.findByPk(libraryId, {
      include: {
        all: true,
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      },
      paranoid: false,
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })

    if (!foundLibrary) {
      return { success: false, error: 'Library not found' }
    }
    return { success: true, library: foundLibrary }
  } catch (error) {
    console.log(`Error looking for Library, ${error}`)
    return { success: false, error: error.message }
  }
}

const restoreLibrary = async (libraryId) => {
  try {
    if (libraryId) {
      // Recuperar una biblioteca eliminada por su ID
      const restoredLibrary = await Library.restore({ where: { id: libraryId } })

      if (!restoredLibrary) {
        return { success: false, message: 'Library not found' }
      }

      return { success: true, message: 'Library restored successfully' }
    } else {
      // Recuperar todas las bibliotecas eliminadas
      const restoredLibraries = await Library.restore({ where: { deletedAt: { [Op.not]: null } } })

      if (restoredLibraries.length === 0) {
        return { success: false, message: 'No deleted libraries found' }
      }

      return { success: true, message: 'All deleted libraries restored successfully' }
    }
  } catch (error) {
    console.log(`Error restoring library: ${error}`)
    return { success: false, error: error.message }
  }
}

module.exports = {
  restoreBook,
  getBookAdmin,
  getUserAdmin,
  restoreUser,
  adminUpdatingUser,
  getLibraryAdmin,
  restoreLibrary
}
