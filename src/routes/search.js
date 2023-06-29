const express = require('express')
const { searchControllers } = require('../controllers')
const router = express.Router()
const { jwtValidMDW, userIsAdmin, userIsSuperAdmin } = require('../middleware/auth-mdw')

router.get('/', jwtValidMDW, searchControllers.getSearch)
router.get('/admin', userIsSuperAdmin, searchControllers.getSearchAdmin)

module.exports = router
