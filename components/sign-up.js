"use client"

import { useState } from "react"
import { ChevronLeft, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// type Step = "welcome" | "email" | "otp" | "password"

export default function SignUpFlow() {
  const [currentStep, setCurrentStep] = useState("welcome")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState(["", "", "", ""])
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Auto-focus next input
      if (value !== "" && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const renderProgressBar = () => {
    const steps = ["welcome", "email", "otp", "password"]
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

  const renderWelcome = () => (
    <div className="flex flex-col min-h-screen bg-purple-600 text-white p-6 ">
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-6">Save money, track your budget & Secure your financial future</h1>
      </div>
      <div className="space-y-4">
        <Button
          variant="secondary"
          className="w-full bg-white text-purple-600 hover:bg-gray-100"
          onClick={() => setCurrentStep("email")}
        >
          Create a free account
        </Button>
        <Button variant="outline" className="w-full border-white text-white hover:bg-white/10">
          Log in
        </Button>
      </div>
    </div>
  )

  const renderEmail = () => (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Email address</h1>
        <p className="text-gray-500">We'll send you a verification code so make sure it's your email</p>
      </div>
      <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => setCurrentStep("otp")}>
        Next
      </Button>
    </div>
  )

  const renderOtp = () => (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Enter your OTP</h1>
        <p className="text-gray-500">Input your email to proceed with your account creation</p>
      </div>
      <div className="flex gap-4 justify-center">
        {otp.map((digit, index) => (
          <Input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            className="w-12 h-12 text-center text-2xl"
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
          />
        ))}
      </div>
      <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => setCurrentStep("password")}>
        Next
      </Button>
      <div className="text-center text-sm text-gray-500">
        From Messages
        <div className="font-medium">123 456</div>
      </div>
    </div>
  )

  const renderPassword = () => (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Choose your password</h1>
        <p className="text-gray-500">This password must contain numbers, letters & symbols.</p>
      </div>
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
        </button>
      </div>
      <Button className="w-full bg-purple-600 hover:bg-purple-700">Next</Button>
    </div>
  )

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
    <div className="min-h-screen bg-white">
      {currentStep !== "welcome" && (
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="ml-2"
            onClick={() => {
              const steps = ["welcome", "email", "otp", "password"]
              const currentIndex = steps.indexOf(currentStep)
              if (currentIndex > 0) {
                setCurrentStep(steps[currentIndex - 1])
              }
            }}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          {renderProgressBar()}
        </div>
      )}
      {currentStep === "welcome" && renderWelcome()}
      {currentStep === "email" && renderEmail()}
      {currentStep === "otp" && renderOtp()}
      {currentStep === "password" && renderPassword()}
    </div>
    </div>
  )
}

