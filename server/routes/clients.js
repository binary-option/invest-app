var express = require("express");
var router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const User = require("../models/user");

/* GET users listing. */
router.get("/", ensureLoggedIn(), function(req, res, next) {
  User.find({ role: "client" }, (err, clients) => {
    if (err) return next(err);
    res.json(clients);
  });
});

router.get("/:clientId", ensureLoggedIn(), function(req, res, next) {
  User.findById(req.params.clientId, (err, client) => {
    if (err) return next(err);
    res.json(client);
  });
});

router.get("/:clientId/portfolios", ensureLoggedIn(), function(req, res, next) {
  User.findById(req.params.clientId, (err, client) => {
    if (err) return next(err);
    res.json(client.customerPortfoliosOwned);
  });
});

module.exports = router;
