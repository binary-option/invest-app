const mongoose = require("mongoose");
const { Schema } = mongoose;

const stockSchema = new Schema(
  {
    stockName: String,
    stockValue: Number,
    stockStartingDate: Date,
    holdingValue: Number,
    lastUpdatedDate: Date
  },
  { noId: true }
);

const portfolioSchema = new Schema({
  portfolioName: {
    type: String,
    required: true,
    unique: true
  },
  stocks: [stockSchema],
  movements: [{
    date: Date,
    amountOfMoney: Number,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    // action: {
    //   enum: ["buy", "sell"],
    //   default: "buy"
    // }
  }],
  description: {
    type: String,
    required: true
  },
  performance1y: Number,
  performance5y: Number,
  volatility: [],
  shapiroRate1y: Number,
  risk: Number,
  investors: [{ type: Schema.Types.ObjectId, ref: "User" }],
  followers: [],
  manager: { type: Schema.Types.ObjectId, ref: "User" },
  messages: [
    {
      content: String,
      user: { type: Schema.Types.ObjectId, ref: "User" },
      date: Date
    }
  ],
  returns: [],
  alreadyRated: {
    type: Boolean,
    default: false
  },
  ratings: [Number]
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
