import { parseCsv } from "../../src/lib/csv";
import { prisma } from "../../src/lib/prisma";
import { parseBoolSafe, parseIntSafe } from "../../src/lib/parser";

export async function importStages() {
  console.log("⏳ Importing Stages...");
  const records = await parseCsv("tournament_stages.csv");

  const data = records.map((record) => ({
    id: parseIntSafe(record.stage_id),
    name: record.stage_name,
    isKnockout: parseBoolSafe(record.is_knockout),
  }));

  const result = await prisma.tournamentStage.createMany({
    data,
    skipDuplicates: true,
  });

  console.log(`✔ Imported Stages (${result.count} new records)`);
}

if (require.main === module) {
  importStages()
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
