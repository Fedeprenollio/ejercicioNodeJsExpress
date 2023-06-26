const express = require('express')
// const bookControllers = require("../controllers/book");
const router = express.Router()
const { authControllers } = require('../controllers')

router.post('/', authControllers.loginUser)

module.exports = router
