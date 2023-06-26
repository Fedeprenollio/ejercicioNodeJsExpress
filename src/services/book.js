const { bookProvider } = require('../providers')

// ● Acciones
// ○ Crear libro (*) (AUTH)
const createBook = async (book) => {
  return await bookProvider.createBook(book)
}

// ○ Obtener un libro en particular
// ○ Obtener todos los libros
const getBook = async (bookId) => {
  return await bookProvider.getBook(bookId)
}

// ○ Modificar un libro (AUTH)
// NOTA: Se pueden cambiar los datos del libro, como asi tambien la pertencia o no a alguna biblioteca
const updateBook = async (bookId, newData) => {
  return await bookProvider.updateBook(bookId, newData)
}

// ○ Eliminar un libro (**) (AUTH)
const deleteBook = async (bookId) => {
  return await bookProvider.deleteBook(bookId)
}

module.exports = {
  createBook,
  getBook,
  updateBook,
  deleteBook
}
