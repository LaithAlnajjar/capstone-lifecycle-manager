import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const databaseUrl =
  process.env.DATABASE_URL ||
  (process.env.DB_USER &&
   process.env.DB_PASSWORD &&
   process.env.DB_HOST &&
   process.env.DB_PORT &&
   process.env.DB_NAME
    ? `postgresql://${encodeURIComponent(process.env.DB_USER)}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    : undefined);

if (!databaseUrl) {
  throw new Error(
    'Set DATABASE_URL or DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, and DB_NAME in .env'
  );
}

export default defineConfig({
  out: './drizzle',
  schema: './src/infrastructure/database/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: databaseUrl,
  },
});
