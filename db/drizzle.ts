import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL!, { fetchOptions: { keepAlive: true } });
export const db = drizzle(sql);