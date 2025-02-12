"use client"

import { useState } from "react"
import { ChevronLeft, Lock, Home, Save, User, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// type Step = "plans" | "name" | "duration"
// type Duration = "3months" | "6months" | "9months" | "1year" | "custom"

export default function SavingsFlow() {
  const [currentStep, setCurrentStep] = useState("plans")
  const [planName, setPlanName] = useState("")
  const [selectedDuration, setSelectedDuration] = useState(null)

  const renderProgressBar = () => {
    const steps = ["plans", "name", "duration"]
    const currentIndex = steps.indexOf(currentStep)

    return (
      <div className="flex items-center gap-2 px-4 mt-4">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full ${index <= currentIndex ? "bg-purple-600" : "bg-gray-200"}`}
          />
        ))}
      </div>
    )
  }

  const renderSavingPlans = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex items-center p-4">
        <Button variant="ghost" size="icon">
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-semibold ml-2">Saving plans</h1>
      </div>

      <div className="flex-1 p-4 space-y-4">
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-between h-auto py-4"
            onClick={() => setCurrentStep("name")}
          >
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-gray-400" />
              <span>Emergency funds</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-600">₦ 500,000.00</span>
              <ChevronRight className="h-5 w-5" />
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full justify-between h-auto py-4"
            onClick={() => setCurrentStep("name")}
          >
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-gray-400" />
              <span>New savings goal</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-600">₦ 20,000.00</span>
              <ChevronRight className="h-5 w-5" />
            </div>
          </Button>
        </div>
      </div>

      <div className="p-4">
        <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => setCurrentStep("name")}>
          Create a new budget
        </Button>
      </div>

      <div className="border-t bg-white">
        <div className="flex justify-around py-4">
          <Button variant="ghost" className="flex flex-col items-center gap-1">
            <Home className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-400">Home</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1">
            <Save className="h-5 w-5 text-purple-600" />
            <span className="text-sm text-purple-600">Save</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1">
            <User className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-400">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  )

  const renderPlanName = () => (
    <div className="min-h-screen bg-white p-4">
      {renderProgressBar()}
      <div className="mt-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">What are you saving for?</h1>
          <Input placeholder="Enter your name" value={planName} onChange={(e) => setPlanName(e.target.value)} />
          <p className="text-gray-500">A descriptive name makes a plan memorable</p>
        </div>
        <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => setCurrentStep("duration")}>
          Continue
        </Button>
      </div>
    </div>
  )

  const renderDuration = () => {
    const durations = [
      { label: "3 months", value: "3months" },
      { label: "6 months", value: "6months" },
      { label: "9 months", value: "9months" },
      { label: "1 year", value: "1year" },
      { label: "June 7 2023", value: "custom" },
    ]

    return (
      <div className="min-h-screen bg-white p-4">
        {renderProgressBar()}
        <div className="mt-6 space-y-6">
          <h1 className="text-2xl font-semibold">How long do you want to save?</h1>

          <div className="grid grid-cols-2 gap-4">
            {durations.map((duration) => (
              <Button
                key={duration.value}
                variant={selectedDuration === duration.value ? "default" : "outline"}
                className={`h-auto py-4 ${
                  selectedDuration === duration.value ? "bg-purple-600 hover:bg-purple-700" : ""
                }`}
                onClick={() => setSelectedDuration(duration.value)}
              >
                {duration.label}
              </Button>
            ))}
          </div>

          <div className="space-y-4 pt-8">
            <div className="flex justify-between">
              <span className="text-gray-500">Interest rate</span>
              <span>9% p.a</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Maturity date</span>
              <span>March 26, 2023</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Estimated amount</span>
              <span className="text-green-600">₦ 240,000.00</span>
            </div>
            <p className="text-gray-500 text-sm">
              This estimate assumes you save ₦ 20.00 for a year between today and your maturity date
            </p>
          </div>

          <Button className="w-full bg-purple-600 hover:bg-purple-700">Done</Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {currentStep === "plans" && renderSavingPlans()}
      {currentStep === "name" && renderPlanName()}
      {currentStep === "duration" && renderDuration()}
    </>
  )
}

