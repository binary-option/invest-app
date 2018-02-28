const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const Portfolio = require("../models/portfolio");
const User = require("../models/user");

/* GET home page. */
router.get("/", ensureLoggedIn(), function(req, res, next) {
  Portfolio.find({}, (err, portfolios) => {
    if (err) return next(err);
    res.json(portfolios);
  });
});

router.post("/", ensureLoggedIn(), (req, res, next) => {
  const managerId = req.user._id;
  const description = req.body.description;
  const portfolioName = req.body.portfolioName;
  const stocks = req.body.stocks;

  const portfolioInfo = {
    manager: managerId,
    description,
    portfolioName,
    stocks
  };

  User.findById(managerId, (err, manager) => {
    if (err) return next(err);
    if (manager.role === "manager") {
      const newPortfolio = new Portfolio(portfolioInfo);

      newPortfolio.save(err => {
        if (err) return next(err);
        res.json("Portfolio created successfully.");
      });
    } else {
      res.json("The user is not a manager.");
    }
  });
});

router.patch("/:portfolioId", ensureLoggedIn(), (req, res, next) => {
  const portfolioId = req.params.portfolioId;
  const managerId = req.user._id;
  const description = req.body.description;
  const portfolioName = req.body.portfolioName;

  const portfolioInfo = {
    manager: managerId,
    description,
    portfolioName
  };

  User.findById(managerId, (err, manager) => {
    if (err) return next(err);
    if (manager.role === "manager") {
      const newPortfolio = new Portfolio(portfolioInfo);

      newPortfolio.save(err => {
        if (err) return next(err);
        res.json("Portfolio created successfully.");
      });
    } else {
      res.json("The user is not a manager.");
    }
  });
});

module.exports = router;
