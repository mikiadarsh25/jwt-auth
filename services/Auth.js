"use strict";
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { CustomError } = require("../libs/errorHandler");
const {ERRORS, STATUS_CODES} = require("../constants")

const registerUser = async ({ userName, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ userName, password: hashedPassword, createdOn: new Date() });
  return await user.save();
};

const getRegisteredUser = async ({ userName, password }) => {
  const user = await User.findOne({ userName });
  console.log(user);
  if (!user) {
    throw new CustomError({
      errorDescription,
      errorObject,
      response: { message, statusCode }
    });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
  return token;
};

module.exports = { registerUser, getRegisteredUser };
