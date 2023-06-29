const { searchProvider } = require('../providers')

const getSearch = async (search) => {
  return await searchProvider.getSearch(search)
}
const getSearchAdmin = async (search) => {
  return await searchProvider.getSearchAdmin(search)
}

module.exports = {
  getSearch,
  getSearchAdmin
}
