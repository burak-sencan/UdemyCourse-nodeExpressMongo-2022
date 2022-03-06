const express = require("express")
const morgan = require("morgan")

const tourRouter = require("./routes/tourRoutes")
const userRouter = require("./routes/userRoutes")

const app = express()

console.log(process.env.NODE_ENV)
if (process.env.MODE_ENV === "development") {
  app.use(morgan("dev"))
}

app.use(express.json())
app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
  console.log("Hello from the middleware")
  next()
})
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})

app.use("/api/v1/tours", tourRouter)
app.use("/api/v1/users", userRouter)

module.exports = app

/* 6) Param Middleware
urlde ki belirli bir id için çalısacak middlewaredir.

 */