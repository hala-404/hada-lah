import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const DATABASE_URL = process.env.DATABASE_URL;

let cached = (global as any).drizzle || { conn: null, db: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.db;

  if(!DATABASE_URL) throw new Error('DATABASE_URL is missing');

  const pool = new Pool({
    connectionString: DATABASE_URL,
  });

  cached.conn = pool;
  cached.db = drizzle(pool, { schema });

  return cached.db;
};

