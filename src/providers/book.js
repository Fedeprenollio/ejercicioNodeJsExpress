const { Library, Book } = require('../models')

// ● Acciones
// ○ Crear libro (*) (AUTH)
// NOTA: le puedo asiganar una biblioteca al momento de crearlo mediante el body o mediante un paramId por ejemplo,
// en mi caso, he elegido asignarlo mediante el bodu
const createBook = async (book, libraryId) => {
  try {
    // Si entre el body viene una propiedad llamada "addToLibraryId" quiere decir que quiero asociar un libro al momento de crearlo
    //     (*): Para crear un libro, pueden hacerlo de las dos formas:
    // ● Crear un libro directamente con /book y enviar el id de la librería
    if (book.addToLibraryId) {
      const addToLibrary = await Library.findByPk(book.addToLibraryId)
      if (!addToLibrary) {
        return { success: false, book: 'Library not found to associate later when creating the book' }
      }
      const newBook = await Book.create({ ...book })

      await newBook.setLibrary(addToLibrary)
      return { success: true, book: newBook }

      // await addToLibrary.setBook(book)
      // await newBook.save()
    } else {
      const newBook = await Book.create({ ...book })
      return { success: true, book: newBook }
    }
  } catch (error) {
    console.log(`Error when creating library, ${error}`)
    return { success: false, error: error.errors[0].message || error.message }
  }
}

// ○ Obtener un libro en particular
// ○ Obtener todos los libros
const getBook = async (bookId) => {
  try {
    if (!bookId) {
      const foundBooks = await Book.findAll({
        include: {
          model: Library,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })

      if (foundBooks.length === 0) {
        return { success: false, error: 'No se encontraron libros' }
      }

      return { success: true, book: foundBooks }
    } else {
      const foundBook = await Book.findByPk(bookId,
        {
          include: {
            model: Library,
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          },
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        })

      if (!foundBook) {
        return { success: false, error: 'Book not found' }
      }

      return { success: true, book: foundBook }
    }
  } catch (error) {
    console.log(`Error looking for library, ${error}`)
    return { success: false, error: error.message }
  }
}

// ○ Modificar un libro (AUTH)
const updateBook = async (bookId, newData) => {
  let alreadyAssociatedLibrary = false
  try {
    // Si entre el body viene una propiedad llamada "addToLibraryId" quiere decir que quiero asociar un libro existente a una biblioteca
    if (newData.addToLibraryId) {
      const book = await Book.findByPk(bookId)
      const addToLibrary = await Library.findByPk(newData.addToLibraryId)
      if (!book || !addToLibrary) {
        const error = 'failed to associate, book o library not found'
        return { success: false, error }
      }

      // NOTA: si ya existe la asociacion, no la vuelvo a hacer, y notifico
      if (await addToLibrary.hasBook(book)) {
        alreadyAssociatedLibrary = `An association already exists between the book ID:${bookId} and the library ID:${newData.addToLibraryId} `
      } else {
        await book.setLibrary(addToLibrary)
      }
      // await addToLibrary.setBook(book)
      await book.save()
    }

    if (newData.removeToLibraryId) { // Si entre el body viene una propiedad llamada "removeToLibraryId" quiere decir que quiero eliminar un libro existente a una biblioteca
      const book = await Book.findByPk(bookId)
      const removeToLibrary = await Library.findByPk(newData.removeToLibraryId)
      if (!book || !removeToLibrary) {
        const error = 'failed remove to associate, book o library not found'
        return { success: false, error }
      }

      if (!(await removeToLibrary.hasBook(book))) {
        alreadyAssociatedLibrary = `There is no  association between the book ID:${bookId} and the library ID:${newData.removeToLibraryId} `
      } else {
        await removeToLibrary.removeBook(book)
      }

      // await book.save()
    }

    const [updatedRowsBookLength] = await Book.update(newData, {
      where: { id: bookId }
    })

    if (updatedRowsBookLength === 0) {
      return { success: false, message: 'Book to update not found' }
    }

    const updatedBook = await Book.findByPk(bookId)
    return {
      success: true,
      message: 'Book updated successfully',
      alreadyAssociatedLibrary,
      updatedLibrary: updatedBook
    }
  } catch (error) {
    console.log(`Error updating  library, ${error}`)
    return { success: false, error: error.message }
  }
}

// ○ Eliminar un libro (**) (AUTH)
const deleteBook = async (bookId) => {
  try {
    // "DELETE DE FORMA LOGICA"
    // const bookToDelete = await Book.findByPk(bookId)

    // if (!bookToDelete) {
    //   return { success: false, message: 'Book to delete not found' }
    // }

    // // Realiza el borrado lógico
    // bookToDelete.deleted = true
    // await bookToDelete.save()

    // return {
    //   success: true,
    //   message: `Deleted book with id ${bookId}:  successfully`
    // }

    // DELETE FISICO!!!
    const rowsDeletedBook = await Book.destroy({
      where: { id: bookId }
    })

    if (rowsDeletedBook === 0) {
      return { success: false, message: 'Book to delete not found' }
    }

    return {
      success: true,
      message: `deleted book with id ${bookId}:  successfully`
    }
  } catch (error) {
    console.log(`Error deleting  library, ${error}`)
    return { success: false, error: error.message }
  }
}

module.exports = {
  createBook,
  getBook,
  updateBook,
  deleteBook
}
