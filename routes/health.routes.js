const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     responses:
 *       200:
 *         description: API is healthy
 */
router.get("/", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = router;
