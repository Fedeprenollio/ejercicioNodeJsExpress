const { libraryProvider } = require('../providers')

// ● Acciones
// ○ Crear librería (AUTH)
const createLibrary = async (library) => {
  return await libraryProvider.createLibrary(library)
}

// ○ Obtener una librería
const getLibrary = async (libraryId) => {
  return await libraryProvider.getLibrary(libraryId)
}

// Debe traer también todos los libros
// ○ Obtener todas las librerías
// Debe traer también todos los libros

// ○ Modificar una librería (AUTH)
const updateLibrary = async (libraryId, newData) => {
  return await libraryProvider.updateLibrary(libraryId, newData)
}

// ○ Eliminar una librería (**) (AUTH)
const deleteLibrary = async (libraryId) => {
  return await libraryProvider.deleteLibrary(libraryId)
}

// ○ Agregar un libro nuevo (*) (AUTH)
// Aca creamos un libro e inmeditamamtne lo agregamos a su libreria
const addNewBookToLibrary = async (libraryId, newBook) => {
  return await libraryProvider.addNewBookToLibrary(libraryId, newBook)
}

module.exports = {
  createLibrary,
  getLibrary,
  updateLibrary,
  deleteLibrary,
  addNewBookToLibrary

}
