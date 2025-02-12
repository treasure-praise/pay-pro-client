
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"

// interface SignUpStepsProps {
//   currentStep: number
//   email: string
//   onEmailSubmit: (email: string) => void
//   onOtpSubmit: () => void
//   onPasswordSubmit: () => void
//   onComplete: () => void
// }

export function SignUpSteps({
  currentStep,
  email,
  onEmailSubmit,
  onOtpSubmit,
  onPasswordSubmit,
  onComplete,
  onAction
}) {
  const [tempEmail, setTempEmail] = useState(email)
  const [otp, setOtp] = useState(["", "", "", ""])
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      if (value !== "" && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const renderWelcome = () => (
    <div className="flex flex-col min-h-screen bg-purple-600 text-white p-6 bg-[url('../assets/bg.png')] bg-cover bg-center bg-no-repeat">
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-6">Save money, track your budget & Secure your financial future</h1>
      </div>
      <div className="space-y-4">
        <Button
          variant="secondary"
          className="w-full bg-white text-purple-600 hover:bg-gray-100"
          onClick={() => onAction()}
        >
          Create a free account
        </Button>

        <Link href="/signin" passHref className="mt-2">
        <Button variant="outline" className="w-full  bg-[#211F2A] text-white hover:bg-white/10">
          Log in
        </Button>
        </Link>
      </div>
    </div>
  )


  const renderProgressBar = () => (
    <div className="flex items-center gap-2 mb-6">
      {[1, 2, 3, 4].map((step) => (
        <div
          key={step}
          className={`h-1 flex-1 rounded-full ${step <= currentStep ? "bg-purple-600" : "bg-gray-200"}`}
        />
      ))}
    </div>
  )

  const renderEmailStep = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Email address</h1>
        <p className="text-gray-500">We'll send you a verification code so make sure it's your email</p>
      </div>

      <Input
        type="email"
        value={tempEmail}
        onChange={(e) => setTempEmail(e.target.value)}
        placeholder="Enter your email"
      />

      <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => onEmailSubmit(tempEmail)}>
        Continue
      </Button>
    </div>
  )

  const renderOtpStep = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Enter your OTP</h1>
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

      <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={onOtpSubmit}>
        Verify OTP
      </Button>

      <div className="text-center text-sm text-gray-500">
        From Messages
        <div className="font-medium">123 456</div>
      </div>
    </div>
  )

  const renderPasswordStep = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Choose your password</h1>
        <p className="text-gray-500">This password must contain numbers, letters & symbols.</p>
      </div>

      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
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

      <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={onPasswordSubmit}>
        Continue
      </Button>
    </div>
  )

  return (
    <div>
      {(currentStep === 1 || currentStep === 2 || currentStep === 3) && renderProgressBar()}
      {currentStep === 0 && renderWelcome()}
      {currentStep === 1 && renderEmailStep()}
      {currentStep === 2 && renderOtpStep()}
      {currentStep === 3 && renderPasswordStep()}
    </div>
  )
}

