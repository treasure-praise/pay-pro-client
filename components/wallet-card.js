"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import CountUp from "react-countup"


import { useQuery } from "@tanstack/react-query"
import API from "@/api"

const fetchWalletBalance = async () => {
  const userId = localStorage.getItem("userId") // Get userId from localStorage
  if (!userId) throw new Error("User ID not found")

  const { data } = await API.get(`/wallet-balance/${userId}`)
  return data.balance // Assuming API returns { balance: 500000 }
}

export function WalletCard() {
  const [showBalance, setShowBalance] = useState(true)

  // Use React Query to fetch wallet balance
  const { data: balance, isLoading, isError } = useQuery({
    queryKey: ["walletBalance"],
    queryFn: fetchWalletBalance,
  })

  return (
    <Card className="bg-purple-600 text-white">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl">Total balance</h2>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-white/80"
            onClick={() => setShowBalance(!showBalance)}
          >
            {showBalance ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
          </Button>
        </div>

        {/* <div className="text-4xl font-bold">
          {isLoading ? "Loading..." : isError ? "Error fetching balance" : showBalance ? `₦ ${balance?.toLocaleString()}` : "₦ ****"}
        </div> */}

        <div className="text-4xl font-bold">
          {isLoading ? (
            "Loading..."
          ) : isError ? (
            "Error fetching balance"
          ) : showBalance ? (
            <CountUp start={0} end={balance} duration={2} separator="," prefix="₦ " />
          ) : (
            "₦ ****"
          )}
        </div>

        <Button asChild variant="secondary" className="w-full bg-white/10 hover:bg-white/20 text-white">
          <Link href="/fund-wallet">Add money+</Link>
        </Button>
      </CardContent>
    </Card>
  )
}