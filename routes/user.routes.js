const express = require("express");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const { UserModel } = require("../model/user.module");

userRouter.post("/register", (req, res) => {
  console.log(req.body);
  const payload = req.body;
  try {
    bcrypt.hash(payload.password, 5, async (err, hash) => {
      if (err) {
        res.status(200).send({ msg: "error has occured in hashing" });
      } else {
        const userInfo = { ...payload, password: hash };
        const user = new UserModel(userInfo);
        await user.save();
        return res.status(200).send({
          msg: "User has been successfully registered",
        });
      }
    });
  } catch (error) {
    res.status(400).send({ msgErr: error });
  }
});

userRouter.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    console.log(user);
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        console.log(result);
        if (result) {
          return res.status(200).send({ msg: "User has been logged In" });
        } else {
          return res.status(400).send({ msgN: err.message });
        }
      });
    } else {
      return res
        .status(300)
        .send({
          msg: "User doesn't has an account,please register to create an account",
        });
    }
  } catch (error) {
    res.status(400).send({ msgErr: `user has failed to login- ${error}` });
  }
});

module.exports = {
  userRouter,
};
