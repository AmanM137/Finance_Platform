import { pgTable, text, foreignKey, integer, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const categories = pgTable("categories", {
	id: text().primaryKey().notNull(),
	plaidId: text("plaid_id"),
	name: text().notNull(),
	userId: text("user_id").notNull(),
});

export const accounts = pgTable("accounts", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	userId: text("user_id").notNull(),
	plaidId: text("plaid_id"),
});

export const transactions = pgTable("transactions", {
	id: text().primaryKey().notNull(),
	amount: integer().notNull(),
	payee: text().notNull(),
	notes: text(),
	date: timestamp({ mode: 'string' }).notNull(),
	accountId: text("account_id").notNull(),
	categoryId: text("category_id"),
}, (table) => [
	foreignKey({
			columns: [table.accountId],
			foreignColumns: [accounts.id],
			name: "transactions_account_id_accounts_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [categories.id],
			name: "transactions_category_id_categories_id_fk"
		}).onDelete("set null"),
]);
