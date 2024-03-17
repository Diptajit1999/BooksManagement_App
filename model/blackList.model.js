const mongoose = require("mongoose");

const blackListSchema = new mongoose.Schema(
  {
    blackListed_token: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const BlackListedModel = mongoose.model("blacklist", blackListSchema);

module.exports = {
  BlackListedModel,
};
