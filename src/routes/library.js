const express = require('express')
const router = express.Router()
const { libraryController } = require('../controllers')
const { jwtValidMDW, userIsAdmin } = require('../middleware/auth-mdw')

// ● Acciones
// ○ Crear librería (AUTH)
router.post('/', jwtValidMDW, libraryController.createLibrary)

// ○ Obtener una librería:
router.get('/:libraryId?', libraryController.getLibrary)
// Debe traer también todos los libros
// ○ Obtener todas las librerías
// Debe traer también todos los libros

// ○ Modificar una librería (AUTH)
router.put('/:libraryId', jwtValidMDW, libraryController.updateLibrary)

// ○ Eliminar una librería (**) (AUTH)
router.delete('/:libraryId', jwtValidMDW, libraryController.deleteLibrary)

// ○ Agregar un libro nuevo (*) (AUTH)
router.post('/addBook/:libraryId', jwtValidMDW, libraryController.addBookToLibrary)

module.exports = router
