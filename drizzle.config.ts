import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import {config} from "dotenv";

config({
  path: '.env.local',
});

export default defineConfig({
  schema: './src/lib/db/schema.ts',
  out: './src/lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    // biome-ignore lint: Forbidden non-null assertion.
    url: process.env.POSTGRES_URL!,
  },
});
