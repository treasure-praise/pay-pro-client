"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import API from "@/api"
import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

// Fetch transactions from API
const fetchTransactions = async () => {
  const userId = localStorage.getItem("userId") // Get userId from localStorage
  if (!userId) throw new Error("User ID not found")

  const { data } = await API.get(`/wallet-transacitons?userId=${userId}`)
  return data // Assuming API returns { transactions: [...] }
}

export function TransactionsList({ date, limit }) {
  const [filter, setFilter] = useState("ALL") // Default: Show all transactions

  const { data: transactions, isLoading, isError } = useQuery({
    queryKey: ["walletTransactions"],
    queryFn: fetchTransactions,
  })

  if (isLoading) return <TransactionsListSkeleton/>
  if (isError) return <p>Error fetching transactions</p>

  // Filtering logic
  const filteredTransactions = transactions
    .filter((transaction) => {
      if (filter !== "ALL" && transaction.type !== filter) return false
      return true
    })
    .slice(0, limit)

  return (
    <div className="space-y-4">
      {/* Filter Buttons */}
      <div className="flex space-x-2">
        {["ALL", "CREDIT", "DEBIT", "TRANSFER"].map((type) => (
          <Button
            key={type}
            variant={filter === type ? "default" : "outline"}
            onClick={() => setFilter(type)}
          >
            {type}
          </Button>
        ))}
      </div>

      {/* Transactions List */}
      {filteredTransactions.length > 0 ? (
        filteredTransactions.map((transaction) => (
          <Button key={transaction.id} variant="outline" className="w-full justify-between h-auto py-4" asChild>
            <Link href={`/transactions/${transaction.id}`}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-gray-100">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div className="text-left">
                {transaction.description.length > 30
                        ? `${transaction.description.substring(0, 30)}...`
                        : transaction.description}
                  <div className="text-sm text-gray-500">{formatDate(transaction.createdAt)}</div>
                </div>
              </div>
              <span className={transaction.amount > 0 ? "text-purple-600" : "text-red-600"}>
                {transaction.amount > 0 ? "+" : "-"}₦ {Math.abs(transaction.amount).toLocaleString()}.00
              </span>
            </Link>
          </Button>
        ))
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  )
}


function TransactionsListSkeleton() {
  return (
    <div className="space-y-4">
      {/* Skeleton for Filter Buttons */}
      <div className="flex space-x-2">
        {Array(4).fill(0).map((_, index) => (
          <Skeleton key={index} className="h-10 w-24 rounded-md" />
        ))}
      </div>
      
      {/* Skeleton for Transactions List */}
      <div className="space-y-3">
        {Array(5).fill(0).map((_, index) => (
          <Button key={index} variant="outline" className="w-full justify-between h-auto py-4" disabled>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gray-100">
                <DollarSign className="h-5 w-5 text-gray-300" />
              </div>
              <div className="text-left space-y-1">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
            <Skeleton className="h-4 w-20" />
          </Button>
        ))}
      </div>
    </div>
  )
}
