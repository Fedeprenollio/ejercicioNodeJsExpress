const {libraryProvider} = require("../providers")


// ● Acciones
// ○ Crear librería (AUTH)
const createLibrary = async (library) => {
    return await libraryProvider.createLibrary(library);
  };


// ○ Obtener una librería
const getOneLibrary = async (libraryId) => {
  return await libraryProvider.getOneLibrary(libraryId);
};



// Debe traer también todos los libros
// ○ Obtener todas las librerías
// Debe traer también todos los libros
// ○ Modificar una librería (AUTH)
// ○ Eliminar una librería (**) (AUTH)
// ○ Agregar un libro nuevo (*) (AUTH)

module.exports = {createLibrary,getOneLibrary}