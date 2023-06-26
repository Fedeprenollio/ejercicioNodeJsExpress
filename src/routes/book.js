const express = require('express')
const router = express.Router()
const { bookController } = require('../controllers')
const { jwtValidMDW, userIsAdmin } = require('../middleware/auth-mdw')

// ● Acciones
// ○ Crear libro (*) (AUTH)
router.post('/', jwtValidMDW, bookController.createBook)

// ○ Obtener un libro en particular
// ○ Obtener todos los libros
router.get('/:bookId?', bookController.getBook)

// ○ Modificar un libro (AUTH)
router.put('/:bookId', jwtValidMDW, bookController.updateBook)

// ○ Eliminar un libro (**) (AUTH)
router.delete('/:bookId', jwtValidMDW, bookController.deleteBook)

module.exports = router
