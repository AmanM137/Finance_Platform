import { relations } from "drizzle-orm/relations";
import { accounts, transactions, categories } from "./schema";

export const transactionsRelations = relations(transactions, ({one}) => ({
	account: one(accounts, {
		fields: [transactions.accountId],
		references: [accounts.id]
	}),
	category: one(categories, {
		fields: [transactions.categoryId],
		references: [categories.id]
	}),
}));

export const accountsRelations = relations(accounts, ({many}) => ({
	transactions: many(transactions),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	transactions: many(transactions),
}));