const express = require('express')
const app = express()
const PORT = 3002

const { libraryRouter, bookRouter, userRouter, authRouter } = require('./src/routes')

const { initializeDB } = require('./src/config/db-config')
const { userProvider } = require('./src/providers')
const errorHandler = (err, req, res, next) => {
  if (err.message.includes('Ya existe')) {
    res.status(500)
    res.json({ message: err.message })
  } else {
    res.status(500)
    res.json({ message: err.message })
  }
}

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// app.use(loggingMiddleware)
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/library', libraryRouter)
app.use('/book', bookRouter)
app.use('/user', userRouter)
app.use('/login', authRouter)

app.use(errorHandler)
app.listen(PORT, async (err) => {
  if (err) console.log(err)
  try {
    await initializeDB()
    await userProvider.createUserAtBDInitialization()
  } catch (error) {
    console.log('ERRORRR', error.message)
  }
  console.log(`Conectado al puerto ${PORT}`)
})
