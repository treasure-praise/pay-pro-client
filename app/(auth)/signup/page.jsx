"use client"

import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SignUpSteps } from "@/components/signup-steps"

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(0)
  const [email, setEmail] = useState("")

  

  return (
    <div className="container max-w-md mx-auto p-4">
      <Button variant="ghost" size="icon" asChild className="mb-6">
        <Link href="/">
          <ChevronLeft className="h-6 w-6" />
        </Link>
      </Button>

      <SignUpSteps
      onAction={()=>setCurrentStep(1)}
        currentStep={currentStep}
        email={email}
        onEmailSubmit={(email) => {
          setEmail(email)
          setCurrentStep(2)
        }}
        onOtpSubmit={() => setCurrentStep(3)}
        onPasswordSubmit={() => setCurrentStep(4)}
        onComplete={() => setCurrentStep(5)}
      />
    </div>
  )
}

