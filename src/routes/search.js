const express = require('express')
const { searchControllers } = require('../controllers')
const router = express.Router()
const { jwtValidMDW, userIsAdmin } = require('../middleware/auth-mdw')

router.get('/', jwtValidMDW, searchControllers.getSearch)
router.get('/admin', userIsAdmin, searchControllers.getSearchAdmin)

module.exports = router
