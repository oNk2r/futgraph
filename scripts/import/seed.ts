import { prisma } from "../../src/lib/prisma";
import { importStages } from "./import-stages";
import { importReferees } from "./import-referees";
import { importVenues } from "./import-venues";
import { importTeams } from "./import-teams";
import { importPlayers } from "./import-players";
import { importPlayerStats } from "./import-player-stats";
import { importMatches } from "./import-matches";
import { importMatchDetails } from "./import-match-details";
import { importMatchPredictions } from "./import-match-predictions";
import { importEvents } from "./import-events";
import { importLineups } from "./import-lineups";
import { importTeamStats } from "./import-team-stats";

async function main() {
  console.log("🚀 Starting FutGraph AI Database Seeding Process...");
  const start = Date.now();

  try {
    // 1. Independent Lookup Tables
    await importStages();
    await importReferees();
    await importVenues();
    await importTeams();

    // 2. Player-level details (depends on Teams)
    await importPlayers();
    await importPlayerStats();

    // 3. Match-level details (depends on Stages, Venues, Teams, Referees, Players)
    await importMatches();
    await importMatchDetails();
    await importMatchPredictions();

    // 4. Match events, lineups, and team stats (depends on Matches, Teams, Players)
    await importEvents();
    await importLineups();
    await importTeamStats();

    const duration = ((Date.now() - start) / 1000).toFixed(2);
    console.log(`\n🎉 Database Seeding completed successfully in ${duration} seconds!`);
  } catch (error) {
    console.error("\n❌ Database Seeding failed with error:", error);
    throw error;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (err) => {
    await prisma.$disconnect();
    process.exit(1);
  });
