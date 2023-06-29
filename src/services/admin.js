const { adminProvider } = require('../providers')

const getBookAdmin = async (bookId, deleted, onlyDeleted) => {
  return await adminProvider.getBookAdmin(bookId, deleted, onlyDeleted)
}

const restoreBook = async (bookId, deleted) => {
  return await adminProvider.restoreBook(bookId, deleted)
}

const getUserAdmin = async (userId, deleted) => {
  return await adminProvider.getUserAdmin(userId, deleted)
}

const restoreUser = async (userId, deleted) => {
  return await adminProvider.restoreUser(userId, deleted)
}

const adminUpdatingUser = async (userId, newData, user) => {
  return await adminProvider.adminUpdatingUser(userId, newData, user)
}
const getLibraryAdmin = async (libraryId, deleted) => {
  return await adminProvider.getLibraryAdmin(libraryId, deleted)
}

const restoreLibrary = async (libraryId) => {
  return await adminProvider.restoreLibrary(libraryId)
}

module.exports = {
  getBookAdmin,
  restoreBook,
  getUserAdmin,
  restoreUser,
  adminUpdatingUser,
  getLibraryAdmin,
  restoreLibrary

}
