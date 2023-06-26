const { authService } = require('../services')

const loginUser = async (req, res) => {
  const { user, password } = req.body
  try {
    const haveToken = await authService.loginUser(user, password)
    if (haveToken.success) {
      res.json({ haveToken })
    } else {
      res.status(401).json(haveToken)
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = { loginUser }
