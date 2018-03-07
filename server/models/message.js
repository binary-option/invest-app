const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  content: String,
  date: Date,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  portfolio: { type: Schema.Types.ObjectId, ref: "Portfolio" }
});

module.exports = mongoose.model("Message", messageSchema);
