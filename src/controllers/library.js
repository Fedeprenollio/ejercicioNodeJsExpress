const {libraryService} = require("../services")

// ● Acciones
// ○ Crear librería (AUTH)

const createLibrary = async (req, res) => {
    try {
      const newLibrary = await libraryService.createLibrary(req.body);
      res.json(newLibrary);
    } catch (error) {
      res.status(500).json({ action: "Created library", error: error.message });
    }
  };
  

// ○ Obtener una librería
// Debe traer también todos los libros
// ○ Obtener todas las librerías
// Debe traer también todos los libros
// ○ Modificar una librería (AUTH)
// ○ Eliminar una librería (**) (AUTH)
// ○ Agregar un libro nuevo (*) (AUTH)



module.exports = { createLibrary}