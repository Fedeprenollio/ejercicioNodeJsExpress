const express = require('express')
const router = express.Router()
const { libraryController } = require('../controllers')
const { jwtValidMDW, userIsAdmin } = require('../middleware/auth-mdw')

// ● Acciones
// ○ Crear librería (AUTH)
router.post('/', jwtValidMDW, libraryController.createLibrary)

// ○ Obtener una librería:
// Debe traer también todos los libros
// ○ Obtener todas las librerías
// Debe traer también todos los libros
router.get('/:libraryId?', libraryController.getLibrary)

// ○ Modificar una librería (AUTH)
// Tambien:
// (*): Para crear un libro, pueden hacerlo de las dos formas:
// ● Haciendo que la librería tenga un método para agregar un libro nuevo
router.put('/:libraryId', jwtValidMDW, libraryController.updateLibrary)

// ○ Eliminar una librería (**) (AUTH)
router.delete('/:libraryId', jwtValidMDW, libraryController.deleteLibrary)

// ○ Agregar un libro nuevo (*) (AUTH)
router.post('/:libraryId/newBook', jwtValidMDW, libraryController.addNewBookToLibrary)

module.exports = router
