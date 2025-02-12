import { TransactionsList } from "@/components/transactions-list"

export default function Transactions() {
  return (
    <div className="container max-w-md mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Transactions</h1>
      <TransactionsList />
    </div>
  )
}

