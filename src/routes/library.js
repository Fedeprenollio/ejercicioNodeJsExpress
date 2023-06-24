const express = require("express");
const router = express.Router();
const { libraryController } = require("../controllers");
const { libraryService } = require("../services");

// ● Acciones
// ○ Crear librería (AUTH) ---- TODO: AUTH
router.post("/", libraryController.createLibrary);

// ○ Obtener una librería:
router.get("/:libraryId?", libraryController.getLibrary);
// Debe traer también todos los libros
// ○ Obtener todas las librerías
// Debe traer también todos los libros
// ○ Modificar una librería (AUTH)
// ○ Eliminar una librería (**) (AUTH)
// ○ Agregar un libro nuevo (*) (AUTH)

module.exports = router;
