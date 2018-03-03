const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const Benchmark = require("../models/benchmark");
const _ = require("lodash");
const moment = require("moment");

router.get("/:startDate/:endDate", ensureLoggedIn(), function(req, res, next) {
  const startDate = req.params.startDate;
  const endDate = req.params.endDate;
  Benchmark.find((err, benchmark) => {
    console.log(res);
    if (err) return next(err);
    let momentStartDate = moment(
      _.find(benchmark[0].rdiff, { date: startDate }).date
    );
    let momentEndDate = moment(
      _.find(benchmark[0].rdiff, { date: endDate }).date
    );

    console.log(momentEndDate.diff(momentStartDate, "days"));
    // let momentEndDate = moment(endDateRdiff.date);
    // console.log("a", momentEndDate);

    res.json(benchmark);
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
