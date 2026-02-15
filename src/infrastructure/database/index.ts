import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

function getConnectionString(): string {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT;
  const db = process.env.DB_NAME;
  if (user && password != null && host && port && db) {
    return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${db}`;
  }
  throw new Error(
    'Set DATABASE_URL or DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, and DB_NAME'
  );
}

const pool = new Pool({
  connectionString: getConnectionString(),
});

export const db = drizzle(pool, { schema });