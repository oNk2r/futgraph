import { parseCsv } from "../../src/lib/csv";
import { prisma } from "../../src/lib/prisma";
import { parseIntSafe, parseFloatSafe } from "../../src/lib/parser";

export async function importVenues() {
  console.log("⏳ Importing Venues...");
  const records = await parseCsv("venues.csv");

  const data = records.map((record) => ({
    id: parseIntSafe(record.venue_id),
    stadiumName: record.stadium_name,
    city: record.city,
    country: record.country,
    capacity: parseIntSafe(record.capacity),
    latitude: parseFloatSafe(record.latitude),
    longitude: parseFloatSafe(record.longitude),
    elevationMeters: parseFloatSafe(record.elevation_meters),
  }));

  const result = await prisma.venue.createMany({
    data,
    skipDuplicates: true,
  });

  console.log(`✔ Imported Venues (${result.count} new records)`);
}

if (require.main === module) {
  importVenues()
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
