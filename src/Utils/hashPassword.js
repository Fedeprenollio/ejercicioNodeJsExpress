const bcrypt = require('bcrypt')

const validatePassword = async (enteredPassword, storedPassword) => {
  console.log('TENGO QUE VALIDAR, ', enteredPassword, storedPassword)
  try {
    return await bcrypt.compare(enteredPassword, storedPassword)
  } catch (error) {
    console.error(`Error comparing passwords: ${error}`)
    return { success: false, error: error.message }
  }
}

const hashPassword = async (password) => {
  try {
    const saltRounds = 10 // Número de rondas de hashing
    return await bcrypt.hash(password, saltRounds)
  } catch (error) {
    console.error(`Error hashing password: ${error}`)
    return null
  }
}

module.exports = {
  validatePassword,
  hashPassword

}
