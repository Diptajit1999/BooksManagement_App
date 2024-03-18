const express = require("express");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const { BlackListedModel } = require("../model/blackList.model");
const { UserModel } = require("../model/user.module");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
          return res
            .status(200)
            .send({
              msg: "User has been logged In",
              token: jwt.sign({ userID: user._id, role: user.role,username:user.username }, process.env.SecretKey),
            });
        } else {
          return res.status(400).send({ msgN: err.message });
        }
      });
    } else {
      return res.status(300).send({
        msg: "User doesn't has an account,please register to create an account",
      });
    }
  } catch (error) {
    res.status(400).send({ msgErr: `user has failed to login- ${error}` });
  }
});

userRouter.post("/logout", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const BlackListed = new BlackListedModel({ blackListed_token: token });
    await BlackListed.save();
    return res.status(200).send({ msg: "You have successfully logged out" });
  } catch (error) {
    res.status(200).send({ msg: error.message });
  }
});

userRouter.get("/regenerate",(req,res)=>{
  const token=req.headers.authorization?.split(" ")[1]
  try {
    res.status(200).send({msg:"token"})
  } catch (error) {
    res.status(400).send({msg:"token"})
  }

})
module.exports = {
  userRouter,
};
