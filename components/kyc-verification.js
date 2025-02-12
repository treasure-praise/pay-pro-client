"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Timer, HelpCircle, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// type Step = "personal" | "idType" | "address" | "stateSelect"

const idTypes = [
  "Bank Verification Number (BVN)",
  "National Identity Number (NIN)",
  "Phone number",
  "Bank account",
  "Driver's License",
  "Voter's card",
]

const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  // Add other states...
]

export default function KYCVerification() {
  const [currentStep, setCurrentStep] = useState("personal")
  const [selectedIdType, setSelectedIdType] = useState("National Identity Number (NIN)")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedState, setSelectedState] = useState("")

  const renderHeader = () => (
    <div className="flex items-center justify-between p-4">
      <Button variant="ghost" size="icon" onClick={() => setCurrentStep("personal")}>
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button variant="link" className="text-purple-600">
        Skip
      </Button>
    </div>
  )

  const renderPersonalInfo = () => (
    <div className="space-y-6 p-4">
      <div className="flex justify-center">
        <div className="bg-purple-600 rounded-lg p-2">
          <Check className="h-6 w-6 text-white" />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Personal Information</h1>
        <p className="text-gray-500">Please provide identification to ensure the security of your account</p>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center gap-2">
        <Timer className="h-5 w-5 text-orange-500" />
        <span>
          Get started in <span className="text-orange-500">1 minutes</span>
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Identification method</span>
          <HelpCircle className="h-5 w-5 text-gray-400" />
        </div>
        <Button variant="outline" className="w-full justify-between" onClick={() => setCurrentStep("idType")}>
          <span>{selectedIdType}</span>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-2">
        <Label>Phone number</Label>
        <div className="flex gap-2">
          <div className="flex-shrink-0 flex items-center gap-2 px-3 border rounded-md bg-gray-50">
            <span className="text-green-600">🇳🇬</span>
            <span>+234</span>
          </div>
          <Input
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="flex-1"
          />
        </div>
      </div>

      <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => setCurrentStep("address")}>
        Next
      </Button>
    </div>
  )

  const renderIdTypeSelection = () => (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-semibold">Select an ID Type</h2>
      <RadioGroup value={selectedIdType} onValueChange={setSelectedIdType}>
        {idTypes.map((type) => (
          <div key={type} className="flex items-center space-x-2 py-3">
            <RadioGroupItem value={type} id={type} />
            <Label htmlFor={type}>{type}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )

  const renderAddress = () => (
    <div className="space-y-6 p-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Address</h1>
        <p className="text-gray-500">Enter a detailed address for better security</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>State of origin</Label>
          <Button variant="outline" className="w-full justify-between" onClick={() => setCurrentStep("stateSelect")}>
            <span>{selectedState || "Select state of origin"}</span>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-2">
          <Label>Local government area</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select LGA" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lga1">LGA 1</SelectItem>
              <SelectItem value="lga2">LGA 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Townhall/Bala blu bulah</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Townhall" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="town1">Townhall 1</SelectItem>
              <SelectItem value="town2">Townhall 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Home address</Label>
          <Input placeholder="Enter your home address" />
        </div>
      </div>

      <Button className="w-full bg-purple-600 hover:bg-purple-700">Next</Button>
    </div>
  )

  const renderStateSelection = () => (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-semibold">Select state</h2>
      <div className="space-y-2">
        {nigerianStates.map((state) => (
          <Button
            key={state}
            variant="ghost"
            className="w-full justify-start text-lg"
            onClick={() => {
              setSelectedState(state)
              setCurrentStep("address")
            }}
          >
            {state}
          </Button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
         <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container max-w-md mx-auto px-4 py-6">
        {/* <div className="flex flex-col items-center space-y-3 mb-8"> */}

       
      {currentStep !== "personal" && renderHeader()}
      {currentStep === "personal" && renderPersonalInfo()}
      {currentStep === "idType" && renderIdTypeSelection()}
      {currentStep === "address" && renderAddress()}
      {currentStep === "stateSelect" && renderStateSelection()}
      {/* </div> */}
      </div>
      </div>
    </div>
  )
}

