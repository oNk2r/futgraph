import { parseCsv } from "../../src/lib/csv";
import { prisma } from "../../src/lib/prisma";
import { parseIntSafe, parseDateSafe, parseStringOrNull } from "../../src/lib/parser";

export async function importTeamStats() {
  console.log("⏳ Importing Match Team Stats...");
  const records = await parseCsv("match_team_stats.csv");

  // Fetch referenced IDs
  const existingMatches = await prisma.match.findMany({ select: { id: true } });
  const matchIds = new Set(existingMatches.map((m) => m.id));

  const existingTeams = await prisma.team.findMany({ select: { id: true } });
  const teamIds = new Set(existingTeams.map((t) => t.id));

  const data = records
    .filter((record) => {
      const matchId = parseIntSafe(record.match_id);
      const teamId = parseIntSafe(record.team_id);

      if (!matchIds.has(matchId)) {
        console.warn(`⚠️ Skipped Team Stats: Match ID ${matchId} does not exist.`);
        return false;
      }
      if (!teamIds.has(teamId)) {
        console.warn(`⚠️ Skipped Team Stats: Team ID ${teamId} does not exist.`);
        return false;
      }
      return true;
    })
    .map((record) => ({
      matchId: parseIntSafe(record.match_id),
      teamId: parseIntSafe(record.team_id),
      possessionPct: parseIntSafe(record.possession_pct),
      totalShots: parseIntSafe(record.total_shots),
      shotsOnTarget: parseIntSafe(record.shots_on_target),
      corners: parseIntSafe(record.corners),
      fouls: parseIntSafe(record.fouls),
      offsides: parseIntSafe(record.offsides),
      saves: parseIntSafe(record.saves),
      playerOfTheMatch: parseStringOrNull(record.player_of_the_match),
      dataSource: record.data_source,
      lastUpdated: parseDateSafe(record.last_updated),
    }));

  const result = await prisma.matchTeamStats.createMany({
    data,
    skipDuplicates: true,
  });

  console.log(`✔ Imported Match Team Stats (${result.count} new records)`);
}

if (require.main === module) {
  importTeamStats()
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
