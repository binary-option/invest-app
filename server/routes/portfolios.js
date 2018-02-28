const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const Portfolio = require("../models/portfolio");

/* GET home page. */
router.get("/", ensureLoggedIn(), function(req, res, next) {
  Portfolio.find({}, (err, portfolios) => {
    if (err) return next(err);
    res.json(portfolios);
  });
});

module.exports = router;
