var express = require("express");
var router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const User = require("../models/user");
const Portfolio = require("../models/portfolio");
const Message = require("../models/message");

/* GET users listing. */
router.get("/:portfolioId", ensureLoggedIn(), function(req, res, next) {
  const portfolioId = req.params.portfolioId;
  console.log(portfolioId);

  Message.find(
    {
      /*portfolio: portfolioId*/
    },
    (err, messages) => {
      if (err) return next(err);
      console.log("HERE ", messages);
      res.json(messages);
    }
  );
});

module.exports = router;
