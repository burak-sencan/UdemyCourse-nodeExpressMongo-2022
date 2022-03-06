const dotenv = require('dotenv')
const app = require('./app')
const mongoose = require('mongoose')

// console.log(app.get("env"));
// console.log(process.env);

dotenv.config({ path: './config.env' })

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

mongoose
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((con) => console.log('DB connection succesful'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`App running on ${PORT}`)
})
