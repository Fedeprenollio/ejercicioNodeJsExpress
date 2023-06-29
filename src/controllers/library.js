const { libraryService, adminService } = require('../services')

// ● Acciones
// ○ Crear librería (AUTH)

const createLibrary = async (req, res) => {
  try {
    const newLibrary = await libraryService.createLibrary(req.body)
    res.json(newLibrary)
  } catch (error) {
    res.status(500).json({ action: 'Created library', error: error.message })
  }
}

// ○ Obtener una librería
// Debe traer también todos los libros
// ○ Obtener todas las librerías
// Debe traer también todos los libros
const getLibrary = async (req, res) => {
  const { libraryId } = req.params
  try {
    // NOTA: le dejo al provider la decision de retornar una sola libreria o todas dependiendo si le llega o no un parametro a su función
    const libraryFound = await libraryService.getLibrary(libraryId)

    if (!libraryFound) {
      return res
        .status(404)
        .json({ action: 'get Library', error: 'Library not found' })
    } else {
      res.json(libraryFound)
    }
  } catch (error) {
    res.status(404).json({ action: 'Get library', error: error.message })
  }
}

// ○ Modificar una librería (AUTH)
const updateLibrary = async (req, res) => {
  const { libraryId } = req.params
  const newData = req.body
  try {
    const libraryFound = await libraryService.updateLibrary(libraryId, newData)

    if (!libraryFound.success) {
      return res
        .status(404)
        .json(libraryFound)
    } else {
      res.json(libraryFound)
    }
  } catch (error) {
    res.status(404).json({ action: 'Update library', error: error.message })
  }
}

// ○ Eliminar una librería (**) (AUTH)
const deleteLibrary = async (req, res) => {
  const { libraryId } = req.params
  try {
    const libraryFound = await libraryService.deleteLibrary(libraryId)

    if (!libraryFound) {
      return res
        .status(404)
        .json({ action: 'update Library', error: 'Library not found' })
    } else {
      res.json(libraryFound)
    }
  } catch (error) {
    res.status(404).json({ success: false, action: 'Update library', error: error.message })
  }
}

// ○ Agregar un libro nuevo (*) (AUTH)
const addNewBookToLibrary = async (req, res) => {
  const { libraryId } = req.params
  try {
    const newBookToLibrary = await libraryService.addNewBookToLibrary(libraryId, req.body)

    res.json(newBookToLibrary)
  } catch (error) {
    res.status(500).json({ success: false, action: 'Add new book to library', error: error.message })
  }
}

const getLibraryAdmin = async (req, res) => {
  const { libraryId } = req.params
  const deleted = req.query.deleted

  try {
    // NOTA: le dejo al provider la decision de retornar una sola libreria o todas dependiendo si le llega o no un parametro a su función
    const libraryFound = await libraryService.getLibraryAdmin(libraryId, deleted)

    if (!libraryFound) {
      return res
        .status(404)
        .json({ action: 'get Library', error: 'Library not found' })
    } else {
      res.json(libraryFound)
    }
  } catch (error) {
    res.status(404).json({ action: 'Get library', error: error.message })
  }
}

const restoreLibrary = async (req, res) => {
  const { libraryId } = req.params
  try {
    const libraryFound = await libraryService.restoreLibrary(libraryId)

    if (!libraryFound.success) {
      return res
        .status(404)
        .json(libraryFound)
    } else {
      res.json(libraryFound)
    }
  } catch (error) {
    res.status(404).json({ action: 'Recover library', error: error.message })
  }
}

module.exports = {
  createLibrary,
  getLibrary,
  updateLibrary,
  deleteLibrary,
  addNewBookToLibrary,
  getLibraryAdmin,
  restoreLibrary

}
