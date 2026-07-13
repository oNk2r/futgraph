import { parseCsv } from "../../src/lib/csv";
import { prisma } from "../../src/lib/prisma";
import { parseIntSafe, parseFloatSafe } from "../../src/lib/parser";

export async function importReferees() {
  console.log("⏳ Importing Referees...");
  const records = await parseCsv("referees.csv");

  const data = records.map((record) => ({
    id: parseIntSafe(record.referee_id),
    name: record.name,
    country: record.country,
    avgCardsPerGame: parseFloatSafe(record.avg_cards_per_game),
  }));

  const result = await prisma.referee.createMany({
    data,
    skipDuplicates: true,
  });

  console.log(`✔ Imported Referees (${result.count} new records)`);
}

if (require.main === module) {
  importReferees()
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
