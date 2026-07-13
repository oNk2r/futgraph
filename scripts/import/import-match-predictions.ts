import { parseCsv } from "../../src/lib/csv";
import { prisma } from "../../src/lib/prisma";
import {
  parseIntSafe,
  parseIntOrNull,
  parseFloatSafe,
  parseFloatOrNull,
  parseBoolSafe,
  parseDateSafe,
  parseStringOrNull,
} from "../../src/lib/parser";

export async function importMatchPredictions() {
  console.log("⏳ Importing Match Predictions...");
  const records = await parseCsv("match_prediction_features.csv");

  // Fetch existing match IDs
  const existingMatches = await prisma.match.findMany({ select: { id: true } });
  const matchIds = new Set(existingMatches.map((m) => m.id));

  const data = records
    .filter((record) => {
      const matchId = parseIntSafe(record.match_id);
      if (!matchIds.has(matchId)) {
        console.warn(`⚠️ Skipped prediction features for match ID ${matchId}: Match not found.`);
        return false;
      }
      return true;
    })
    .map((record) => ({
      matchId: parseIntSafe(record.match_id),
      date: parseDateSafe(record.date),
      kickoffTimeUtc: record.kickoff_time_utc,
      stageId: parseIntSafe(record.stage_id),
      isKnockout: parseBoolSafe(record.is_knockout),
      homeTeamId: parseIntSafe(record.home_team_id),
      homeTeamName: record.home_team_name,
      homeFifaCode: record.home_fifa_code,
      homeConfederation: record.home_confederation,
      awayTeamId: parseIntSafe(record.away_team_id),
      awayTeamName: record.away_team_name,
      awayFifaCode: record.away_fifa_code,
      awayConfederation: record.away_confederation,
      venueId: parseIntSafe(record.venue_id),
      stadiumName: record.stadium_name,
      venueCity: record.venue_city,
      venueCountry: record.venue_country,
      venueCapacity: parseIntSafe(record.venue_capacity),
      venueElevationMeters: parseFloatSafe(record.venue_elevation_meters),
      refereeId: parseIntSafe(record.referee_id),
      refereeName: record.referee_name,
      refereeAvgCards: parseFloatSafe(record.referee_avg_cards),
      homeFifaRank: parseIntSafe(record.home_fifa_rank),
      awayFifaRank: parseIntSafe(record.away_fifa_rank),
      homeElo: parseFloatSafe(record.home_elo),
      awayElo: parseFloatSafe(record.away_elo),
      homeIsHost: parseBoolSafe(record.home_is_host),
      awayIsHost: parseBoolSafe(record.away_is_host),
      homeSquadAvgAge: parseFloatSafe(record.home_squad_avg_age),
      awaySquadAvgAge: parseFloatSafe(record.away_squad_avg_age),
      homeSquadTotalCaps: parseIntSafe(record.home_squad_total_caps),
      awaySquadTotalCaps: parseIntSafe(record.away_squad_total_caps),
      homeSquadTotalValueEur: parseFloatSafe(record.home_squad_total_value_eur),
      awaySquadTotalValueEur: parseFloatSafe(record.away_squad_total_value_eur),
      homeSquadAvgValueEur: parseFloatSafe(record.home_squad_avg_value_eur),
      awaySquadAvgValueEur: parseFloatSafe(record.away_squad_avg_value_eur),
      homeRestDays: parseFloatSafe(record.home_rest_days),
      awayRestDays: parseFloatSafe(record.away_rest_days),
      homePrevAvgGoalsScored: parseFloatSafe(record.home_prev_avg_goals_scored),
      homePrevAvgGoalsConceded: parseFloatSafe(record.home_prev_avg_goals_conceded),
      awayPrevAvgGoalsScored: parseFloatSafe(record.away_prev_avg_goals_scored),
      awayPrevAvgGoalsConceded: parseFloatSafe(record.away_prev_avg_goals_conceded),
      homePrevAvgPossession: parseFloatSafe(record.home_prev_avg_possession),
      awayPrevAvgPossession: parseFloatSafe(record.away_prev_avg_possession),
      homePrevAvgShots: parseFloatSafe(record.home_prev_avg_shots),
      awayPrevAvgShots: parseFloatSafe(record.away_prev_avg_shots),
      homePrevAvgShotsOnTarget: parseFloatSafe(record.home_prev_avg_shots_on_target),
      awayPrevAvgShotsOnTarget: parseFloatSafe(record.away_prev_avg_shots_on_target),
      homePrevAvgSaves: parseFloatSafe(record.home_prev_avg_saves),
      awayPrevAvgSaves: parseFloatSafe(record.away_prev_avg_saves),
      homePrevAvgCorners: parseFloatSafe(record.home_prev_avg_corners),
      awayPrevAvgCorners: parseFloatSafe(record.away_prev_avg_corners),
      homePrevAvgFouls: parseFloatSafe(record.home_prev_avg_fouls),
      awayPrevAvgFouls: parseFloatSafe(record.away_prev_avg_fouls),
      homePrevAvgOffsides: parseFloatSafe(record.home_prev_avg_offsides),
      awayPrevAvgOffsides: parseFloatSafe(record.away_prev_avg_offsides),
      homePrevAvgXgScored: parseFloatSafe(record.home_prev_avg_xg_scored),
      homePrevAvgXgConceded: parseFloatSafe(record.home_prev_avg_xg_conceded),
      awayPrevAvgXgScored: parseFloatSafe(record.away_prev_avg_xg_scored),
      awayPrevAvgXgConceded: parseFloatSafe(record.away_prev_avg_xg_conceded),
      homeScore: parseIntOrNull(record.home_score),
      awayScore: parseIntOrNull(record.away_score),
      resultType: parseStringOrNull(record.result_type),
      homeXg: parseFloatOrNull(record.home_xg),
      awayXg: parseFloatOrNull(record.away_xg),
      matchResult: parseStringOrNull(record.match_result),
    }));

  const result = await prisma.matchPredictionFeature.createMany({
    data,
    skipDuplicates: true,
  });

  console.log(`✔ Imported Match Predictions (${result.count} new records)`);
}

if (require.main === module) {
  importMatchPredictions()
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
