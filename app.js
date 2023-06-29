const express = require('express')
const app = express()

const { libraryRouter, bookRouter, userRouter, authRouter, adminRouter, searchRouter } = require('./src/routes')

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

app.use('/admin', adminRouter)

app.use('/library', libraryRouter)
app.use('/book', bookRouter)
app.use('/user', userRouter)
app.use('/login', authRouter)
app.use('/search', searchRouter)

app.use(errorHandler)

module.exports = app
