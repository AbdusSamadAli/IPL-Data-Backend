const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

/**
 * @swagger
 * /teams/stats:
 *   get:
 *     summary: Get team win stats
 */
router.get("/stats", (req, res) => {
  try {
    const filePath = path.resolve(
      "data/IPL_2022/team_stats/team_match_win.json"
    );
    const raw = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(raw);

    const stats = json?.response?.stats || [];
    res.json(
      stats.map(t => ({
        team: t.team.abbr,
        teamName: t.team.title,
        wins: Number(t.win),
        logo: t.team.logo_url,
      }))
    );
  } catch {
    res.status(500).json([]);
  }
});

/**
 * @swagger
 * /teams/runs-stats:
 *   get:
 *     summary: Get team run stats
 */
router.get("/runs-stats", (req, res) => {
  try {
    const filePath = path.resolve(
      "data/IPL_2022/team_stats/team_total_runs.json"
    );
    const raw = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(raw);

    const stats = json?.response?.stats || [];
    res.json(
      stats.map(t => ({
        team: t.team.abbr,
        teamName: t.team.title,
        runs: Number(t.runs),
      }))
    );
  } catch {
    res.status(500).json([]);
  }
});

/**
 * @swagger
 * /teams/wickets-stats:
 *   get:
 *     summary: Get total wickets by team
 *     responses:
 *       200:
 *         description: Team total wickets stats
 */
router.get("/wickets-stats", (req, res) => {
  try {
    const filePath = path.resolve(
      "data/IPL_2022/team_stats/team_total_wickets.json"
    );

    const raw = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(raw);

    const stats = json?.response?.stats || [];

    const result = stats.map(t => ({
      team: t.team.abbr,
      teamName: t.team.title,
      wickets: Number(t.wickets),
      logo: t.team.logo_url,
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});

module.exports = router;
