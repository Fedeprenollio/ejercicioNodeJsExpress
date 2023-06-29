const { User } = require('../models')
const { hashPassword } = require('../Utils')

const createUser = async (user) => {
  if (user.role) {
    user.role = 'User'
  }
  try {
    // Generar el hash de la contraseña
    const hashedPassword = await hashPassword.hashPassword(user.password)

    // Crear el usuario con la contraseña encriptada
    const newUser = await User.create({ ...user, password: hashedPassword })

    return { success: true, user: newUser }
  } catch (error) {
    console.log(`Error when creating User, ${error}`)
    return { success: false, error: error.errors[0].message || error.message }
  }
}

const getUser = async (userId) => {
  try {
    if (!userId) {
      const foundUser = await User.findAll({
        include: {
          all: true,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        // paranoid: false,
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      if (foundUser.length === 0) {
        return { success: false, error: 'User not found' }
      }
      return { success: true, user: foundUser }
    }
    const foundUser = await User.findByPk(userId, {
      include: {
        all: true,
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })

    if (!foundUser) {
      return { success: false, error: 'User not found' }
    }
    return { success: true, user: foundUser }
  } catch (error) {
    console.log(`Error looking for User, ${error}`)
    return { success: false, error: error.message }
  }
}

const deleteUser = async (userId) => {
  try {
    const rowsDeletedBook = await User.destroy({
      where: { id: userId }
    })

    if (rowsDeletedBook === 0) {
      return { success: false, message: 'Book to delete not found' }
    }

    return {
      success: true,
      message: `deleted book with id ${userId}:  successfully`
    }
  } catch (error) {
    console.log(`Error deleting  library, ${error}`)
    return { success: false, error: error.message }
  }
}

const validateUser = async (options) => {
  try {
    const foundUser = await User.findOne({
      where: {
        // [Op.or]:[{firstName: options.firstName},{ lastName : options.lastName }]
        // [Op.and]: [{ user: options.user }, { password: options.password }]
        user: options.user
      }
    })

    // if (foundUser) {
    //   return { success: true, user: foundUser }
    // }
    if (foundUser) {
      // Comparar la contraseña proporcionada con la contraseña almacenada
      const isPasswordValid = await hashPassword.validatePassword(
        options.password,
        foundUser.password
      )

      if (isPasswordValid) {
        return { success: true, user: foundUser }
      }
    }

    return { success: false, error: 'Invalid password or userName' }
  } catch (error) {
    console.log(`Error when validated  User, ${error}`)
    return { success: false, error: error.message }
  }
}

const createUserAtBDInitialization = async () => {
  const hashedPassword = await hashPassword.hashPassword('admin')
  const [user, created] = await User.findOrCreate({
    where: { user: 'admin' },
    defaults: {
      user: 'admin',
      firstName: 'firstName ',
      lastName: 'lastName',
      password: hashedPassword,
      email: 'admin@admin.com',
      role: 'Admin'
    }
  })

  if (created) {
    console.log('User created:', user.user)
  } else {
    console.log('User already exists:', user.user)
  }
}

// NOTA: se necesita laa clave actual para editar un usuario por su parte y estar logueado con su token
const updateUser = async (userId, newData, role, user) => {
  const { currentPassword, newPassword } = newData
  if (userId === 1) {
    newData.role = null
  }
  try {
    // Verificar la existencia del usuario antes de la actualización
    const foundUser = await User.findByPk(userId)
    if (!foundUser) {
      return { success: false, message: 'User not found' }
    }

    // Comparar la contraseña proporcionada con la contraseña almacenada
    const isPasswordValid = await hashPassword.validatePassword(
      currentPassword,
      foundUser.password
    )

    if (isPasswordValid === false || foundUser.user !== user) {
      return { success: false, message: 'Invalid password or user' }
    }

    if (isPasswordValid === true && newPassword) {
      // Generar el hash de la NUEVA contraseña
      const hashedNewPassword = await hashPassword.hashPassword(newPassword)

      if (!hashedNewPassword) {
        return { success: false, message: 'Failed to hash new password' }
      }

      const [updatedRowsUserLength] = await User.update({ ...newData, password: hashedNewPassword }, {
        where: { id: userId }
      })
      if (updatedRowsUserLength === 0) {
        return { success: false, message: 'User to update not found or other problem' }
      }
    } else {
      const [updatedRowsUserLength] = await User.update({ ...newData }, {
        where: { id: userId }
      })
      if (updatedRowsUserLength === 0) {
        return { success: false, message: 'User to update not found or other problem' }
      }
    }

    const updatedUser = await User.findByPk(userId)
    return {
      success: true,
      message: 'User updated successfully',
      updatedUser
    }
  } catch (error) {
    console.log(`Error updating  user, ${error}`)
    return { success: false, error: error.message }
  }
}

module.exports = {
  createUser,
  getUser,
  deleteUser,
  validateUser,
  createUserAtBDInitialization,
  updateUser
}
