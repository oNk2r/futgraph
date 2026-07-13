import { parseCsv } from "../../src/lib/csv";
import { prisma } from "../../src/lib/prisma";
import { parseIntSafe, parseBoolSafe, parseStringOrNull } from "../../src/lib/parser";

export async function importLineups() {
  console.log("⏳ Importing Match Lineups...");
  const records = await parseCsv("match_lineups.csv");

  // Fetch all existing referenced IDs for in-memory validation
  const existingMatches = await prisma.match.findMany({ select: { id: true } });
  const matchIds = new Set(existingMatches.map((m) => m.id));

  const existingTeams = await prisma.team.findMany({ select: { id: true } });
  const teamIds = new Set(existingTeams.map((t) => t.id));

  const existingPlayers = await prisma.player.findMany({ select: { id: true } });
  const playerIds = new Set(existingPlayers.map((p) => p.id));

  const data = records
    .filter((record) => {
      const id = parseIntSafe(record.lineup_id);
      const matchId = parseIntSafe(record.match_id);
      const playerId = parseIntSafe(record.player_id);
      const teamId = parseIntSafe(record.team_id);

      if (!matchIds.has(matchId)) {
        console.warn(`⚠️ Skipped Lineup ${id}: Match ID ${matchId} does not exist.`);
        return false;
      }
      if (!teamIds.has(teamId)) {
        console.warn(`⚠️ Skipped Lineup ${id}: Team ID ${teamId} does not exist.`);
        return false;
      }
      if (!playerIds.has(playerId)) {
        console.warn(`⚠️ Skipped Lineup ${id}: Player ID ${playerId} does not exist.`);
        return false;
      }
      return true;
    })
    .map((record) => ({
      id: parseIntSafe(record.lineup_id),
      matchId: parseIntSafe(record.match_id),
      playerId: parseIntSafe(record.player_id),
      teamId: parseIntSafe(record.team_id),
      isStartingXi: parseBoolSafe(record.is_starting_xi),
      tacticalPosition: parseStringOrNull(record.tactical_position),
      minutesPlayed: parseIntSafe(record.minutes_played),
    }));

  const result = await prisma.matchLineup.createMany({
    data,
    skipDuplicates: true,
  });

  console.log(`✔ Imported Match Lineups (${result.count} new records)`);
}

if (require.main === module) {
  importLineups()
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
