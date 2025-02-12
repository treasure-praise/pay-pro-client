import { WalletCard } from "@/components/wallet-card"
import { QuickActions } from "@/components/quick-actions"
import { RecentTransactions } from "@/components/recent-transactions"

export default function Dashboard() {
  return (
    <div className="container max-w-md mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <WalletCard />
      <QuickActions />
      <RecentTransactions />
    </div>
  )
}

