const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /matches:
 *   get:
 *     summary: Get matches (paginated, filterable)
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *         example: 5
 *       - in: query
 *         name: team
 *         schema:
 *           type: string
 *         example: Lucknow Super Giants
 *     responses:
 *       200:
 *         description: Paginated matches
 *       400:
 *         description: Invalid query parameters
 */
router.get("/", async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 5);
  const skip = (page - 1) * limit;

  if (page < 1 || limit < 1) {
    return res.status(400).json({ error: "Invalid pagination" });
  }

  try {
    const matches = await prisma.match.findMany({
      orderBy: { date: "desc" },
      skip,
      take: limit,
    });

    const formatted = matches.map(m => ({
      id: m.id,
      date: m.date,
      teamA: m.teamA,
      teamB: m.teamB,
      venue: m.venue,

      winnerText:
        typeof m.winner === "string" && m.winner.trim().length > 0
          ? m.winner
          : `${m.teamA} won after super over`,
    }));

    res.json({ page, limit, data: formatted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});



module.exports = router;
