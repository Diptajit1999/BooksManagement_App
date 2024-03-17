const jwt = require("jsonwebtoken");
require("dotenv").config();
const { BlackListedModel } = require("../model/blackList.model");
const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const blackListed = await BlackListedModel.findOne({
      blackListed_token: token,
    });
    if (blackListed) {
      return res
        .status(200)
        .send({ msg: "You have logged out, Please login in" });
    }
    if (token) {
      jwt.verify(token, process.env.SecretKey, (err, decoded) => {
        console.log(decoded);
        if (decoded) {
          req.body.userID = decoded.userID;
          req.body.username = decoded.username;
          req.body.role = decoded.role;
          next();
        } else {
          res.status(300).send({ msg: "token verification problem" });
        }
      });
    } else {
      res.status().send({ msg: "you are not authorized" });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

module.exports = {
  auth,
};
