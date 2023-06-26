const express = require('express')
const { userControllers } = require('../controllers')
const router = express.Router()

// ● Acciones
// ○ Login

router.post('/', userControllers.createUser)

router.get('/:userId?', userControllers.getUser)

router.put('/:userId', userControllers.deleteUser)

router.delete('/:userId?', userControllers.deleteUser)

module.exports = router
