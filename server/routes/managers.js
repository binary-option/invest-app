var express = require("express");
var router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const User = require("../models/user");

/* GET users listing. */
router.get("/", ensureLoggedIn(), function(req, res, next) {
  User.find({ role: "manager" }, (err, managers) => {
    if (err) return next(err);
    res.json(managers);
  });
});

router.get("/:managerId", ensureLoggedIn(), function(req, res, next) {
  User.findById(req.params.managerId, (err, manager) => {
    if (err) return next(err);
    res.json(manager);
  });
});

router.get("/:managerId/portfolios", ensureLoggedIn(), function(
  req,
  res,
  next
) {
  User.findById(req.params.managerId, (err, manager) => {
    if (err) return next(err);
    res.json(manager.managerPortfolios);
  });
});

module.exports = router;
