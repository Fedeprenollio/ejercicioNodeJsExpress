// const { User } = require('../models')

// const loginUser = async (user) => {
//   if (user === 'admin' && password === 'admin') {
//     const token = jwt.sign({ user, role: 'Admin' }, SERVER_SECRET, {
//       expiresIn: '10m'
//     })
//     return { token }
//     // res.json({ token })
//   } else {
//     const userFound = await userService.validateUser(user, password)
//     if (userFound) {
//       const token = jwt.sign({ user, role: 'User' }, SERVER_SECRET)
//       return { token }
//       //   return res.json({ token })
//     }
//     return { error: 'Invalidad user' }
//     // res.status(401).json({ error: 'Invalid user' })
//   }
// }

// module.exports = {
//   loginUser
// }
