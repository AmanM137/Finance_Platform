import type { Context } from "@netlify/edge-functions";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

export default async (request: Request, context: Context) => {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle({ client: sql });

};
