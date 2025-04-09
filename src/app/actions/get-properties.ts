"use server";

import { db } from "@/db";
import { properties } from "@/db/schema";

export async function getProperties() {
  try {
    const allProperties = await db.select().from(properties);
    return allProperties;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
