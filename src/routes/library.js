const express = require("express");
const router = express.Router();
const { libraryController } = require("../controllers");

// ● Acciones
// ○ Crear librería (AUTH) ---- TODO: AUTH
router.post("/", libraryController.createLibrary);

// ○ Obtener una librería:
router.get("/:libraryId?", libraryController.getLibrary);
// Debe traer también todos los libros
// ○ Obtener todas las librerías
// Debe traer también todos los libros



// ○ Modificar una librería (AUTH)
router.put("/:libraryId", libraryController.updateLibrary);




// ○ Eliminar una librería (**) (AUTH)
router.delete("/:libraryId", libraryController.deleteLibrary);




// ○ Agregar un libro nuevo (*) (AUTH)
router.post("/addBook/:libraryId", libraryController.addBookToLibrary);




module.exports = router;
