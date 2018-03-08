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
  picture: {
    type: String,
    default: ""
  },
  accountCreated: Date,
  role: {
    type: String,
    enum: ["client", "manager"],
    default: "client"
  },
  accountBalance: {
    type: Number,
    default: 10000
  },
  //Parameters only relevant for the customer:
  riskProfile: Number,
  bankAccount: String,
  customerPortfoliosOwned: [{ type: Schema.Types.ObjectId, ref: "Portfolio" }],
  customerWishList: [],
  customerInvestements: [
    {
      amountOfMoney: Number,
      portfolio: { type: Schema.Types.ObjectId, ref: "Portfolio" },
      investmentDate: Date,
      investmentUpdatedDate: Date
    }
  ],
  //Parameters only relevant for the portfolio manager
  certifications: [],
  description: String,
  managerPortfolios: [{ type: Schema.Types.ObjectId, ref: "Portfolio" }]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
