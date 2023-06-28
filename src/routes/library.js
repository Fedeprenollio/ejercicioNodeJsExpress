const express = require('express')
const router = express.Router()
const { libraryController } = require('../controllers')
const { jwtValidMDW, userIsAdmin } = require('../middleware/auth-mdw')

// ● Acciones
// ○ Crear librería (AUTH)
router.post('/', jwtValidMDW, libraryController.createLibrary)

// NOTA ADICIONAL: El admin obtiene los registros eliminados:
// router.get('/admin', libraryController.getLibraryAdmin)
router.get('/admin/:libraryId?', libraryController.getLibraryAdmin)

// ○ Obtener una librería:
router.get('/:libraryId?', libraryController.getLibrary)
// Debe traer también todos los libros
// ○ Obtener todas las librerías
// Debe traer también todos los libros

// NOTA: RECUPERAR UNA LIBRERIA ELIMINADA
router.put('/:libraryId?/restore', libraryController.restoreLibrary)

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
