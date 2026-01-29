const express = require("express");
const topWickets = require("../data/IPL_2022/bowling_stats/bowling_top_wicket_takers.json");

const router = express.Router();

router.get("/top-wickets", (req, res) => {
  const rows = Array.isArray(topWickets)
    ? topWickets
    : Array.isArray(topWickets.data)
    ? topWickets.data
    : Object.values(topWickets);

  res.json(rows.slice(0, 10));
});

module.exports = router;
