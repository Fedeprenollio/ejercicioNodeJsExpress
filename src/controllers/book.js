const { bookService } = require('../services')

const createBook = async (req, res) => {
  try {
    const newBook = await bookService.createBook(req.body)
    res.json(newBook)
  } catch (error) {
    res.status(500).json({ action: 'Created library', error: error.message })
  }
}

const getBook = async (req, res) => {
  const { bookId } = req.params
  try {
    // NOTA: le dejo al provider la decision de retornar una sola libreria o todas dependiendo si le llega o no un parametro a su función
    const bookFound = await bookService.getBook(bookId)

    if (!bookFound) {
      return res
        .status(404)
        .json(bookFound)
    } else {
      res.json(bookFound)
    }
  } catch (error) {
    res.status(404).json({ action: 'Get library', error: error.message })
  }
}

const updateBook = async (req, res) => {
  const { bookId } = req.params
  const newData = req.body
  try {
    const foundLibraryToUpdate = await bookService.updateBook(bookId, newData)

    if (!foundLibraryToUpdate.success) {
      return res
        .status(404)
        .json(foundLibraryToUpdate)
    } else {
      res.json(foundLibraryToUpdate)
    }
  } catch (error) {
    res.status(404).json({ action: 'Update library', error: error.message })
  }
}

const deleteBook = async (req, res) => {
  const { bookId } = req.params
  try {
    const infoBookToDeleted = await bookService.deleteBook(bookId)

    if (!infoBookToDeleted.success) {
      return res
        .status(404)
        .json(infoBookToDeleted)
    } else {
      res.json(infoBookToDeleted)
    }
  } catch (error) {
    res.status(404).json({ action: 'Update library', error: error.message })
  }
}

module.exports = {
  createBook,
  getBook,
  updateBook,
  deleteBook
}
