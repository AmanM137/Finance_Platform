import { Suspense } from "react";
import TransactionPage from "./transaction-page";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading Transactions...</div>}>
      <TransactionPage />
    </Suspense>
  );
}
