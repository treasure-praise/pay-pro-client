"use client"

import { Eye, Home, Save, User, ChevronRight, Building2, Wallet, PiggyBank } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container max-w-md mx-auto px-4 py-6 space-y-6">
        <Card className="bg-purple-600 text-white">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl">Total balance</h2>
              <Eye className="h-5 w-5" />
            </div>
            <div className="text-4xl font-bold">₦ 500,000.00</div>
            <Button variant="secondary" className="w-full bg-white/10 hover:bg-white/20 text-white">
              Add money+
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Build financial goals</h2>

          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-between h-auto py-4">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <Building2 className="h-5 w-5 text-yellow-600" />
                </div>
                <span>Fund emergency wallet</span>
              </div>
              <ChevronRight className="h-5 w-5" />
            </Button>

            <Button variant="outline" className="w-full justify-between h-auto py-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <PiggyBank className="h-5 w-5 text-green-600" />
                </div>
                <span>Save money</span>
              </div>
              <ChevronRight className="h-5 w-5" />
            </Button>

            <Button variant="outline" className="w-full justify-between h-auto py-4">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Wallet className="h-5 w-5 text-purple-600" />
                </div>
                <span>Create budget</span>
              </div>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="container max-w-md mx-auto px-4">
          <div className="flex justify-around py-4">
            <Button variant="ghost" className="flex flex-col items-center gap-1">
              <Home className="h-5 w-5 text-purple-600" />
              <span className="text-sm text-purple-600">Home</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center gap-1">
              <Save className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-400">Save</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center gap-1">
              <User className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-400">Profile</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

