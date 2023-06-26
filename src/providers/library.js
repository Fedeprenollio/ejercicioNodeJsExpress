const { Library } = require('../models')

const createLibrary = async (library) => {
  try {
    const newLibrary = await Library.create(library)
    return newLibrary
  } catch (error) {
    console.log(`Error when creating library, ${error}`)
    return { error: error.message }
  }
}

const getLibrary = async (libraryId) => {
  try {
    if (!libraryId) {
      const foundLibraries = await Library.findAll({ include: { all: true } })
      if (foundLibraries.length === 0) {
        return { success: false, error: 'No se encontraron libros' }
      }
      return { success: true, library: foundLibraries }
    }
    const foundLibrary = await Library.findByPk(libraryId, {
      include: { all: true }
    })

    if (!foundLibrary) {
      return { success: false, error: 'Library not found' }
    }
    return { success: true, library: foundLibrary }
  } catch (error) {
    console.log(`Error looking for library, ${error}`)
    return { success: false, error: error.message }
  }
}

const updateLibrary = async (libraryId, newData) => {
  try {
    const [updatedLibraryLength] = await Library.update(newData, {
      where: { id: libraryId }
    })

    if (updatedLibraryLength === 0) {
      return { success: false, message: 'Library to update not found' }
    }

    const updatedLibrary = await Library.findByPk(libraryId)
    return {
      success: true,
      message: 'Library updated successfully',
      updatedLibrary
    }
  } catch (error) {
    console.log(`Error updating  library, ${error}`)
    return { success: false, error: error.message }
  }
}

const deleteLibrary = async (libraryId) => {
  try {
    const rowsDeletedLibrary = await Library.destroy({
      where: { id: libraryId }
    })

    if (rowsDeletedLibrary === 0) {
      return { success: false, message: 'Library to delete not found' }
    }

    return {
      success: true,
      message: `deleted Library with id ${libraryId}:  successfully`
    }
  } catch (error) {
    console.log(`Error deleting  library, ${error}`)
    return { error: error.message }
  }
}

// TODO: finalizar la creacion de libros primero....
const addBookToLibrary = async (library) => {
  try {
    const newLibrary = await Library.create(library)
    return newLibrary
  } catch (error) {
    console.log(`Error when creating library, ${error}`)
    return { error: error.message }
  }
}

module.exports = {
  createLibrary,
  getLibrary,
  updateLibrary,
  deleteLibrary,
  addBookToLibrary
}
