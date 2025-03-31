import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { accounts, insertAccountSchema } from "@/db/schema";
import { eq } from "drizzle-orm";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";

const app = new Hono()
    .get(
        "/",
        clerkMiddleware(),
        async (c) => {
            const auth = getAuth(c);

            if (!auth?.userId) {
                return c.json({ error: "unauthorized" }, 401);
            }

            try {
                const data = await db.select({
                    id: accounts.id,
                    name: accounts.name,
                })
                .from(accounts)
                .where(eq(accounts.userId, auth.userId));

                return c.json({ data });
            } catch (error) {
                console.error("Database Error:", error);
                return c.json({ error: "Failed to fetch data" }, 500);
            }
        })
    .post("/", 
        clerkMiddleware(),
        zValidator("json", insertAccountSchema.pick({
            name: true,
        })),
        async (c) => {
            const auth = getAuth(c);
            const values = c.req.valid("json");

            if (!auth?.userId) {
                console.log("Unauthorized Access Attempt");
                return c.json({ error: "unauthorized" }, 401);
            }

            try {
                const [data] = await db.insert(accounts).values({
                    id: createId(),
                    userId: auth.userId,
                    ...values,
                }).returning();

                return c.json({ data });
            } catch (error) {
                console.error("Database Insert Error:", error);
                return c.json({ error: "Failed to create account" }, 500);
            }
        });

export default app;
