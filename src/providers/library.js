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
      const foundLibraries = await Library.findAll({ include: { all: true } })
      if (foundLibraries.length === 0) {
        return { success: false, error: 'Library not found' }
      }
      return { success: true, library: foundLibraries }
    }
    const foundLibrary = await Library.findByPk(libraryId, {
      include: { all: true }
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
    const notAssociatedBooks = [] // Array para almacenar los ID de los libros no asociados previamente que no necesitan volverse a eliminar
    const alreadyAssociatedBooks = [] // Array para almacenar los ID de los libros ya asociados previamente que no necesitan volverse a asociar

    const library = await Library.findByPk(libraryId)
    if (!library) {
      return { success: false, message: 'Library to update not found' }
    }

    //     (*): Para crear un libro, pueden hacerlo de las dos formas:
    // ● Haciendo que la librería tenga un método para agregar un libro nuevo (En este caso, se le puede agregar uno solo o muchos a la vez)

    if (newData.receiveBooks && newData.receiveBooks.length > 0) {
      for (const bookId of newData.receiveBooks) {
        const bookToAdd = await Book.findByPk(bookId)

        if (!bookToAdd) {
          notFoundBooks.push(bookId)
        } else if (!(await library.hasBook(bookToAdd))) {
          await library.addBook(bookToAdd)
        } else {
          alreadyAssociatedBooks.push(bookId)
        }
      }
    }

    if (newData.deleteBooks && newData.deleteBooks.length > 0) {
      for (const bookId of newData.deleteBooks) {
        const bookToRemove = await Book.findByPk(bookId)

        if (!bookToRemove) {
          notFoundBooks.push(bookId)
        } else if ((await library.hasBook(bookToRemove))) {
          await library.addBook(bookToRemove)
        } else {
          notAssociatedBooks.push(bookId)
        }
      }
    }

    const [updatedLibraryLength] = await Library.update(newData, {
      where: { id: libraryId }
    })

    if (updatedLibraryLength === 0) {
      return { success: false, message: 'Library to update not found' }
    }

    const updatedLibrary = await Library.findByPk(libraryId, { include: { all: true } })
    return {
      success: true,
      message: 'Library updated successfully',
      notFoundBooks,
      notAssociatedBooks,
      alreadyAssociatedBooks,
      updatedLibrary
    }
  } catch (error) {
    console.log(`Error updating  library, ${error}`)
    return { success: false, error: error.message }
  }
}

const deleteLibrary = async (libraryId) => {
  try {
    const rowsDeletedLibrary = await Library.destroy({
      where: { id: libraryId }
    })

    if (rowsDeletedLibrary === 0) {
      return { success: false, message: 'Library to delete not found' }
    }

    return {
      success: true,
      message: `deleted Library with id ${libraryId}:  successfully`
    }
  } catch (error) {
    console.log(`Error deleting  library, ${error}`)
    return { error: error.message }
  }
}

// TODO: finalizar la creacion de libros primero....
const addNewBookToLibrary = async (libraryId, newBook) => {
  try {
    const library = await Library.findByPk(libraryId)
    if (!library) {
      return { success: false, error: 'Library not found' }
    }

    const newBookWithLibrary = await Book.create({ ...newBook, LibraryId: libraryId })

    return newBookWithLibrary
  } catch (error) {
    console.log(`Error when creating library, ${error}`)
    return { success: false, error: error.errors[0].message || error.message }
  }
}

module.exports = {
  createLibrary,
  getLibrary,
  updateLibrary,
  deleteLibrary,
  addNewBookToLibrary
}
