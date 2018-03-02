const mongoose = require("mongoose");
const { Schema } = mongoose;

const stockSchema = new Schema(
  {
    stockName: String,
    stockValue: Number,
    stockStartingDate: Date,
    holdingValue: Number
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
  movements: [],
  description: {
    type: String,
    required: true
  },
  performance1y: Number,
  performance5y: Number,
  volatility: [],
  shapiroRate1y: Number,
  risk: Number,
  investors: [],
  followers: [],
  manager: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
