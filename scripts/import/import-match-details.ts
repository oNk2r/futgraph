import { parseCsv } from "../../src/lib/csv";
import { prisma } from "../../src/lib/prisma";
import {
  parseIntSafe,
  parseIntOrNull,
  parseFloatOrNull,
  parseDateSafe,
  parseStringOrNull,
} from "../../src/lib/parser";

export async function importMatchDetails() {
  console.log("⏳ Importing Match Details...");
  const records = await parseCsv("matches_detailed.csv");

  // Fetch existing match IDs
  const existingMatches = await prisma.match.findMany({ select: { id: true } });
  const matchIds = new Set(existingMatches.map((m) => m.id));

  const data = records
    .filter((record) => {
      const matchId = parseIntSafe(record.match_id);
      if (!matchIds.has(matchId)) {
        console.warn(`⚠️ Skipped match detail for match ID ${matchId}: Match not found.`);
        return false;
      }
      return true;
    })
    .map((record) => ({
      matchId: parseIntSafe(record.match_id),
      date: parseDateSafe(record.date),
      kickoffTimeUtc: record.kickoff_time_utc,
      stageName: record.stage_name,
      stadiumName: record.stadium_name,
      city: record.city,
      country: record.country,
      homeTeamName: parseStringOrNull(record.home_team_name),
      homeFifaCode: parseStringOrNull(record.home_fifa_code),
      awayTeamName: parseStringOrNull(record.away_team_name),
      awayFifaCode: parseStringOrNull(record.away_fifa_code),
      homeScore: parseIntOrNull(record.home_score),
      awayScore: parseIntOrNull(record.away_score),
      homePenaltyScore: parseIntOrNull(record.home_penalty_score),
      awayPenaltyScore: parseIntOrNull(record.away_penalty_score),
      status: record.status,
      resultType: parseStringOrNull(record.result_type),
      homeXg: parseFloatOrNull(record.home_xg),
      awayXg: parseFloatOrNull(record.away_xg),
      homeGoalkeeper: parseStringOrNull(record.home_goalkeeper),
      awayGoalkeeper: parseStringOrNull(record.away_goalkeeper),
      playerOfTheMatchName: parseStringOrNull(record.player_of_the_match_name),
      refereeName: record.referee_name,
    }));

  const result = await prisma.matchDetail.createMany({
    data,
    skipDuplicates: true,
  });

  console.log(`✔ Imported Match Details (${result.count} new records)`);
}

if (require.main === module) {
  importMatchDetails()
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
