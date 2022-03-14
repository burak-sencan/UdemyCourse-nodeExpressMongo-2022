const fs = require('fs');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Tour = require("./../../models/tourModel")


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


//READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`/${__dirname}/tours-simple.json`, "utf-8"))

const importData = async () => {
  try {
    await Tour.create(tours)
    console.log("Data succesfully loaded!")
  } catch (err) {
    console.log(err)
  }
}


//DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany()
    console.log("Data succesfully deleted!")
  }
  catch (err) {
    console.log(err);

  }
}

console.log(process.argv);

