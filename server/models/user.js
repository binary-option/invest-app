const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  // the username and password are added by passportLocalMongoose
  // we can add any extra information like facebooktokens (or
  // others) as well as a picture, etc
  name: {
    type: String,
    required: true
  },
  familyName: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  picture: String,
  accountCreated: Date,
  role: {
    type: String,
    enum: ["client", "manager"],
    default: "client"
  },
  //Parameters only relevant for the customer:
  riskProfile: Object,
  bankAccount: String,
  customerPortfoliosOwned: [],
  customerWishList: [],
  //Parameters only relevant for the portfolio manager
  certifications: [],
  description: String,
  managerPortfolios: []
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
