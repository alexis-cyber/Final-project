const express = require("express");
const userRouter = express.Router();
const { register, login } = require("../Controllers/userController");
const {adminUser} = require("../Models/UserModel");

userRouter.post("/register", register);
userRouter.post("/login", login, adminUser);

module.exports = userRouter;