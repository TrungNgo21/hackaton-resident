// "use server";
//
// import fs from "fs";
// import path from "path";
// import { db } from "../../lib/db";
// import { properties } from "@/lib/db/schema";
// import { parse } from "csv-parse/sync";
//
// export async function importDataFromCSV() {
//   try {
//     // Read the CSV file
//     const filePath = path.join(process.cwd(), "public", "cleaned_reduced.csv");
//     const fileContent = fs.readFileSync(filePath, "utf-8");
//
//     // Parse the CSV data
//     const records = parse(fileContent, {
//       columns: true,
//       skip_empty_lines: true,
//     });
//
//     // Transform the data to match our schema
//     const formattedData = records.map((record: Record<string, string>) => ({
//       district: record.district,
//       place: record.place,
//       img: record.img,
//       electricity: parseInt(record.electricity_cleaned, 10),
//       wifi: parseInt(record.wifi_cleaned, 10),
//       waterUnit: record.water_unit_cleaned,
//       waterPricePerUnit: parseInt(record.water_price_per_unit_cleaned, 10),
//     }));
//
//     // Insert the data into the database
//     await db.insert(properties).values(formattedData);
//
//     console.log(`Successfully imported ${formattedData.length} records`);
//   } catch (error) {
//     console.error("Error importing data:", error);
//     throw new Error(error instanceof Error ? error.message : "Unknown error");
//   }
// }
