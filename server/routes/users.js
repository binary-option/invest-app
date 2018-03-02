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

router.get("/managers", ensureLoggedIn(), function(req, res, next) {
  User.find({ role: "manager" }, (err, managers) => {
    if (err) return next(err);
    res.json(managers);
  });
});

router.get("/clients", ensureLoggedIn(), function(req, res, next) {
  User.find({ role: "client" }, (err, managers) => {
    if (err) return next(err);
    res.json(managers);
  });
});

router.get("/:userId", ensureLoggedIn(), function(req, res, next) {
  User.findById(req.params.userId, (err, user) => {
    if (err) return next(err);
    res.json(user);
  });
});

router.patch("/:userId", ensureLoggedIn(), function(req, res, next) {
  const name = req.body.name;
  const familyName = req.body.familyName;
  const role = req.body.role;
  const username = req.body.username;
  const bankAccount = req.body.bankAccount;
  const userInfo = { name, familyName, role, username, bankAccount };

  User.findByIdAndUpdate(req.params.userId, userInfo, (err, user) => {
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
