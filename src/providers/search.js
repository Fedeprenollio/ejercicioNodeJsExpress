const { Library, Book, User } = require('../models')
const { Op } = require('sequelize')

const getSearch = async (search) => {
  const result = {}
  try {
    const libraryFound = await Library.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { location: { [Op.like]: `%${search}%` } },
          { phone: { [Op.like]: `%${search}%` } }
        ]
      }
    }
    )
    result.library = libraryFound

    const bookFound = await Book.findAll({
      where: {
        [Op.or]: [
          { isbn: { [Op.like]: `%${search}%` } },
          { title: { [Op.like]: `%${search}%` } },
          { author: { [Op.like]: `%${search}%` } },
          { year: { [Op.like]: `%${search}%` } }

        ]
      }
    }
    )
    result.book = bookFound

    return { success: true, result }
  } catch (error) {
    console.log(`Error when searching, ${error}`)
    return { success: false, error: error.errors[0].message || error.message }
  }
}

const getSearchAdmin = async (search) => {
  const result = {}
  try {
    const libraryFound = await Library.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { location: { [Op.like]: `%${search}%` } },
          { phone: { [Op.like]: `%${search}%` } }
        ]
      },
      paranoid: false
    }
    )
    result.library = libraryFound

    const bookFound = await Book.findAll({
      where: {
        [Op.or]: [
          { isbn: { [Op.like]: `%${search}%` } },
          { title: { [Op.like]: `%${search}%` } },
          { author: { [Op.like]: `%${search}%` } },
          { year: { [Op.like]: `%${search}%` } }

        ]
      },
      paranoid: false

    }
    )
    result.book = bookFound

    const userFound = await User.findAll({
      where: {
        [Op.or]: [
          { user: { [Op.like]: `%${search}%` } },
          { firstName: { [Op.like]: `%${search}%` } },
          { lastName: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
          { role: { [Op.like]: `%${search}%` } }

        ]
      },
      paranoid: false

    }
    )
    result.user = userFound

    return { success: true, result }
  } catch (error) {
    console.log(`Error when searching, ${error}`)
    return { success: false, error: error.errors[0].message || error.message }
  }
}

module.exports = {
  getSearch,
  getSearchAdmin
}
