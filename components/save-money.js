"use client"

import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function SaveMoney() {
  const amounts = [100, 200, 500, 5000, 10000, 20000]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container max-w-md mx-auto px-4 py-6 space-y-6">
        <Card className="bg-purple-600 text-white">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl">Total balance</h2>
              <Lock className="h-5 w-5" />
            </div>
            <div className="text-4xl font-bold">₦ 0000</div>
            <Button variant="secondary" className="w-full bg-white/10 hover:bg-white/20 text-white">
              Add money+
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">How much are you saving?</h2>

          <div className="grid grid-cols-2 gap-4">
            {amounts.map((amount) => (
              <Button
                key={amount}
                variant={amount === 20000 ? "default" : "outline"}
                className={`h-auto py-4 ${amount === 20000 ? "bg-purple-600 hover:bg-purple-700" : ""}`}
              >
                ₦ {amount.toLocaleString()}.00
              </Button>
            ))}
          </div>

          <Button variant="link" className="w-full text-purple-600">
            Enter different amount
          </Button>

          <div className="pt-6 space-y-4">
            <h3 className="text-xl font-semibold">Save money to</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5" />
                  <span>Emergency funds</span>
                </div>
                <span className="text-purple-600">₦ 500,000.00</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5" />
                  <span>New savings goal</span>
                </div>
                <span className="text-purple-600">₦ 20,000.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-purple-600 p-4">
        <div className="container max-w-md mx-auto">
          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg">Pay ₦ 20,000.00</Button>
        </div>
      </div>
    </div>
  )
}

