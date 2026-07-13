import { parseCsv } from "../../src/lib/csv";
import { prisma } from "../../src/lib/prisma";
import { parseIntSafe, parseDateSafe } from "../../src/lib/parser";

export async function importPlayers() {
  console.log("⏳ Importing Players...");
  const records = await parseCsv("squads_and_players.csv");

  // Fetch all existing team IDs for in-memory validation
  const existingTeams = await prisma.team.findMany({ select: { id: true } });
  const teamIds = new Set(existingTeams.map((t) => t.id));

  const data = records
    .filter((record) => {
      const teamId = parseIntSafe(record.team_id);
      if (!teamIds.has(teamId)) {
        console.warn(`⚠️ Skipped player ${record.player_name}: Team ID ${teamId} does not exist.`);
        return false;
      }
      return true;
    })
    .map((record) => ({
      id: parseIntSafe(record.player_id),
      teamId: parseIntSafe(record.team_id),
      name: record.player_name,
      position: record.position,
      clubTeam: record.club_team,
      marketValueEur: parseIntSafe(record.market_value_eur),
      caps: parseIntSafe(record.caps),
      dateOfBirth: parseDateSafe(record.date_of_birth),
      heightCm: parseIntSafe(record.height_cm),
      goals: parseIntSafe(record.goals),
    }));

  const result = await prisma.player.createMany({
    data,
    skipDuplicates: true,
  });

  console.log(`✔ Imported Players (${result.count} new records)`);
}

if (require.main === module) {
  importPlayers()
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
