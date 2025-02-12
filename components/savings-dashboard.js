"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Eye, HelpCircle, Home, Save, User, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import SavingsList from "./savings-list"
import Link from "next/link"





export default function SavingsDashboard() {
  const [currentView, setCurrentView] = useState("dashboard")
  const [showBalance, setShowBalance] = useState(true)
  const [totalSavings, setTotalSavings] = useState(0);
 
  const renderDashboard = () => (
    <div className="container max-w-md mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Save</h1>

      <Card className="bg-purple-50">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between text-purple-600">
            <span>Total Savings</span>
            <Eye className="h-5 w-5" onClick={!setShowBalance}/>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-purple-600">₦ {showBalance ? ` ${totalSavings.toLocaleString()}` : "****"}</span>
            <ChevronRight className="h-6 w-6 text-purple-600" />
          </div>
        </CardContent>
      </Card>

      <div className="flex w-full justify-center ">
        <Button className="bg-purple-600 hover:bg-purple-700 w-full" >
        <Link className="w-full" href={"/savings/create"} passHref>
          Create Savings Plan +
        </Link>
        </Button>
      </div>

      <div className="space-y-2">
        <div className="w-full bg-purple-200 rounded-full h-2">
          <div className="bg-purple-600 h-2 rounded-full w-1/2" />
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-purple-600">50%</span>
          <div className="flex items-center gap-1 text-gray-600">
            <span>21 days to financial goal</span>
            <HelpCircle className="h-4 w-4" />
          </div>
        </div>
      </div>

      <SavingsList setTotalSavings={setTotalSavings}/>
    </div>
  )

  const renderTransaction = () => (
    <div className="min-h-screen bg-white">
      <div className="p-4">
        <Button variant="ghost" size="icon" onClick={() => setCurrentView("dashboard")}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>

      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-4">Transaction summary</h1>
          <div className="text-purple-600 text-3xl font-bold mb-1">₦ 20,000.00</div>
          <div className="text-gray-500">Today, 5:20pm</div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between py-4 border-b">
            <span className="text-gray-500">Payment destination</span>
            <span>Emergency funds</span>
          </div>
          <div className="flex justify-between py-4 border-b">
            <span className="text-gray-500">Status</span>
            <span className="text-green-600">PROCESSED</span>
          </div>
          <div className="flex justify-between py-4 border-b">
            <span className="text-gray-500">Reference ID</span>
            <span>PYM343534534</span>
          </div>
          <div className="flex justify-between py-4 border-b">
            <span className="text-gray-500">New Balance</span>
            <span className="text-purple-600">₦520,000.00</span>
          </div>
        </div>

        <Button className="w-full bg-purple-600 hover:bg-purple-700">Screenshot receipt</Button>
      </div>
    </div>
  )

  const renderPayment = () => (
    <div className="min-h-screen bg-white">
      <div className="p-4">
        <Button variant="ghost" size="icon" onClick={() => setCurrentView("dashboard")}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>

      <div className="p-4 space-y-6">
        <Card className="bg-purple-50">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between text-purple-600">
              <span>Emergency funds</span>
              <Eye className="h-5 w-5" />
            </div>
            <div className="text-3xl font-bold text-purple-600">₦ 500,000.00</div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
            <div className="flex items-center gap-3">
              <Image src="/placeholder.svg" alt="Mastercard" width={32} height={32} className="rounded" />
              <span>0008 - Guranty Trust bank</span>
            </div>
            <Button variant="link" className="text-purple-600">
              Switch
            </Button>
          </div>
        </div>

        <Button className="w-full bg-purple-600 hover:bg-purple-700">Pay ₦ 20,000.00</Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {currentView === "dashboard" && renderDashboard()}
      {currentView === "transaction" && renderTransaction()}
      {currentView === "payment" && renderPayment()}

    
    </div>
  )
}

