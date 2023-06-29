const express = require('express')
const { libraryController, adminControllers } = require('../controllers')
const router = express.Router()
const { userIsAdmin, userIsSuperAdmin } = require('../middleware/auth-mdw')

// NOTA ADICIONAL: El admin obtiene los registros eliminados:
router.get('/library/:libraryId?', userIsAdmin, libraryController.getLibraryAdmin)

// NOTA: RECUPERAR UNA LIBRERIA ELIMINADA o TODAS
router.put('/library/restore/:libraryId?', userIsSuperAdmin, libraryController.restoreLibrary)

// NOTA ADICIONAL: El admin obtiene los registros eliminados de libros:
router.get('/book/:bookId?', userIsAdmin, adminControllers.getBookAdmin)

// NOTA: RECUPERAR UN LIBRO ELIMINADO o TODOS!
router.put('/book/restore/:libraryId?', userIsSuperAdmin, adminControllers.restoreBook)

router.get('/user/:userId?', userIsAdmin, adminControllers.getUserAdmin)

router.put('/user/restore/:userId?', userIsSuperAdmin, adminControllers.restoreUser)

module.exports = router
