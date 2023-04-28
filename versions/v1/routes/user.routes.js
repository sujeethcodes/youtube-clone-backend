const express = require("express");
const router = express.Router();

//CONTROLLER
const userController = require("../controller/user.controller");

//ROUTER
router.post("/createUser", userController.createUser);
router.post("/getUser", userController.getUser);
router.post("/editUser", userController.editUser);
module.exports = router;
