const express = require('express')
const morgan = require('morgan')
const path = require('path')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express()
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.static(`${__dirname}/public`))

console.log(process.env.NODE_ENV)
if (process.env.MODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use((req, res, next) => {
  console.log('Hello from the middleware')
  next()
})
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})

app.get('/', (req, res) => {
  res.status(200).render('base')
})
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

module.exports = app

/* 6) Param Middleware
urlde ki belirli bir id için çalısacak middlewaredir.

 */
