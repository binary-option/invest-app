const mongoose = require("mongoose");
const { Schema } = mongoose;

const portfolioSchema = new Schema({
  stocks: [],
  movements: [],
  description: String,
  performance5y: Number,
  volatility: [],
  shapiroRate1y: Number,
  risk: Number,
  investors: [],
  followers: [],
  manager: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
