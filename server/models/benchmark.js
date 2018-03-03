const mongoose = require("mongoose");
const { Schema } = mongoose;

const benchmarkSchema = new Schema({
  rdiff: Array
});

module.exports = mongoose.model("Benchmark", benchmarkSchema);
