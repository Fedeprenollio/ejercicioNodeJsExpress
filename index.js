const app = require('./app')
const { initializeDB } = require('./src/config/db-config')
const { userProvider } = require('./src/providers')

const PORT = 3002

app.listen(PORT, async (err) => {
  if (err) console.log(err)
  try {
    await initializeDB()
    await userProvider.createUserAtBDInitialization()
    console.log(`Conectado al puerto ${PORT}`)
  } catch (error) {
    console.log('ERRORRR', error.message)
  }
})
