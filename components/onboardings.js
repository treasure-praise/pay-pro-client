"use client"

import { useState } from "react"
import { ChevronLeft, Eye, DollarSign, Building2,  } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import image1 from "../assets/1.png"
import image2 from "../assets/2.png"
import image3 from "../assets/3.png"
import Link from "next/link"

const onboardingSteps = [
  {
    title: "Managing your finances and reaching your goals",
    description:
      "Set financial goals for yourself, such as saving a certain amount of money each month or paying off debt.",
    image: image1,
  },
  {
    title: "Unexpected expenses or financial emergencies",
    description:
      "Look for a high-yield savings account or a money market account to earn more interest on your savings",
    image: image2,
   
  },
  {
    title: "Managing your finances and reaching your goals",
    description: "setting aside money consistently and meeting your financial goals",
    image: image3,
    
  },
]

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0)

    

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      window.location.href = "/signup"
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex justify-end p-4">
      <Link href="/signup" passHref>
        <Button variant="link" className="text-purple-600">
          Skip
        </Button>
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center px-6 pb-6">
        <div className="relative w-full max-w-sm aspect-square mb-12">
          <div className="absolute inset-0">
            <Image
              src={onboardingSteps[currentStep].image || "/placeholder.svg"}
              alt="Phone frame"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex gap-2 justify-center mb-6">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${index === currentStep ? "bg-purple-600" : "bg-purple-200"}`}
            />
          ))}
        </div>

        <div className="space-y-4 text-center max-w-md">
          <h1 className="text-2xl font-semibold">{onboardingSteps[currentStep].title}</h1>
          <p className="text-gray-500">{onboardingSteps[currentStep].description}</p>
        </div>

        <Button className="w-full max-w-md mt-8 bg-purple-600 hover:bg-purple-700" onClick={handleNext}>
          {currentStep === onboardingSteps.length - 1 ? "Get started" : "Next"}
        </Button>
      </div>
    </div>
  )
}

