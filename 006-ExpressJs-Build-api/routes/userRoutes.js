const express = require("express")
const userController = require("./../controllers/userController")
const router = express.Router()

const userRouter = express.Router()

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser)
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.detleteUser)

module.exports = router
