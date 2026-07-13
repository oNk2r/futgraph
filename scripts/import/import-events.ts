import { parseCsv } from "../../src/lib/csv";
import { prisma } from "../../src/lib/prisma";
import { parseIntSafe } from "../../src/lib/parser";

export async function importEvents() {
  console.log("⏳ Importing Match Events...");
  const records = await parseCsv("match_events.csv");

  // Fetch all existing referenced IDs for in-memory validation
  const existingMatches = await prisma.match.findMany({ select: { id: true } });
  const matchIds = new Set(existingMatches.map((m) => m.id));

  const existingTeams = await prisma.team.findMany({ select: { id: true } });
  const teamIds = new Set(existingTeams.map((t) => t.id));

  const existingPlayers = await prisma.player.findMany({ select: { id: true } });
  const playerIds = new Set(existingPlayers.map((p) => p.id));

  const data = records
    .filter((record) => {
      const id = parseIntSafe(record.event_id);
      const matchId = parseIntSafe(record.match_id);
      const teamId = parseIntSafe(record.team_id);
      const playerId = parseIntSafe(record.player_id);

      if (!matchIds.has(matchId)) {
        console.warn(`⚠️ Skipped Event ${id}: Match ID ${matchId} does not exist.`);
        return false;
      }
      if (!teamIds.has(teamId)) {
        console.warn(`⚠️ Skipped Event ${id}: Team ID ${teamId} does not exist.`);
        return false;
      }
      if (!playerIds.has(playerId)) {
        console.warn(`⚠️ Skipped Event ${id}: Player ID ${playerId} does not exist.`);
        return false;
      }
      return true;
    })
    .map((record) => ({
      id: parseIntSafe(record.event_id),
      matchId: parseIntSafe(record.match_id),
      minute: record.minute,
      eventType: record.event_type,
      teamId: parseIntSafe(record.team_id),
      playerId: parseIntSafe(record.player_id),
    }));

  const result = await prisma.matchEvent.createMany({
    data,
    skipDuplicates: true,
  });

  console.log(`✔ Imported Match Events (${result.count} new records)`);
}

if (require.main === module) {
  importEvents()
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
