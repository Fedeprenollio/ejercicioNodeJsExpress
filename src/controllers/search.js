const { searchService } = require('../services')

const getSearch = async (req, res) => {
  const { q } = req.query

  try {
    // NOTA: le dejo al provider la decision de retornar una sola libreria o todas dependiendo si le llega o no un parametro a su función
    const result = await searchService.getSearch(q)

    if (!result) {
      return res
        .status(404)
        .json({ action: 'Searching', error: 'result not found' })
    } else {
      res.json(result)
    }
  } catch (error) {
    res.status(404).json({ action: 'Searching', error: error.message })
  }
}

const getSearchAdmin = async (req, res) => {
  const { q } = req.query

  try {
    // NOTA: le dejo al provider la decision de retornar una sola libreria o todas dependiendo si le llega o no un parametro a su función
    const result = await searchService.getSearchAdmin(q)

    if (!result) {
      return res
        .status(404)
        .json({ action: 'Searching', error: 'result not found' })
    } else {
      res.json(result)
    }
  } catch (error) {
    res.status(404).json({ action: 'Searching', error: error.message })
  }
}

module.exports = {
  getSearch,
  getSearchAdmin
}
