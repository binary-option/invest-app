const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const Benchmark = require("../models/benchmark");
const _ = require("lodash");
const moment = require("moment");

router.get("/:startDate/:endDate", ensureLoggedIn(), function(req, res, next) {
  /**Get stat and end date from params. Ensure that start date is on monday
  and end date on friday.
  **/
  const startDate = moment(req.params.startDate).startOf("isoWeek");
  const endDate = moment(req.params.endDate)
    .startOf("isoWeek")
    .add(4, "days");
  //Retrieve the whole benchmark data
  Benchmark.find((err, benchmark) => {
    if (err) return next(err);
    //startDateQuery holds the object of the start date with date and rdiff value
    let startDateQuery = _.find(benchmark[0].rdiff, {
      date: startDate.format("YYYY-MM-DD")
    });
    //Create a moment for start date to calculate number of days between start and end
    let momentStartDate = moment(startDateQuery.date);
    /**Variables to make the for loop more understandable. Iteration starts at queryStart
     and will iterate queryLength times**/
    let queryStart = benchmark[0].rdiff.indexOf(startDateQuery);
    let queryLength = endDate.diff(momentStartDate, "weeks");
    let queryData = [];
    let queryIndex = queryStart;
    for (var i = queryStart; i <= queryStart + queryLength; i++) {
      queryData.push(benchmark[0].rdiff[queryIndex]);
      queryIndex += 5;
    }
    console.log("final ", queryData);

    res.json(queryData);
  });
});

router.post("/", ensureLoggedIn(), (req, res, next) => {
  const rdiff = req.body.rdiff;

  const benchmarkInfo = {
    rdiff
  };

  const newBenchmark = new Benchmark(benchmarkInfo);

  newBenchmark.save(err => {
    if (err) return next(err);
    res.json("Benchmark created successfully.");
  });
});

module.exports = router;
