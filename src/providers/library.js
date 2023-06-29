const { Op } = require('sequelize')
const { sequelize } = require('../config/db-config')
const { Library, Book } = require('../models')

const createLibrary = async (library) => {
  try {
    const newLibrary = await Library.create(library)
    return { success: true, newLibrary }
  } catch (error) {
    console.log(`Error when creating library, ${error}`)
    return { success: false, error: error.errors[0].message || error.message }
  }
}

const getLibrary = async (libraryId) => {
  try {
    if (!libraryId) {
      const foundLibraries = await Library.findAll({
        include: {
          all: true,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        // paranoid: false,
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      if (foundLibraries.length === 0) {
        return { success: false, error: 'Library not found' }
      }
      return { success: true, library: foundLibraries }
    }
    const foundLibrary = await Library.findByPk(libraryId, {
      include: {
        all: true,
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })

    if (!foundLibrary) {
      return { success: false, error: 'Library not found' }
    }
    return { success: true, library: foundLibrary }
  } catch (error) {
    console.log(`Error looking for library, ${error}`)
    return { success: false, error: error.message }
  }
}

const updateLibrary = async (libraryId, newData) => {
  try {
    const notFoundBooks = [] // Array para almacenar los ID de los libros no encontrados
    const previouslyUnassociatedBooks = [] // Array para almacenar los ID de los libros no asociados previamente que no necesitan volverse a eliminar
    const alreadyAssociatedPreviouslyBooks = [] // Array para almacenar los ID de los libros ya asociados previamente que no necesitan volverse a asociar
    const successfulPartnerships = [] // Array para almacenar los ID de los libros asociados exitosamente a la libreria
    const unsuccessfulDeletions = [] // Array para almacenar los ID de los libros removidos exitosamente a la libreria

    const library = await Library.findByPk(libraryId)
    if (!library) {
      return { success: false, message: 'Library to update not found' }
    }

    // (*): Para crear un libro, pueden hacerlo de las dos formas:
    // ● Haciendo que la librería tenga un método para agregar un libro nuevo (En este caso, se le puede agregar uno solo o muchos a la vez)

    if (newData.receiveBooks && newData.receiveBooks.length > 0) {
      for (const bookId of newData.receiveBooks) {
        const bookToAdd = await Book.findByPk(bookId)

        if (!bookToAdd) {
          notFoundBooks.push(bookId)
        } else if (!(await library.hasBook(bookToAdd))) {
          successfulPartnerships.push(bookToAdd)
          await library.addBook(bookToAdd)
        } else {
          alreadyAssociatedPreviouslyBooks.push(bookId)
        }
      }
    }

    if (newData.deleteBooks && newData.deleteBooks.length > 0) {
      for (const bookId of newData.deleteBooks) {
        const bookToRemove = await Book.findByPk(bookId)

        if (!bookToRemove) {
          notFoundBooks.push(bookId)
        } else if ((await library.hasBook(bookToRemove))) {
          unsuccessfulDeletions.push(bookToRemove)
          await library.removeBook(bookToRemove)
        } else {
          previouslyUnassociatedBooks.push(bookId)
        }
      }
    }

    const [updatedLibraryLength] = await Library.update(newData, {
      where: { id: libraryId }
    })
    const updatedLibrary = await Library.findByPk(libraryId, { include: { all: true } })

    return {
      success: true,
      message: `${updatedLibraryLength} libraries updated on their information. Successful Partnerships were ${successfulPartnerships.length} and unsuccessful Deletions were ${unsuccessfulDeletions.length}. Besides, Not found books: ${notFoundBooks.length}, previously unassociated books: ${previouslyUnassociatedBooks.length},   Already associated books: ${alreadyAssociatedPreviouslyBooks.length}.`,
      unsuccessfulDeletions: unsuccessfulDeletions.map(book => book.id),
      successfulPartnerships: successfulPartnerships.map(book => book.id),
      notFoundBooks,
      previouslyUnassociatedBooks,
      alreadyAssociatedPreviouslyBooks,
      updatedLibrary
    }
  } catch (error) {
    console.log(`Error updating  library, ${error}`)
    return { success: false, error: error.message }
  }
}

const deleteLibrary = async (libraryId) => {
  const t = await sequelize.transaction() // Iniciar la transacción

  try {
    // Buscar la biblioteca a eliminar
    const libraryToDelete = await Library.findByPk(libraryId, { transaction: t })

    if (!libraryToDelete) {
      await t.rollback() // Revertir la transacción
      return { success: false, message: 'Library to delete not found' }
    }

    // Eliminar la relación entre la biblioteca y sus libros asociados
    await libraryToDelete.setBooks([], { transaction: t })

    const rowsDeletedLibrary = await Library.destroy({
      where: { id: libraryId },
      transaction: t
    })

    if (rowsDeletedLibrary === 0) {
      await t.rollback() // Revertir la transacción
      return { success: false, message: 'Library to delete not found' }
    }

    await t.commit() // Confirmar la transacción

    return {
      success: true,
      message: `deleted Library with id ${libraryId}:  successfully`
    }
  } catch (error) {
    console.log(`Error deleting  library, ${error}`)
    await t.rollback() // Revertir la transacción
    return { error: error.message }
  }
}

// TODO: finalizar la creacion de libros primero....
const addNewBookToLibrary = async (libraryId, newBook) => {
  try {
    const library = await Library.findByPk(libraryId)
    if (!library) {
      return { success: false, error: 'Library not found!' }
    }

    const newBookWithLibrary = await Book.create({ ...newBook, LibraryId: libraryId })

    return newBookWithLibrary
  } catch (error) {
    console.log(`Error when creating library, ${error}`)
    return { success: false, error: error.errors[0].message || error.message }
  }
}

const getLibraryAdmin = async (libraryId, deleted) => {
  let deletedBoolean
  if (deleted === 'no') {
    deletedBoolean = true
  } else if (deleted === 'yes') {
    deletedBoolean = false
  }

  try {
    if (!libraryId) {
      // Obtener todos los elementos, incluidos los eliminados, paranoid = false
      const foundLibraries = await Library.findAll({
        include: {
          all: true,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        paranoid: deletedBoolean,
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      if (foundLibraries.length === 0) {
        return { success: false, error: 'Library not found' }
      }
      return { success: true, library: foundLibraries }
    }
    const foundLibrary = await Library.findByPk(libraryId, {
      include: {
        all: true,
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      },
      paranoid: deletedBoolean,
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })

    if (!foundLibrary) {
      return { success: false, error: 'Library not found' }
    }
    return { success: true, library: foundLibrary }
  } catch (error) {
    console.log(`Error looking for library, ${error}`)
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
  createLibrary,
  getLibrary,
  updateLibrary,
  deleteLibrary,
  addNewBookToLibrary,
  getLibraryAdmin,
  restoreLibrary
}
