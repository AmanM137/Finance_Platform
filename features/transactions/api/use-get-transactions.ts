import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { useSearchParams } from "next/navigation";
import { convertAmountFromMiliunits } from "@/lib/utils";

export const useGetTransactions = () => {
    const params = useSearchParams();
    const from = params.get("from") || "";
    const to = params.get("to") || "";
    const accountId = params.get("accountId") || "";

    return useQuery({
        queryKey: ["transactions", { from, to, accountId }],
        queryFn: async () => {
            const response = await client.api.transactions.$get({
                query: { from, to, accountId },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch transactions");
            }

            const { data } = await response.json();

            return data.map((transaction) => ({
                id: transaction.id,
                date: transaction.date ? new Date(transaction.date).toISOString() : "",
                category: transaction.category || null,
                categoryId: transaction.categoryId || null,
                payee: transaction.payee || "",
                amount: convertAmountFromMiliunits(transaction.amount),
                notes: transaction.notes || null,
                account: transaction.account || "",
                accountId: transaction.accountId || "",
            }));
        },
    });
};
