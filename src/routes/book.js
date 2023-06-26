const express = require('express')
const router = express.Router()
const { bookController } = require('../controllers')

// ● Acciones
// ○ Crear libro (*) (AUTH)
router.post('/', bookController.createBook)

// ○ Obtener un libro en particular
// ○ Obtener todos los libros
router.get('/:bookId?', bookController.getBook)

// ○ Modificar un libro (AUTH)
router.put('/:bookId', bookController.updateBook)

// ○ Eliminar un libro (**) (AUTH)
router.delete('/:bookId', bookController.deleteBook)

module.exports = router
