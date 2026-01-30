const path = require("path");
const { PrismaClient } = require("@prisma/client");
const { readJSON } = require("./utils");

const prisma = new PrismaClient();

async function loadStandings() {
  const filePath = path.join(
    __dirname,
    "../data/IPL_2022/standings/standings.json"
  );

  const data = readJSON(filePath);
  const standingsObj = data.standings[0].standings;
  const standings = Object.values(standingsObj);

  for (const row of standings) {
    await prisma.standing.create({
      data: {
        team: row.team.title,
        matches: Number(row.played),
        wins: Number(row.win),
        losses: Number(row.loss),
        points: Number(row.points),
        nrr: Number(row.netrr)
      }
    });
  }

  console.log("Standings loaded");
}

loadStandings()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
