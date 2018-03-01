var express = require("express");
var router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const User = require("../models/user");

/* GET users listing. */
router.get("/", ensureLoggedIn(), function(req, res, next) {
  User.find({}, (err, users) => {
    if (err) return next(err);
    res.json(users);
  });
});

router.get("/:userId", ensureLoggedIn(), function(req, res, next) {
  User.findById(req.params.userId, (err, user) => {
    if (err) return next(err);
    res.json(user);
  });
});

router.get("/:userId/portfolios", ensureLoggedIn(), function(req, res, next) {
  User.findById(req.params.userId, (err, user) => {
    if (err) return next(err);
    res.json(user.customerPortfoliosOwned);
  });
});

module.exports = router;
