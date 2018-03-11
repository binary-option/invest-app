const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const Benchmark = require("../models/benchmark");
const _ = require("lodash");
const moment = require("moment");

/** This method retrieves the rdiff, value and date for the index between the 
given dates. It sets the end date first, then calculates the start date as
the day n-weeks * 5 days previous to the end date. This approach is used to 
simplify the query, as comparing dates one-by-one is computing-intensive and 
normally the data source would be consistent (e.g. same supplier for both
indexes as in this case SP500 and stock information)
**/
router.get("/:startDate/:endDate", ensureLoggedIn(), function(req, res, next) {
  /**Get stat and end date from params. Ensure that start date is on monday
  and end date on friday.
  **/
  const startDate = moment(req.params.startDate).startOf("isoWeek");
  const endDate2 = moment(req.params.endDate).startOf("isoWeek");
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
    let endDateQuery = _.find(benchmark[0].rdiff, {
      date: endDate2.format("YYYY-MM-DD")
    });
    //Create a moment for start date to calculate number of days between start and end
    let momentStartDate = moment(startDateQuery.date);
    /**Variables to make the for loop more understandable. Iteration starts at queryStart
     and will iterate queryLength times**/
    let queryLength = endDate.diff(momentStartDate, "weeks");
    //let queryStart = benchmark[0].rdiff.indexOf(startDateQuery);
    let queryEnd = benchmark[0].rdiff.indexOf(endDateQuery);

    let queryDataRdiff = [];
    let queryDataDate = [];
    let queryDataValue = [];
    let queryIndex = queryEnd - queryLength * 5;

    for (var i = queryEnd - queryLength; i < queryEnd; i++) {
      queryDataRdiff.push(benchmark[0].rdiff[queryIndex].rdiff);
      queryDataDate.push(benchmark[0].rdiff[queryIndex].date);
      queryDataValue.push(benchmark[0].rdiff[queryIndex].value);
      queryIndex += 5;
    }
    let queryData = {
      value: queryDataValue,
      rdiff: queryDataRdiff,
      date: queryDataDate
    };

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
