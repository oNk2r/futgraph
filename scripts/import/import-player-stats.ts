import { parseCsv } from "../../src/lib/csv";
import { prisma } from "../../src/lib/prisma";
import {
  parseIntSafe,
  parseIntOrNull,
  parseFloatOrNull,
  parseDateSafe,
  parseStringOrNull,
} from "../../src/lib/parser";

export async function importPlayerStats() {
  console.log("⏳ Importing Player Stats...");
  const records = await parseCsv("player_stats.csv");

  // Fetch all existing player and team IDs for in-memory validation
  const existingPlayers = await prisma.player.findMany({ select: { id: true } });
  const playerIds = new Set(existingPlayers.map((p) => p.id));

  const existingTeams = await prisma.team.findMany({ select: { id: true } });
  const teamIds = new Set(existingTeams.map((t) => t.id));

  const data = records
    .filter((record) => {
      const playerId = parseIntSafe(record.player_id);
      const teamId = parseIntSafe(record.team_id);

      if (!playerIds.has(playerId)) {
        console.warn(`⚠️ Skipped player stats for player ID ${playerId}: Player does not exist.`);
        return false;
      }
      if (!teamIds.has(teamId)) {
        console.warn(`⚠️ Skipped player stats for player ID ${playerId}: Team ID ${teamId} does not exist.`);
        return false;
      }
      return true;
    })
    .map((record) => ({
      playerId: parseIntSafe(record.player_id),
      teamId: parseIntSafe(record.team_id),
      position: record.position,
      matchesPlayed: parseIntSafe(record.matches_played),
      matchesStarted: parseIntSafe(record.matches_started),
      minutesPlayed: parseIntSafe(record.minutes_played),
      goals: parseIntSafe(record.goals),
      assists: parseIntSafe(record.assists),
      shots: parseIntOrNull(record.shots),
      shotsOnTarget: parseIntOrNull(record.shots_on_target),
      yellowCards: parseIntSafe(record.yellow_cards),
      redCards: parseIntSafe(record.red_cards),
      penaltyGoals: parseIntSafe(record.penalty_goals),
      ownGoals: parseIntSafe(record.own_goals),
      cleanSheets: parseIntOrNull(record.clean_sheets),
      saves: parseIntOrNull(record.saves),
      goalsConceded: parseIntOrNull(record.goals_conceded),
      averageRating: parseFloatOrNull(record.average_rating),
      dataSource: parseStringOrNull(record.data_source),
      lastVerified: parseDateSafe(record.last_verified),
    }));

  const result = await prisma.playerStats.createMany({
    data,
    skipDuplicates: true,
  });

  console.log(`✔ Imported Player Stats (${result.count} new records)`);
}

if (require.main === module) {
  importPlayerStats()
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
