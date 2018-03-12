const express = require("express");
const axios = require("axios");
const router = express.Router();

const quandl = axios.create({
  baseURL: "https://www.quandl.com/api/v3/datasets/WIKI",
  params: {
    api_key: "ksDZY91Cmzys4krssaHb"
  }
});

router.get("/:stockName", (req, res, next) => {
  quandl
    .get(`/${req.params.stockName}.json`, {
      params: req.query
    })
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      if (!err.response) return next(err);
      res.status(err.response.status).json(err.response.data);
    });
});

module.exports = router;
