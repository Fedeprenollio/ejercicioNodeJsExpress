const { Op } = require('sequelize')
const { User } = require('../models')

const createUser = async (user) => {
  try {
    const newUser = await User.create(user)
    return { success: true, user: newUser }
  } catch (error) {
    console.log(`Error when creating User, ${error}`)
    return { success: false, error: error.message }
  }
}

const getUser = async (userId) => {
  try {
    if (!userId) {
      const foundUsers = await User.findAll({ where: { deleted: false } }, { include: { all: true } })

      if (foundUsers.length === 0) {
        return { success: false, error: 'Not found users' }
      }

      return { success: true, user: foundUsers }
    } else {
      const foundUser = await User.findByPk(userId,
        { where: { deleted: false } },
        {
          include: { all: true }
        })

      if (!foundUser) {
        return { success: false, error: 'User not found' }
      }

      return { success: true, book: foundUser }
    }
  } catch (error) {
    console.log(`Error looking for users, ${error}`)
    return { success: false, error: error.message }
  }
}

const deleteUser = async (userId) => {
  try {
    // "DELETE DE FORMA LOGICA"
    const userToDelete = await User.findByPk(userId)

    if (!userToDelete) {
      return { success: false, message: 'User to delete not found' }
    }

    // Realiza el borrado lógico
    userToDelete.deleted = true
    await userToDelete.save()

    return {
      success: true,
      message: `Deleted user with id ${userId}:  successfully`
    }

    // DELETE FISICO!!!
    // const rowsDeletedBook = await Book.destroy( {
    //   where: { id: bookId },
    // });

    // if (rowsDeletedBook === 0) {
    //   return { success: false, message: "Book to delete not found" };
    // }

    // return {
    //   success: true,
    //   message: `deleted book with id ${bookId}:  successfully`,
    // };
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
        [Op.and]: [{ user: options.user }, { password: options.password }]
      }
    })
    if (foundUser) {
      return { success: true, user: foundUser }
    }
    return { success: false, error: 'Invalid password or userName' }
  } catch (error) {
    console.log(`Error when validated  User, ${error}`)
    return { success: false, error: error.message }
  }
}

const createUserAtBDInitialization = async () => {
  const [user, created] = await User.findOrCreate({
    where: { user: 'admin' },
    defaults: {
      user: 'admin',
      firstName: 'firstName ',
      lastName: 'lastName',
      password: 'admin',
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

module.exports = {
  createUser,
  getUser,
  deleteUser,
  validateUser,
  createUserAtBDInitialization
}
