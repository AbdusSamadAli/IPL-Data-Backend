const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function loadMatches() {
  const filePath = path.join(
    __dirname,
    "../data/IPL_2022/matches/matches.json"
  );

  const raw = fs.readFileSync(filePath, "utf-8");
  const matches = JSON.parse(raw);

  console.log(`📄 matches.json records: ${matches.length}`);

  let inserted = 0;

  for (const m of matches) {
    if (!m.match_id) continue;

    await prisma.match.upsert({
      where: { id: Number(m.match_id) },

      update: {
        title: m.title,
        shortTitle: m.short_title || null,
        date: new Date(m.date_start),
        venue:
          m["venue/name"] ||
          m.venue?.name ||
          "Unknown Venue",

        teamA:
          m["teama/name"] ||
          m.teama?.name ||
          "TBD",

        teamB:
          m["teamb/name"] ||
          m.teamb?.name ||
          "TBD",

        winner:
          (m.winner && m.winner.trim()) ||
          (m.result && m.result.trim()) ||
          (m["teama/name"] || m.teama?.name) ||
          "No Result",


        winningTeamId: m.winning_team_id
          ? Number(m.winning_team_id)
          : null,
      },

      create: {
        id: Number(m.match_id),
        title: m.title,
        shortTitle: m.short_title || null,
        date: new Date(m.date_start),
        venue:
          m["venue/name"] ||
          m.venue?.name ||
          "Unknown Venue",
        teamA:
          m["teama/name"] ||
          m.teama?.name ||
          "TBD",
        teamB:
          m["teamb/name"] ||
          m.teamb?.name ||
          "TBD",

        winner:
          m.winning_team ||
          (m.result ? m.result.split(" won")[0] : null) ||
          null,

        winningTeamId: m.winning_team_id
          ? Number(m.winning_team_id)
          : null,
      },
    });


    inserted++;
  }

  console.log(`Matches loaded: ${inserted}`);
}

loadMatches()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
