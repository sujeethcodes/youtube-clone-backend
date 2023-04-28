const handler = require("express-async-handler");
const helperUtils = require("../utils/helper.utils");

const User = require("../model/user.model");

const controller = {};

//USER CREATED
controller.createUser = handler(async (req, res) => {
  const userId = helperUtils.getRandomNumber(16);
  const date = new Date().toLocaleString().split(",")[0];
  if (!req?.body?.email) throw "400|EMAIL_REQUIRED";

  const verifyUser = await User.findOne({
    where: {
      email: req?.body?.email,
    },
  });

  if (verifyUser) throw "400|THIS EMAIL ID ALREADY HAVE A ACCOUNT";

  const user = await User.create({
    userId: userId,
    userName: req?.body?.userName,
    email: req?.body?.email,
    date: date,
  });
  if (!user) throw "SOMETHING_WENT_WRONG";
  return res.json({ message: "SUCCESS" });
});

//EDIT USER DETAILS
controller.editUser = handler(async (req, res) => {
  const editUser = await User.findOne({
    where: {
      userId: req?.body?.userId,
    },
  });
  if (!editUser) throw "SOMETHING_WENT_WRONG";

  if (req?.body?.userName) {
    editUser.userName = req?.body?.userName;
  }
  if (req?.body?.email) {
    editUser.email = req?.body?.email;
  }
  await editUser.save();
  res.json(editUser);
});

//GET USER DETAILS
controller.getUser = handler(async (req, res) => {
  const getUser = await User.findOne({
    where: {
      userId: req?.body?.userId,
    },
  });
  if (!getUser) throw "INVAILD_USER_DETAILS";
  return res.json(getUser);
});

module.exports = controller;
