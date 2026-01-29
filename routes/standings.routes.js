const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /standings:
 *   get:
 *     summary: Get IPL standings
 *     responses:
 *       200:
 *         description: Standings list
 */
router.get("/", async (req, res) => {
  try {
    const standings = await prisma.standing.findMany({
      orderBy: { points: "desc" },
    });
    res.json(standings);
  } catch {
    res.status(500).json({ error: "Failed to fetch standings" });
  }
});

module.exports = router;
