import { parseCsv } from "../../src/lib/csv";
import { prisma } from "../../src/lib/prisma";
import {
  parseIntSafe,
  parseIntOrNull,
  parseFloatOrNull,
  parseDateSafe,
  parseStringOrNull,
} from "../../src/lib/parser";

export async function importMatches() {
  console.log("⏳ Importing Matches...");
  const records = await parseCsv("matches.csv");

  // Fetch all existing referenced IDs for in-memory validation
  const existingStages = await prisma.tournamentStage.findMany({ select: { id: true } });
  const stageIds = new Set(existingStages.map((s) => s.id));

  const existingVenues = await prisma.venue.findMany({ select: { id: true } });
  const venueIds = new Set(existingVenues.map((v) => v.id));

  const existingTeams = await prisma.team.findMany({ select: { id: true } });
  const teamIds = new Set(existingTeams.map((t) => t.id));

  const existingReferees = await prisma.referee.findMany({ select: { id: true } });
  const refereeIds = new Set(existingReferees.map((r) => r.id));

  const existingPlayers = await prisma.player.findMany({ select: { id: true } });
  const playerIds = new Set(existingPlayers.map((p) => p.id));

  const data = records
    .filter((record) => {
      const matchId = parseIntSafe(record.match_id);
      const stageId = parseIntSafe(record.stage_id);
      const venueId = parseIntSafe(record.venue_id);
      const refereeId = parseIntSafe(record.referee_id);

      if (!stageIds.has(stageId)) {
        console.warn(`⚠️ Skipped Match ${matchId}: Stage ID ${stageId} does not exist.`);
        return false;
      }
      if (!venueIds.has(venueId)) {
        console.warn(`⚠️ Skipped Match ${matchId}: Venue ID ${venueId} does not exist.`);
        return false;
      }
      if (!refereeIds.has(refereeId)) {
        console.warn(`⚠️ Skipped Match ${matchId}: Referee ID ${refereeId} does not exist.`);
        return false;
      }
      return true;
    })
    .map((record) => {
      const homeTeamId = parseIntOrNull(record.home_team_id);
      const awayTeamId = parseIntOrNull(record.away_team_id);
      const playerOfTheMatchId = parseIntOrNull(record.player_of_the_match_id);

      return {
        id: parseIntSafe(record.match_id),
        date: parseDateSafe(record.date),
        kickoffTimeUtc: record.kickoff_time_utc,
        stageId: parseIntSafe(record.stage_id),
        venueId: parseIntSafe(record.venue_id),
        homeTeamId: homeTeamId && teamIds.has(homeTeamId) ? homeTeamId : null,
        awayTeamId: awayTeamId && teamIds.has(awayTeamId) ? awayTeamId : null,
        homeScore: parseIntOrNull(record.home_score),
        awayScore: parseIntOrNull(record.away_score),
        homePenaltyScore: parseIntOrNull(record.home_penalty_score),
        awayPenaltyScore: parseIntOrNull(record.away_penalty_score),
        status: record.status,
        resultType: parseStringOrNull(record.result_type),
        homeXg: parseFloatOrNull(record.home_xg),
        awayXg: parseFloatOrNull(record.away_xg),
        refereeId: parseIntSafe(record.referee_id),
        playerOfTheMatchId:
          playerOfTheMatchId && playerIds.has(playerOfTheMatchId) ? playerOfTheMatchId : null,
      };
    });

  const result = await prisma.match.createMany({
    data,
    skipDuplicates: true,
  });

  console.log(`✔ Imported Matches (${result.count} new records)`);
}

if (require.main === module) {
  importMatches()
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
