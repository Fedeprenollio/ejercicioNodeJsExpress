const { libraryService } = require("../services");

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
const getLibrary = async (req, res) => {
  const { libraryId } = req.params;
  try {
      //NOTA: le dejo al provider la decision de retornar una sola libreria o todas dependiendo si le llega o no un parametro a su función
   const libraryFound = await libraryService.getLibrary(libraryId);


    if (!libraryFound) {
      return res
        .status(404)
        .json({ action: "get Library", error: "Library not found" });
    } else {
      res.json(libraryFound);
    }
  } catch (error) {
    res.status(404).json({ action: "Get library", error: error.message });
  }
};
// Debe traer también todos los libros
// ○ Obtener todas las librerías
// Debe traer también todos los libros
// ○ Modificar una librería (AUTH)
// ○ Eliminar una librería (**) (AUTH)
// ○ Agregar un libro nuevo (*) (AUTH)

module.exports = { createLibrary, getLibrary };
