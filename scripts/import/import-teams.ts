import { parseCsv } from "../../src/lib/csv";
import { prisma } from "../../src/lib/prisma";
import { parseIntSafe } from "../../src/lib/parser";

export async function importTeams() {
  console.log("⏳ Importing Teams...");
  const records = await parseCsv("teams.csv");

  const data = records.map((record) => ({
    id: parseIntSafe(record.team_id),
    name: record.team_name,
    fifaCode: record.fifa_code,
    groupLetter: record.group_letter,
    confederation: record.confederation,
    fifaRankingPreTournament: parseIntSafe(record.fifa_ranking_pre_tournament),
    eloRating: parseIntSafe(record.elo_rating),
    managerName: record.manager_name,
  }));

  const result = await prisma.team.createMany({
    data,
    skipDuplicates: true,
  });

  console.log(`✔ Imported Teams (${result.count} new records)`);
}

if (require.main === module) {
  importTeams()
    .then(async () => {
      await prisma.$disconnect();
      process.exit(0);
    })
    .catch(async (err) => {
      console.error(err);
      await prisma.$disconnect();
      process.exit(1);
    });
}
