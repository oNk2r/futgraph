import path from "path";
import csvtojson from "csvtojson";

const DATA_DIR = path.resolve(process.cwd(), "data/fifa2026");

/**
 * Parses a CSV file from the data/fifa2026 directory into JSON.
 * @param fileName Name of the CSV file (e.g., 'teams.csv')
 */
export async function parseCsv<T = any>(fileName: string): Promise<T[]> {
  const filePath = path.join(DATA_DIR, fileName);
  try {
    const jsonArray = await csvtojson().fromFile(filePath);
    return jsonArray as T[];
  } catch (error) {
    console.error(`❌ Failed to parse CSV file: ${filePath}`, error);
    throw error;
  }
}
