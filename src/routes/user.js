const express = require('express')
const { userControllers } = require('../controllers')
const router = express.Router()
const { jwtValidMDW, userIsAdmin } = require('../middleware/auth-mdw')

// ● Acciones
// ○ Login

router.post('/', userIsAdmin, userControllers.createUser)

router.get('/:userId?', userIsAdmin, userControllers.getUser)

router.put('/:userId', jwtValidMDW, userControllers.updateUser)

router.delete('/:userId?', userIsAdmin, userControllers.deleteUser)

module.exports = router
