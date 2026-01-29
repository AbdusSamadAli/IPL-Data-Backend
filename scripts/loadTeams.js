const path = require("path");
const { PrismaClient } = require("@prisma/client");
const { readJSON } = require("./utils");

const prisma = new PrismaClient();

async function loadTeams() {
  const filePath = path.join(
    __dirname,
    "../data/IPL_2022/teams/teams.json"
  );

  const teams = readJSON(filePath);

  for (const team of teams) {
    await prisma.team.upsert({
      where: { name: team.title },
      update: {},
      create: {
        name: team.title,
        shortName: team.abbr
      }
    });
  }

  console.log("✅ Teams loaded");
}

loadTeams()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
